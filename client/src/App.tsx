import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {Home,Profile,CreateCampaign,CampaignDetails} from './pages'
import {NavBar,SideBar} from './components'


type Props = {}

function App({}: Props) {
  return (
    <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row ">
      <div className='sm:flex flex-col hidden mr-10 relative'>
        <SideBar/>
      </div>

      <div className='flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5'>
        <NavBar/>
      
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/create-campaign" element={<CreateCampaign/>}/>
        <Route path="/campaign-details/:id" element={<CampaignDetails/>}/>
      </Routes>
      </div>
    </div>
  )
}

export default App