import React from 'react'
import SideBar from '../modal/SideBar'
import { useDispatch, useSelector } from 'react-redux'
import { fileToBlockchainAction, getFile, getProfile, getSharedFile, processFileAction, shareFile } from '../../store/actions/dashActions'
import Card from '../modal/Card'
import { toast } from 'react-toastify'

export default function Dashboard() {
    const [current, setCurret] = React.useState(0)
    const [share, setShare] = React.useState(0)
    const [loading, setLoading] = React.useState(false)
    const [file, setFile] = React.useState(null)
    const [progress, setProgress] = React.useState(0)
    const [blockchain, setBlockchain] = React.useState([])
    const [email, setEmail] = React.useState("")
    const [preview, setPreview] = React.useState(null) // State for preview
    const chunkSize = 1024 // Size of each chunk in bytes
    const files = useSelector(state => state.Reducers.file)
    const shared_files = useSelector(state => state.Reducers.shared_files)


    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0]
        setFile(selectedFile)

        // Create a preview for images or videos
        if (selectedFile) {
            const fileReader = new FileReader()

            if (selectedFile.type.startsWith('image')) {
                fileReader.onloadend = () => {
                    setPreview(fileReader.result)
                }
                fileReader.readAsDataURL(selectedFile)
            } else if (selectedFile.type.startsWith('video')) {
                setPreview(URL.createObjectURL(selectedFile)) // For video preview
            }
        }
    }
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(getProfile(setLoading))
        dispatch(getFile(setLoading))
        dispatch(getSharedFile(setLoading))
    }, [dispatch])

    const profile = useSelector(state => state.Reducers.profile)

    return (
        <div className=' w-screen h-screen flex justify-between font-inter bg-white'>
            <SideBar />
            <div className="w-full h-screen bg-white">
                <div className="h-[70px] w-full items-center flex justify-between space-x-2 px-5 border-b">
                    <div className="flex space-x-3">
                        <button
                            onClick={() => {
                                setCurret(0)
                            }}
                            className={` ${current === 0 ? "underline text-blue-500 underline-offset-4" : ""} transition-all duration-700 space-x-2 flex items-center cursor-pointer`}>
                            My Files
                        </button>
                        <button
                            onClick={() => {
                                setCurret(1)
                            }}
                            className={`${current === 1 ? "underline text-blue-500 underline-offset-4" : ""} transition-all duration-700 space-x-2 flex items-center cursor-pointer`}>
                            Shared File
                        </button>
                        <button
                            onClick={() => {
                                setCurret(2)
                            }}
                            className={`${current === 2 ? "underline text-blue-500 underline-offset-4" : ""} transition-all duration-700 space-x-2 flex items-center cursor-pointer`}>
                            Share New File
                        </button>
                    </div>
                    <div className=" text-black text-end">
                        <p className=' font-medium'>{profile?.name}</p>
                        <p className=' text-sm text-blue-500 underline'>@ {profile?.username}</p>
                    </div>
                </div>
                {
                    current === 0 ?
                        <>
                            <p className=' font-inter pt-5 px-5'>Recent Files</p>
                            <div className=" bg-white w-full h-full p-5 flex flex-wrap justify-between px-5">
                                {
                                    files.map((item, index) => (
                                        <Card key={index} item={item} />
                                    ))
                                }
                            </div>
                        </>

                        : null
                }
                {
                    current === 1 ?
                        <>
                            <p className=' font-inter pt-5 px-5'>Shared Files</p>
                            <div className=" bg-white w-full h-full p-5 flex flex-wrap justify-between px-5">
                                {
                                    shared_files.map((item, index) => (
                                        <Card key={index} item={item} />
                                    ))
                                }
                            </div>
                        </>

                        : null
                }
                {
                    current === 2 ?
                        <>
                            {
                                share === 0 ?
                                    <div className=' flex flex-col justify-center items-center'>

                                        <div className="rounded-lg border-2 border-gray-200 border-dashed w-[400px] mt-6">
                                            <div className="p-4 min-h-[180px] flex flex-col items-center justify-center text-center cursor-pointer">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-10 mb-4 fill-gray-600 inline-block"
                                                    viewBox="0 0 32 32"
                                                >
                                                    <path
                                                        d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                                                    />
                                                    <path
                                                        d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                                                    />
                                                </svg>

                                                <h4 className="text-sm text-gray-600">
                                                    Drag & Drop or{' '}
                                                    <label htmlFor="chooseFile" className="text-blue-600 cursor-pointer">
                                                        Choose file
                                                    </label>{' '}
                                                    to upload
                                                </h4>
                                                <input type="file" id="chooseFile" className="hidden" onChange={handleFileChange} />
                                            </div>
                                        </div>

                                        {/* Preview Section */}
                                        {preview && (
                                            <div className="mt-6 self-center w-full flex justify-center">
                                                {file.type.startsWith('image') ? (
                                                    <img src={preview} alt="File Preview" className="w-[100px] rounded-lg" />
                                                ) : file.type.startsWith('video') ? (
                                                    <video controls className="w-full rounded-lg">
                                                        <source src={preview} type={file.type} />
                                                    </video>
                                                ) : null}
                                            </div>
                                        )}

                                        <div className="flex flex-col bg-gray-50 p-4 rounded-lg mt-4 w-[400px]">
                                            <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className="absolute top-0 left-0 h-full bg-blue-500 rounded-full transition-all"
                                                    style={{ width: `${progress}%` }}
                                                ></div>
                                            </div>
                                            <div className="text-sm text-gray-600 mt-2 text-right">
                                                {Math.round(progress)}%
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-200 pt-6 flex w-[400px] justify-between gap-4 mt-6">
                                            <button
                                                onClick={() => {
                                                    window.location.reload()
                                                }}
                                                type="button"
                                                className="w-full px-4 py-2 rounded-lg text-gray-800 text-sm border-none outline-none tracking-wide bg-gray-200 hover:bg-gray-300 active:bg-gray-200"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    dispatch(fileToBlockchainAction(file, profile?.totp_secret, chunkSize, setProgress, setShare, setBlockchain))
                                                }}
                                                className="w-full px-4 py-2 rounded-lg text-white text-sm border-none outline-none tracking-wide bg-blue-500 hover:bg-blue-700 active:bg-blue-600"
                                            >
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                    :
                                    <div className=' flex flex-col justify-center items-center font-inter '>
                                        <div className="mt-6 w-[400px]">
                                            <h4 className="text-gray-800 text-lg font-medium font-inter">Share file with</h4>
                                            <p className="text-gray-600 text-xs mt-1">Enter a reciver email to share the file.</p>
                                            <input
                                                type="email"
                                                className="w-full text-lg my-2 text-gray-800 border font-body border-gray-300 px-4 py-2 rounded-lg outline-none"
                                                placeholder="Enter reciever email"
                                                value={email}
                                                onChange={(e) => {
                                                    setEmail(e.target.value)
                                                }}
                                            />
                                        </div>
                                        <div className="border-t border-gray-200 pt-6 flex w-[400px] justify-between gap-4 mt-6">
                                            <button
                                                type="button"
                                                className="w-full px-4 py-2 rounded-lg text-gray-800 text-sm border-none outline-none tracking-wide bg-gray-200 hover:bg-gray-300 active:bg-gray-200"
                                                onClick={() => setShare(0)}
                                            >
                                                back
                                            </button>
                                            <button
                                                type="button"
                                                className="w-full px-4 py-2 rounded-lg text-white text-sm border-none outline-none tracking-wide bg-blue-500 hover:bg-blue-700 active:bg-blue-600"
                                                onClick={() => {
                                                    if (blockchain) {
                                                        console.log({
                                                            user_id: profile?.id,
                                                            data: blockchain,
                                                            email: email,
                                                            fil_name: file.name
                                                        })
                                                        dispatch(shareFile({
                                                            user_id: profile?.id,
                                                            data: blockchain,
                                                            email: email,
                                                            file_name: file.name,
                                                        }, setLoading));
                                                    }
                                                    else {
                                                        toast.error("Error in File Processing")
                                                    }
                                                }}
                                            >
                                                Share File
                                            </button>
                                        </div>
                                    </div>
                            }
                        </>
                        :
                        null}
            </div>
        </div>
    )
}
