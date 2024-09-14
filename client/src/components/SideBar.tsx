import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import {logo, sun} from "../assets";
import {navlinks } from "../constants"

type Props = {}

interface IconProps{
  styles?:string;
  name?: string;
  imgUrl: string;
  link?: string;
  disabled?: boolean;
  isActive?:string;
  handleClick?: ()=>void;

}

const Icon: React.FC<IconProps> =({styles,imgUrl,name, isActive,disabled,handleClick}) => {
  //console.log(name+"="+styles+"="+!disabled);
  return(


  <div className={`w-[48px] h-[48px] rounded-[10px] flex justify-center items-center ${isActive && isActive===name && "bg-[#2c2f32]"}  ${!disabled && "cursor-pointer"} ${styles}` } onClick={handleClick}>

    {!isActive ?
     (<img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2"/>) :
      (<img src={imgUrl} alt="fund_logo" className={`w-1/2 h-1/2 ${isActive !== name && "grayscale"}`}/>)}

  </div>
  )
}

const Sidebar = (props: Props) => {

  const navigate=useNavigate();
  const [isActive, setIsActive]=useState<string>("dashboard");

  return (
      // <div className="bg-sky-500">hihi</div>
    <div className="flex justify-between items-center flex-col sticky top-10 h-[93vh]">
   
      <Link to="/">
      <Icon styles="w-[52px] h-[52px] bg-[#2c2f32]" imgUrl={logo}/>
      </Link>  
     
      <div className="flex-1 flex flex-col justify-center items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link)=>{
            return(
            <Icon 
            key={link.name}
            {...link}
            isActive={isActive}
            handleClick={()=>{
              if(!link.disabled){
                setIsActive(link.name);
                navigate(link.link);
              }
            }}
            />)
          })}

        </div>

        <Icon styles="bg-[#1c1c24]
        shadow-secondary" imgUrl={sun}/>
      </div>
    </div>
  )
}

export default Sidebar