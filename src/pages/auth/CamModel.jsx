import React from 'react'
import Webcam from "react-webcam";
export default function CamModel({
    setShow
}) {
    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
    };
    return (
        <div>
            <div id="modal">
                <div
                    class="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto">
                    <div class="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 relative">
                        <div class="flex items-center pb-3 border-b border-gray-300">
                            <h3 class="text-slate-900 text-xl font-semibold flex-1">Face Data</h3>
                            <svg 
                            onClick={()=>{
                                setShow(false)
                            }}
                            id="closeIcon" xmlns="http://www.w3.org/2000/svg"
                                class="w-3.5 h-3.5 ml-2 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500"
                                viewBox="0 0 320.591 320.591">
                                <path
                                    d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                                    data-original="#000000"></path>
                                <path
                                    d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                                    data-original="#000000"></path>
                            </svg>
                        </div>

                        <div class="my-6">
                            <Webcam
                                audio={false}
                                height={720}
                                screenshotFormat="image/jpeg"
                                width={1280}
                                videoConstraints={videoConstraints}
                            >
                                {({ getScreenshot }) => (
                                    <button type="button"
                                    onClick={() => {
                                        const imageSrc = getScreenshot()
                                    }}
                                    class="px-4 py-2 rounded-lg text-white text-sm font-medium border-none outline-none tracking-wide bg-blue-600 hover:bg-blue-700 active:bg-blue-600">Save</button>
                                )}
                            </Webcam>
                        </div>
                    </div>
                </div>
            </div>

            <button id="openModal" type="button"
                class="mt-4 mx-auto block px-4 py-2 rounded-lg text-white text-sm font-medium border-none outline-none tracking-wide bg-blue-600 hover:bg-blue-700 active:bg-blue-600">Open
                modal</button>
        </div>
    )
}
