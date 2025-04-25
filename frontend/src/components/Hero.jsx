import React from 'react';
import {ReactTyped} from "react-typed";

 const Hero = ({ onExploreClick }) => {
  return (
    <div className="relative h-screen bg-[linear-gradient(to_bottom,#000,#200D42_34%,#4F21A1_65%,#A46EDB_82%)] flex items-center justify-center">
    <div className='w-full max-w-[800px] h-[345px] text-center mx-auto flex flex-col  items-center sm:py-5'>
       <p className='text-[#a124e9] font-bold p-1 text-4xl'>LOST SOMETHING SPECIAL?</p>
       
       <p className='font-bold text-7xl p-2'>We've Found It!</p> 
       <div className='flex justify-center' >
       <p className='text-3xl font-bold '>Find your </p>
       <ReactTyped className='text-3xl font-bold pl-2 text-[#a124e9] ' strings={["keys,","wallet,","Mobile Phone,","earpods", "and more.."]}
                            typeSpeed={30}
                            backSpeed={50}
                            loop>
        </ReactTyped>
       </div>
      <p className='text-gray-400 font-bold text-2xl mx-auto mt-6'>AI-powered & community-driven platform to report and recover lost items in public places.</p>
      <div className='flex justify-center'>
        <button onClick={onExploreClick} className="bg-white border border-[#a57ad3] text-black font-semibold py-2 px-4 rounded-lg w-32 mt-5 hover:bg-[#d385df] transition-all">
          Explore
        </button> 
      </div>
    </div>
    <div className="absolute h-[375px] w-[750px] sm:w-[1500px] sm:h-[300px] rounded-[100%] bg-black left-1/2 -translate-x-1/2 border border-[#a57ad3] bg-[radial-gradient(closest-side,_#000_82%,_#9506EB)] top-[calc(100%-110px)]"></div>
    </div>
  )
}

export default Hero;