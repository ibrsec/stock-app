import { useDispatch } from "react-redux";
import useAxios from "./useAxios" 
import { fetchFirmEnd, fetchFirmStart, firmsSuccess,deleteSuccess } from "../features/firmsSlice";
import {
    toastErrorNotify,
    toastSuccessNotify,
    toastWarnNotify,
  } from "../helper/ToastNotify";
 
const useStockRequest = () => {
    const {axiosToken} = useAxios();
    const dispatch = useDispatch();


    const getDataApi = async (path) => {

        try {
            dispatch(fetchFirmStart())
            const {data} = await axiosToken(path)
            console.log(`useStocktan getData(${path})= `,data);
            dispatch(firmsSuccess(data))
        } catch (error) {
            toastErrorNotify("Error! Couldn't Get Firms");
            dispatch(fetchFirmEnd())
            console.log(error);
            
        }
    }
    const deleteSelectedDataApi = async (path,id) => {
 
        try {
            dispatch(fetchFirmStart())
            const {data} = await axiosToken.delete(`${path}/${id}` )
            console.log(`useStocktan getData(${path})= `,data);
            dispatch(deleteSuccess())
            toastSuccessNotify(`Deleted Successfully!`);
            getDataApi(path); 
        } catch (error) {
            toastErrorNotify("Error! The Firm couldn't be deleted !");
            dispatch(fetchFirmEnd())
            console.log(error);
            
        }
    }
    return { getDataApi,deleteSelectedDataApi }
}

export default useStockRequest
