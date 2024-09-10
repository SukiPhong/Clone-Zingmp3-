import React from 'react'
import logo from '../assets/logo.svg'
import { sidebarMenu } from '../utils/menu'
import { NavLink } from 'react-router-dom'
const notActiveStyle = 'py-2 px-[25px] text-[#32323D] text-[13px] font-bold flex gap-[12px] items-center'
const ActiveStyle = 'py-2 px-[25px] text-[#0F7070] text-[13px] font-bold flex gap-[12px] items-center'
const sideBarLeft = () => {
  return (
    <div className='flex h-full flex-col bg-main-200'>
      <div className='w-full h-[70px] py-[15px] px-[25px] flex justify-center items-center'>
        <img src={logo} alt="logo" className='w-[120px] h-10 ' />
      </div>
      <div className='flex flex-col'>
        {sidebarMenu.map(e => (
          <NavLink
            to={e.path}
            key={e.path}
            end={e.end}
            className={({ isActive }) => isActive ?
              ActiveStyle : notActiveStyle}
          >
            {e.icons}
            <span >{e.text}</span>
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default sideBarLeft