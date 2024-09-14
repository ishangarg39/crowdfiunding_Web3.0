import React, {  useEffect, useState } from 'react'
import { useStateContext } from '../context';
import { DisplayCampaigns } from '../components';

type Props = {}

interface campaignType{
  pId: number; 
  image: string; 
  amountCollected: any;
  deadline: any;
  description: string;
  owner: any;
  title: string;
  target: any;

}

const Home = (props: Props) => {

  const [isLoading, setIsLoading]=useState<boolean>(false);
  const [campaigns, setCampaigns]=useState<campaignType[]>([]);

  const {address, contract, getCampaigns}=useStateContext();

  const fetchCampaigns=async()=>{
    setIsLoading(true);
    const data =await getCampaigns();
    //console.log("data : "+data)
    if(data!=null)setCampaigns(data);
    setIsLoading(false);
  }
  useEffect(()=>{
    if(contract) fetchCampaigns();
  },[contract, address])

  return (
    <DisplayCampaigns
    title="All campaigns"
    isLoading={isLoading}
    campaigns={campaigns}
    />
  )
}

export default Home