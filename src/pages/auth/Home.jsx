import React from 'react'
import { useNavigate } from 'react-router-dom'
import { image } from '../../assets/image'
export default function Home() {
    const navigate = useNavigate()
    return (
        <div>
            <div className='w-[100vw] h-[75px] flex items-center justify-around shadow-black shadow-lg '>
                <div className='flex flex-row space-x-20'>
                    <a href="http://localhost:3000/" className='text-black text-xl font-semibold font-serif'>Home</a>
                </div>
                <div>
                    <img src={image.logo} alt="logo" className="w-36" />
                </div>
                <div className='flex flex-row items-center space-x-10 font-semibold'>
                    <a href="http://localhost:3000/login" className='text-blue-500'>Login</a>
                    <button onClick={() => { navigate('/register') }} className='w-[130px] h-[45px] rounded-sm font-semibold text-white  bg-blue-500 font-serif hover:bg-sky-400 '>Sign Up</button>
                </div>
            </div>
            <div className='flex w-[100vw] h-[90vh] bg-cover' style={{ backgroundImage: `url(${image.bg})` }}>
                <div>
                    <p className='text-5xl font-serif text-blue-800 flex mt-40 ps-5 font-bold'>Blockchain Based <br />
                        Secure File <br />
                        Transfer System</p>
                    <p className='text-sm text-black font-serif mt-4 ps-5'>Welcome to Most Secured & Trustworthy File Transfer System</p>
                </div>
                <div className='flex items-center ps-52 pt-96 '>
                    <button onClick={() => { navigate('/login') }} className=' w-[180px] rounded-md h-[55px] text-black font-semibold text-lg border-2 border-white bg-rose-500 hover:bg-sky-400'>Get Start</button>
                </div>
            </div>
        </div>
    )
}
