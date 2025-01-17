import React from 'react'
import { useDispatch } from 'react-redux'
import { verifyAction } from '../../store/actions/authActions'
import { useNavigate } from 'react-router-dom'

export default function Verify({
    qr,
    data
}) {
    const [otp, steOtp] = React.useState(0)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = React.useState(false)

    return (
        <div class="fixed inset-0 p-4 flex flex-wrap justify-center items-center font-inter w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto ">
            <div class="w-full max-w-lg bg-white shadow-lg flex flex-col justify-center items-center rounded-lg p-6 relative">
                <div class="flex items-center pb-3 border-b border-gray-300">
                    <h3 class="text-gray-800 text-xl font-inter flex-1">
                        Two factor Authentication (2FA)
                    </h3>
                </div>

                <div class="my-6 flex justify-center items-center flex-col">
                    <h1 className=" font-inter text-[#537AF6] border-b-2 w-full text-left pb-1">
                        Configuring Google Authenticator or Authy
                    </h1>
                    <p className="text-sm py-1">
                        1. Install Google Authenticator (IOS -
                        Android) or Authy (IOS - Android). <br /> 2.
                        In the authenticator app, select "+" icon.{' '}
                        <br /> 3. Select "Scan a barcode (or QR
                        code)" and use the phone's camera to scan
                        this barcode.
                    </p>
                    <h1 className=" font-inter text-[#537AF6] border-b-2 pb-1 w-full text-left">
                        Scan QR code
                    </h1>
                    <img src={qr} className="h-[200px] w-[200px]" />
                    <h1 className=" font-inter text-[#537AF6] border-b-2 pb-1 w-full text-left">
                        Verify Code
                    </h1>
                    <p className="text-sm py-1 text-left w-full">
                        Please verify the authentication code:
                    </p>
                    <input
                        type="number"
                        onChange={(e) => {
                            steOtp(e.target.value)
                        }}
                        minLength={6}
                        maxLength={6}
                        className="w-[88%] text-lg text-gray-800 border font-body border-gray-300 px-4 py-2 rounded-lg outline-none self-start"
                    />
                </div>

                <button
                    onClick={() => {
                        data["otp"] = otp
                        dispatch(verifyAction(data, setLoading, navigate))
                    }}
                    className=' w-[88%] px-5 py-1 bg-blue-500 rounded-lg self-start'>
                    {
                        loading ?
                            <p className=' text-center text-white font-inter w-full  text-2xl'>
                                loading...
                            </p>
                            :
                            <p className=' text-center text-white font-inter w-full  text-2xl'>
                                signup
                            </p>
                    }

                </button>
            </div>
        </div>
    )
}
