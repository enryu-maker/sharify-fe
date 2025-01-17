import CryptoJS from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';
import axiosCustomer, { baseURL } from '../../helper/helper';
import axios from 'axios';
import { toast } from 'react-toastify';

export const processFileAction = (file, privateKey, chunkSize, setProgress, setShare, setBlockchain) => {
    return async (dispatch) => {
        if (!file || !privateKey) {
            alert('Please upload a file and provide a private key.');
            return;
        }

        const reader = new FileReader();
        let offset = 0;
        let chunkIndex = 0;
        let previousHash = null;
        const processedBlockchain = [];

        const calculateHash = (data) => {
            return CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex);
        };

        const signHash = (hash, privateKey) => {
            return CryptoJS.HmacSHA256(hash, privateKey).toString(CryptoJS.enc.Hex);
        };

        const createBlock = (index, hash, previousHash, signature, fileName) => {
            return {
                index,
                hash,
                previousHash: previousHash || '0',
                signature,
                name: `${fileName}_chunk`,
            };
        };

        const handleChunkLoad = () => {
            const byteArray = new Uint8Array(reader.result);
            const chunkHash = calculateHash(byteArray);
            const signature = signHash(chunkHash, privateKey);
            const block = createBlock(chunkIndex, chunkHash, previousHash, signature, file.name);

            processedBlockchain.push(block);
            previousHash = chunkHash;
            offset += chunkSize;
            chunkIndex++;

            if (offset < file.size) {
                readNextChunk();
            } else {
                // dispatch({
                //     type: "PROCESS_FILE_SUCCESS",
                //     payload: processedBlockchain,
                // });
                toast.success("File processing complete.")
                setTimeout(() => {
                    setShare(1)
                    setBlockchain(processedBlockchain)
                }, 5000)
                console.log(processedBlockchain);
            }
        };

        const readNextChunk = () => {
            setProgress((offset / file.size) * 100);
            const slice = file.slice(offset, offset + chunkSize);
            reader.readAsArrayBuffer(slice);
        };

        reader.onload = handleChunkLoad;
        readNextChunk();
    };
};

export const fileToBlockchainAction = (file, privateKey, chunkSize, setProgress, setShare, setBlockchain) => {
    return async (dispatch) => {
        try {
            if (!file || !privateKey) {
                toast.error('Please provide a valid file and private key.');
                return;
            }

            const reader = new FileReader();
            let offset = 0;
            let chunkIndex = 0;
            let previousHash = null;
            const processedBlockchain = [];

            // Utility: Calculate hash for data
            const calculateHash = (data) => {
                return CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex);
            };

            // Utility: Sign hash with private key
            const signHash = (hash, privateKey) => {
                // Ensure the private key is in the correct format
                if (typeof privateKey !== 'string') {
                    throw new Error('Private key must be a string.');
                }
                return CryptoJS.HmacSHA256(hash, privateKey).toString(CryptoJS.enc.Hex);
            };

            // Utility: Create a block
            const createBlock = (index, hash, previousHash, signature, data) => {
                return {
                    index,
                    hash,
                    previousHash: previousHash || '0',
                    signature,
                    data: btoa(String.fromCharCode(...new Uint8Array(data))), // Convert chunk data to base64
                };
            };

            // Handle file chunk load
            const handleChunkLoad = () => {
                const chunkData = new Uint8Array(reader.result);
                const chunkHash = calculateHash(chunkData);
                const signature = signHash(chunkHash, privateKey);
                const block = createBlock(chunkIndex, chunkHash, previousHash, signature, chunkData);

                processedBlockchain.push(block);
                previousHash = chunkHash;
                offset += chunkSize;
                chunkIndex++;

                // Check if more chunks need to be processed
                if (offset < file.size) {
                    readNextChunk();
                } else {
                    // Dispatch the processed blockchain to Redux
                    dispatch({
                        type: 'FILE_TO_BLOCKCHAIN_SUCCESS',
                        payload: processedBlockchain,
                    });

                    // Update UI states
                    setProgress(100);
                    setTimeout(() => {
                        setBlockchain(processedBlockchain);
                        setShare(1)
                    }, 5000)

                    toast.success('File successfully converted to blockchain!');
                    console.log('Processed Blockchain:', processedBlockchain);
                }
            };

            // Read the next file chunk
            const readNextChunk = () => {
                setProgress((offset / file.size) * 100);
                const slice = file.slice(offset, offset + chunkSize);
                reader.readAsArrayBuffer(slice);
            };

            // Start processing the file
            reader.onload = handleChunkLoad;
            readNextChunk();
        } catch (error) {
            console.error('Error processing file:', error);
            toast.error(`Error: ${error.message}`);
        }
    };
};


// Utility: Decode base64 to Uint8Array
const base64ToBinary = (base64) => {
    const binaryString = atob(base64);
    const binaryArray = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        binaryArray[i] = binaryString.charCodeAt(i);
    }
    return binaryArray;
};

// Verify Integrity
const verifyIntegrity = (blocks) => {
    for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];
        const decodedData = base64ToBinary(block.data);
        const calculatedHash = CryptoJS.SHA256(decodedData).toString(CryptoJS.enc.Hex);

        if (calculatedHash !== block.hash) {
            throw new Error(`Integrity check failed at block ${i}`);
        }

        if (i > 0 && block.previousHash !== blocks[i - 1].hash) {
            throw new Error(`Chain linkage broken at block ${i}`);
        }
    }
    return true;
};

export const blockchainToFileAction = (blockchain, file_name) => {
    return async (dispatch) => {
        try {
            if (!blockchain || blockchain.length === 0) {
                throw new Error('Blockchain data is empty.');
            }

            // Verify blockchain integrity
            verifyIntegrity(blockchain);

            // Reconstruct file data
            const sortedBlocks = blockchain.sort((a, b) => a.index - b.index);
            const fileData = [];
            sortedBlocks.forEach((block) => {
                const chunkData = base64ToBinary(block.data);
                fileData.push(...chunkData);
            });

            const reconstructedFile = new Uint8Array(fileData);
            const blob = new Blob([reconstructedFile]);

            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = file_name;
            link.click();
            toast.success('File successfully reconstructed and downloaded!');
        } catch (error) {
            console.error('Error reconstructing file:', error);
            toast.error(`Error: ${error.message}`);
        }
    };
};



export const getProfile = (setLoading) => {
    setLoading(true)
    return async (dispatch) => {
        await axiosCustomer
            .get(baseURL + '/v1/auth/profile/')
            .then((res) => {
                dispatch({
                    type: "USER_PROFILE",
                    payload: res?.data
                })
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                toast.error(err.response.data.msg, {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'light',
                    style: {
                        fontFamily: 'Inter Tight',
                    }
                })
            })
    }
}

export const shareFile = (data, setLoading) => {
    setLoading(true)
    return async (dispatch) => {
        await axiosCustomer
            .post(baseURL + '/v1/sharedata/share/', data)
            .then((res) => {
                toast.success(res?.data?.message)
                window.location.reload()
                setLoading(false)

            })
            .catch((err) => {
                setLoading(false)
                toast.error(err?.response?.data?.msg, {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'light',
                    style: {
                        fontFamily: 'Inter Tight',
                    }
                })
            })
    }
}

export const getFile = (setLoading) => {
    setLoading(true)
    return async (dispatch) => {
        await axiosCustomer
            .get(baseURL + '/v1/sharedata/get-files/')
            .then((res) => {
                console.log(res?.data)
                setLoading(false)
                dispatch({
                    type: 'USER_FILES',
                    payload: res?.data?.files
                })
            })
            .catch((err) => {
                setLoading(false)
                toast.error(err?.response?.data?.msg, {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'light',
                    style: {
                        fontFamily: 'Inter Tight',
                    }
                })
            })
    }
}

export const getSharedFile = (setLoading) => {
    setLoading(true)
    return async (dispatch) => {
        await axiosCustomer
            .get(baseURL + '/v1/sharedata/get-shared-files/')
            .then((res) => {
                console.log(res?.data)
                setLoading(false)
                dispatch({
                    type: 'USER_SHARED_FILES',
                    payload: res?.data?.files
                })
            })
            .catch((err) => {
                setLoading(false)
                toast.error(err?.response?.data?.msg, {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'light',
                    style: {
                        fontFamily: 'Inter Tight',
                    }
                })
            })
    }
}
