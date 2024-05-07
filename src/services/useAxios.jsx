


import axios from 'axios'
import { useSelector } from 'react-redux'

const useAxios = () => {
    const token = useSelector((state)=> state.auth.token)
    const axiosToken = axios.create({
        baseURL: process.env.REACT_APP_BASE_URL,
        headers:{Authorization: `Token ${token}`}
    })
    const axiosPublic = axios.create({
        baseURL: process.env.REACT_APP_BASE_URL
    })
  return {axiosToken,axiosPublic}
}

export default useAxios