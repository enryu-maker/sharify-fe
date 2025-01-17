import React from 'react';
import { image } from '../../assets/image';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginAction } from '../../store/actions/authActions';
import Verify from '../modal/Verify';

export default function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [data, setData] = React.useState({
        username: '',
        password: '',
        login_type: 1,
    })
    const [loading, setLoading] = React.useState(false)
    const [show, setShow] = React.useState(false)
    const [QR, setQR] = React.useState("")

    return (
        <div
            className="w-screen h-screen flex  font-inter justify-center items-center"
        >
            {
                show ?
                    <Verify qr={QR} data={data} />
                    :
                    null
            }
            <div className="w-[450px] h-auto space-y-3 flex flex-col justify-center items-center ">
                <img src={image.login} className=' w-[300px] h-[300px] object-contain' />
                <p
                    className=' w-full text-center font-body text-2xl'>
                    Login to <span className='font-head underline  text-blue-500'>Get Started</span> !
                </p>
                <div className=' w-full flex flex-col justify-center items-center space-y-4'>
                    <input
                        placeholder='Enter Your Email'
                        className="w-[88%] text-lg text-gray-800 border font-body border-gray-300 px-4 py-2 outline-none rounded-lg"
                        type='email'
                        value={data.username}
                        onChange={(e) => {
                            setData({
                                ...data, username: e.target.value
                            })
                        }}
                    />
                    <input
                        placeholder='Enter Your Password'
                        className="w-[88%] text-lg text-gray-800 border font-body border-gray-300 px-4 py-2 rounded-lg outline-none"
                        type='password'
                        value={data.password}
                        onChange={(e) => {
                            setData({
                                ...data, password: e.target.value
                            })
                        }}
                    />
                    <button
                        onClick={() => {
                            dispatch(loginAction(data, setLoading, setQR, setShow))
                        }}
                        className=' w-[88%] px-5 py-2 bg-blue-500 rounded-lg'>
                        {
                            loading ?
                                <p className=' text-center text-white font-head w-full text-2xl'>
                                    loading....
                                </p>
                                :
                                <p className=' text-center text-white font-head w-full text-2xl'>
                                    login
                                </p>
                        }
                    </button>
                    <p className=' text-center text-black font-body w-full text-lg'>
                        Don't have an account? &nbsp;
                        <span
                            onClick={() => {
                                navigate('/register')
                            }}
                            className=' text-blue-500 underline font-head cursor-pointer'>
                            Signup
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}
