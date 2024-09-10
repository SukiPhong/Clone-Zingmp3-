import React from 'react';
import { Outlet } from 'react-router-dom';
import { Player, SidebarLeft, SidebarRight } from '../../components/index';

const Public = () => {
  return (
    <div className='w-full h-screen  flex-col bg-main-300  '>
      <div className='w-full h-full flex flex-auto  '>
        <div className='w-[240px] h-full flex-none border border-blue-500'>
          <SidebarLeft />
        </div>
        <div className=' flex-auto p-4 border  border-green-500 '>
          <Outlet />
        </div>
        <div className='w-[329px]  flex-none border border-red-500'>
          <SidebarRight />
        </div>
      </div>
      <div className='flex-none bottom-0 left-0 right-0 h-[90px]'>
        <Player />
      </div>
    </div>
  );
};

export default Public;
