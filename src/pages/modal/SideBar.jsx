import React from 'react'
import { LuLayoutDashboard, LuSettings, LuLogOut } from "react-icons/lu";
export default function SideBar() {
    return (
        <div className='w-[20%]  h-full flex flex-col font-inter justify-start space-y-4 items-center border-r'>
            <h1 className=' font-medium font-inter text-3xl tracking-widest text-blue-500 w-[88%] mt-5'>
                sharify
            </h1>
            <div className="w-[88%] flex flex-col space-y-2 font-inter text-lg ">
                <a className=' hover:underline transition-all duration-700 space-x-2 flex items-center cursor-pointer'>
                    <LuLayoutDashboard /> <span>Dashboard</span>
                </a>
                <a className=' hover:underline transition-all duration-700 space-x-2 flex items-center cursor-pointer'>
                    <LuSettings /> <span>Settings</span>
                </a>
                <a className=' hover:underline transition-all text-red-500 duration-700 space-x-2 flex items-center cursor-pointer'>
                    <LuLogOut /> <span>Logout</span>
                </a>
            </div>
        </div>
    )
}
