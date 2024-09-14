import React, { createContext, useState } from 'react';
import { ethers } from 'ethers';
import {useStateContext} from '../context'
import { money } from '../assets';
import { CustomButton, FormField, Loader } from '../components';
import { checkIfImage } from '../utils';
import { useNavigate } from 'react-router-dom';

type Props = {}

interface formDetails {
  name: string;
  title: string;
  description: string;
  target: string;
  deadline: string;
  image: string;
}

const CreateCampaign = (props: Props) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {createCampaign}=useStateContext();
  const [form, setForm] = useState<formDetails>({
    name: "",
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: ""
  });

  const handleFormFieldChange = (fieldName: keyof formDetails, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // to check if image is working url
    checkIfImage(form.image, async (exists)=>{
      if(exists){
        setIsLoading(true);
        // Ensure form.target is a string for ethers.utils.parseUnits
      const targetNumber = ethers.utils.parseUnits(form.target, 18);
      const targetString =targetNumber.toString();
      await createCampaign({...form, targetString })
      setIsLoading(false);
      navigate('/');
      }
      else{
        alert("Provide valid image URL");
        setForm({...form, image:""});
      }
    })

    
    console.log(form)
  }

  return (
    <div className='bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4'>
      {isLoading && <Loader/>}
      <div className='flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]'>
        <h1 className='font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white'>
          Start a Campaign
        </h1>
      </div>
      <form onSubmit={handleSubmit} className='w-full mt-[65px] flex flex-col gap-[30px]'>
        <div className='flex flex-wrap gap-[40px]'>
          <FormField
            LableName="Your Name *"
            placeholder="Enter your name"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange("name", e)}
          />

          <FormField
            LableName="Campaign Title *"
            placeholder="Enter title name"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange("title", e)}
          />
        </div>
        <FormField
          LableName="Story *"
          placeholder="Enter your story"
          value={form.description}
          handleChange={(e) => handleFormFieldChange("description", e)}
          isTextArea={true}
        />

        <div className='w-full flex justify-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]'>
          <img src={money} alt="money" className='w-[40px] h-[40px] object-contain' />
          <h4 className='font-epilogue font-bold text-[25px] text-white ml-[20px] '>You will get FULL Amount</h4>
        </div>
        <div className='flex flex-wrap gap-[40px]'>
          <FormField
            LableName="Goal *"
            placeholder="ETH 0.50"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange("target", e)}
          />

          <FormField
            LableName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange("deadline", e)}
          />

           <FormField
            LableName="Campaign Image *"
            placeholder="Place image URL of your campaign"
            inputType="url"
            value={form.image}
            handleChange={(e) => handleFormFieldChange("image", e)}
          />

          <div className='flex jusitfy-center items-center mt-[40px]'>
            <CustomButton
              btnType="submit" title='Submit new Campaign' styles='bg-[#1dc071]'
              handleClick={() => { }}
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreateCampaign;
