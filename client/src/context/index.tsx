  import React, { createContext, ReactNode, useContext } from "react";
  import { useAddress, useContract, useContractWrite, useMetamask } from "@thirdweb-dev/react";
  import { ethers } from 'ethers';

  interface Form {
    title: string;
    description: string;
    targetString: string ;
    deadline: string | number | Date;
    image: string;
  }

  interface StateContextProps {
    address: string | undefined;
    contract: any;
    connect: any;
    createCampaign: (form: Form) => Promise<void>;
    getCampaigns:()=> Promise<void>;
    getUserCampaigns:()=> Promise<void>;
    donate:(pId:any, amount:any)=> Promise<void>;
    getDonations: (pId: any) => Promise<{ donator: any; donations: string }[] | undefined>;  }

  const StateContext = createContext<StateContextProps | undefined>(undefined);

  interface StateContextProviderProps {
    children: ReactNode;
  }

  export const StateContextProvider = ({ children }: StateContextProviderProps) => {
    const { contract } = useContract("0x69c5675Afd7f793B2fa1E2AB9E06DB5eF7f386f5");
    const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');
    const address = useAddress();

    //useMetamask is working even if it shows "Deprecated"
    const connect = useMetamask();

    const publishCampaign = async (form: Form) => {
      try {
        const target=ethers.utils.parseUnits(form.targetString,18);
        const data = await createCampaign({
          args: [
            address, // owner
            form.title, // title
            form.description, // description
            target,
            new Date(form.deadline).getTime(), // deadline
            form.image
          ]
        });
        console.log("Contract call success", data);
      } catch (error) {
        console.log("Contract call failure", error);
      }
    };

    //to get campaigns 
    const getCampaigns = async () => {
      if (!contract) {
        console.error("Contract is undefined");
        return;
      }
  
      try {
        const campaigns = await contract.call('getCampaigns');
        //console.log(campaigns);

        const parsedCampaigns = campaigns.map((campaign: {
      image: string; amountCollected: any; deadline: any; description: string; owner: any; title: string; target: any;
    }, index: number) => { // Add 'index' as the second parameter here
      
      // Ensure target and amountCollected are valid BigNumbers
      const target = campaign.target ? ethers.utils.formatEther(campaign.target.toString()) : "0";
      const amountCollected = campaign.amountCollected ? ethers.utils.formatEther(campaign.amountCollected.toString()) : "0";

      return {
        owner: campaign.owner,
        title: campaign.title,
        description: campaign.description,
        target: target,
        deadline: campaign.deadline.toNumber(),
        amountCollected: amountCollected,
        image: campaign.image,
        pId: index, // Use 'index' as the campaign ID
      };
        });
        //console.log("parsedCampaigns:", parsedCampaigns);
        //console.log("parsedCampaigns:", JSON.stringify(parsedCampaigns, null, 2));
        return parsedCampaigns;
        
      } catch (error) {
        console.log("Error fetching campaigns (index file):", error);
      }
    };

    //to get user Campaigns
    const getUserCampaigns=async () =>{

      const allCampaigns= await getCampaigns();
      //console.log(allCampaigns.length)
      const filteredCampaigns= allCampaigns.filter((campaign:{owner:string})=>{
        console.log("Campaign owner:", campaign.owner);
        console.log("Current address:", address);
        
        //console.log(typeof(address))
        return campaign.owner.toLowerCase() === address?.toLowerCase();
        
      });
      //console.log(filteredCampaigns)

      
      return filteredCampaigns;
    }

    const donate=async(pId:any,amount:any )=>{
      if (!contract) {
        console.error("Contract is undefined");
        return;
      }
      try{
      const data=await contract.call('donateToCampaign',[pId],{value:ethers.utils.parseEther(amount)});
      return data;
    }
      catch (error) {
        console.log("Error fetching campaigns (index file):", error);
      }     
    }

    const getDonations = async (pId: any) => {
      if (!contract) {
        console.error("Contract is Undefined");
        return [];
      }
      try {
        
        //pId is bigNumber so it is passed in [] as it is a bigNumber
        const donations = await contract.call('getDonators', [pId] );
        //console.log("donations",donations)
        const numberOfDonations = donations[0].length;
    
        const parsedDonations = [];
        for (let i = 0; i < numberOfDonations; i++) {
          parsedDonations.push({
            donator: donations[0][i],
            donations: ethers.utils.formatEther(donations[1][i].toString())
          });
        }
        return parsedDonations;
      } catch (error) {
        console.log("Error fetching donations:", error);
        return []; // Return an empty array in case of error
      }
    };
    

    return (
      <StateContext.Provider
        value={{
          address,
          contract,
          connect,
          createCampaign: publishCampaign,
          getCampaigns,
          getUserCampaigns,
          donate,
          getDonations
        }}
      >
        {children}
      </StateContext.Provider>
    );
  };

  // Custom hook to use the context
  export const useStateContext = () => {
    const context = useContext(StateContext);
    if (!context) {
      throw new Error("useStateContext must be used within a StateContextProvider");
    }
    return context;
  };
