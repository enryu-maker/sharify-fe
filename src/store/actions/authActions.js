import axios from "axios"
import { toast } from "react-toastify"
import { baseURL } from "../../helper/helper"


export const loginAction = (data, setLoading, setQR, setShow) => {
    setLoading(true)
    return async (dispatch) => {
        await axios
            .post(baseURL + '/v1/auth/login/', data, {
                responseType: 'blob'
            })
            .then((res) => {
                console.log(res.data)
                setQR(URL.createObjectURL(res?.data))
                setLoading(false)
                setShow(true)
            })
            .catch((err) => {
                setLoading(false)
                console.log(err.response.data.msg)
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

export const registerAction = (data, setLoading) => {
    setLoading(true)
    return async (dispatch) => {
        await axios
            .post(baseURL + '/v1/auth/register/', data)
            .then((res) => {
                toast.success(res?.data?.message)
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

export const verifyAction = (data, setLoading, navigate) => {
    setLoading(true)
    return async (dispatch) => {
        await axios
            .post(baseURL + '/v1/auth/verify/', data)
            .then((res) => {
                dispatch({
                    type: "USER_ACCESS",
                    payload: res?.data?.access_token
                })
                localStorage.setItem("access", res?.data?.access_token)
                setLoading(false)
                navigate("/dashboard")
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