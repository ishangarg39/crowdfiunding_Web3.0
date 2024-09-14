import React from 'react'
import { useNavigate } from 'react-router-dom';
import { loader } from '../assets';
import FundCard from './FundCard';

//structure for Campaign details
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

type Props = {
    title:string;
    isLoading:boolean;
    campaigns:campaignType[] | undefined;
}



const DisplayCampaigns: React.FC<Props> = ({title, isLoading, campaigns}) => {
    const navigate=useNavigate();
    //console.log("Display",JSON.stringify(campaigns));

    const handleNavigate=(campaign: campaignType)=>{
       // console.log("Camp:",campaign)
        navigate(`/campaign-details/${campaign.title}`, {state:campaign})
    }
  return (
    <div>
        <h1 className='font-epilogue fomnt-semibold text-[18px] text-white text-left'>{title} ({campaigns?.length})</h1>

        <div className='flex flex-wrap mt-[20px] gap-[26px]'>{isLoading && (<img src={loader} alt="loader" className='w-[100px] h-[100px] object-contain'/>)}</div>

        {!isLoading && campaigns?.length===0 && (<p className='font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]'>You have not created any Campaign</p>)}
        
        {!isLoading && (campaigns?.length || 0)>0 && campaigns?.map((campaign)=>(<FundCard
        key={campaign.pId}
        {...campaign}
        handleClick={()=>handleNavigate(campaign)} 
        />))}

    </div>
  )
}

export default DisplayCampaigns