import React from 'react';
import { FaRegFile } from "react-icons/fa";
import { TbEyeSearch } from "react-icons/tb";
import { FiDownloadCloud } from "react-icons/fi";
import { useDispatch } from 'react-redux';
import { blockchainToFileAction } from '../../store/actions/dashActions';

export default function Card({ item }) {
    console.log(item)
    const dispatch = useDispatch()
    const [file, setFile] = React.useState(null)
    const [progress, setProgress] = React.useState(0)

    return (
        <div className="h-[240px] w-[220px] border shadow-lg rounded-lg flex flex-col font-inter justify-between items-center bg-gradient-to-br from-white to-blue-50 hover:shadow-xl transition-shadow duration-200 ease-in-out p-4">
            {/* File Icon */}
            <FaRegFile className="text-7xl text-blue-500 mb-4" />

            {/* Created At */}
            <p className="text-gray-600 text-sm mb-2 text-center font-inter">
                <span className="font-medium font-inter">Shared At:</span> <br />
                {new Date(item?.created_at).toLocaleString()}
            </p>

            {/* Email */}
            <p className="text-gray-800 text-sm font-semibold font-inter truncate text-center">
                <span className="font-medium font-inter">Shared To:</span> <br />
                {item?.email}
            </p>

            {/* Action Icons */}
            <div className="flex gap-4 mt-4">
                <button
                    onClick={() => {
                        dispatch(blockchainToFileAction(item?.data, item?.file_name))
                    }}
                    className="text-green-600 hover:text-green-800 flex items-center justify-center space-x-2 text-xl transition-colors">
                    <FiDownloadCloud title="Download File" />
                    <span className=' text-sm'>Download</span>
                </button>
            </div>
        </div>
    );
}
