import React from 'react';
import { image } from '../../assets/image';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerAction } from '../../store/actions/authActions';
import CamModel from './CamModel';

export default function Signup() {
    const [data, setData] = React.useState({
        name: '',
        username: '',
        password: '',
        email: '',
        mobile_number: '',
        login_method: 1
    })
    const [loading, setLoading] = React.useState(false)
    const [show, setShow] = React.useState(false)
    const [faceData, setFaceData] = React.useState(null)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    return (
        <div
            className="w-screen h-screen flex  font-inter justify-center items-center"
        >
            <div className="w-[450px] h-auto space-y-3 flex flex-col justify-center items-center ">
                <img src={image.login} className=' w-[300px] h-[300px] object-contain' />
                <p
                    className=' w-full text-center font-body text-2xl'>
                    Signup to <span className='font-head underline  text-blue-500'>Continue</span> !
                </p>
                {show && <CamModel setShow={setShow} setFaceData={setFaceData} />}
                <div className=' w-full flex flex-col justify-center items-center space-y-4'>
                    <input
                        placeholder='Enter Your Name'
                        className="w-[88%] text-lg text-gray-800 border font-body border-gray-300 px-4 py-2 rounded-lg outline-none"
                        type='text'
                        value={data?.name}
                        onChange={(e) => {
                            setData({ ...data, name: e.target.value })
                        }}
                    />
                    <input
                        placeholder='Enter Your Username'
                        className="w-[88%] text-lg text-gray-800 lowercase border font-body border-gray-300 px-4 py-2 rounded-lg outline-none"
                        type='text'
                        value={data?.username}
                        onChange={(e) => {
                            setData({ ...data, username: e.target.value })
                        }}
                    />
                    <input
                        placeholder='Enter Your Number'
                        className="w-[88%] text-lg text-gray-800 border font-body border-gray-300 px-4 py-2 rounded-lg outline-none"
                        type='number'
                        value={data?.mobile_number}
                        onChange={(e) => {
                            setData({ ...data, mobile_number: e.target.value })
                        }}
                    />
                    <input
                        placeholder='Enter Your Email'
                        className="w-[88%] text-lg text-gray-800 border font-body border-gray-300 px-4 py-2 rounded-lg outline-none"
                        type='email'
                        value={data?.email}
                        onChange={(e) => {
                            setData({ ...data, email: e.target.value })
                        }}
                    />
                    <input
                        placeholder='Enter Your Password'
                        className="w-[88%] text-lg text-gray-800 border font-body border-gray-300 px-4 py-2 rounded-lg outline-none"
                        type='password'
                        value={data?.password}
                        onChange={(e) => {
                            setData({ ...data, password: e.target.value })
                        }}
                    />
                    <button
                        onClick={() => {
                            setShow(!show)
                        }}
                    >
                        Face Data
                    </button>
                    <button
                        onClick={() => {
                            data.face_image_base64 = faceData
                            dispatch(registerAction(data, setLoading))
                        }}
                        className=' w-[88%] px-5 py-1 bg-blue-500 rounded-lg'>
                        {
                            loading ?
                                <p className=' text-center text-white font-head w-full text-2xl'>
                                    loading....
                                </p>
                                :
                                <p className=' text-center text-white font-head w-full text-2xl'>
                                    signup
                                </p>
                        }
                    </button>
                    <p className=' text-center text-black font-body w-full text-lg'>
                        Already have an account? &nbsp;
                        <span
                            onClick={() => {
                                navigate("/login")
                            }}
                            className=' text-blue-500 underline font-head cursor-pointer'>
                            login
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}
