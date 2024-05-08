import { useDispatch } from "react-redux";
import useAxios from "./useAxios" 
import { fetchFirmFail, fetchFirmStart, firmsSuccess,deleteSuccess, postNewDataSuccess, successWitoutPayload } from "../features/firmsSlice";
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
            const {data} = await axiosToken("/"+path)
            console.log(`useStocktan getData(${path})= `,data);
            dispatch(firmsSuccess({data,path}))
        } catch (error) {
            toastErrorNotify("Error! Couldn't Get Firms");
            dispatch(fetchFirmFail())
            console.log(error);
            
        }
    }
    const deleteSelectedDataApi = async (path,id) => {
 
        try {
            dispatch(fetchFirmStart())
            const {data} = await axiosToken.delete(`${path}/${id}` )
            console.log(`useStocktan getData(${path})= `,data);
            dispatch(successWitoutPayload())
            toastSuccessNotify(`Deleted Successfully!`);
            getDataApi(path);
        } catch (error) {
            toastErrorNotify("Error! The Firm couldn't be deleted !");
            dispatch(fetchFirmFail())
            console.log(error);
            
        }
    }
    const postNewDataApi = async (path,firmData) => {
 
        try {
            dispatch(fetchFirmStart())
            const {data} = await axiosToken.post(path,firmData)
            console.log(`useStocktan postnewData(${path})= `,data);
            dispatch(successWitoutPayload())
            toastSuccessNotify(`New Firm is added Successfully!`);
            getDataApi(path); 
        } catch (error) {
            toastErrorNotify("Error! The New Firm couldn't be added !");
            dispatch(fetchFirmFail())
            console.log(error);
            
        }
    }
    const putEditApi = async (path,id,firmData) => {
 
        try {
            dispatch(fetchFirmStart())
            const {data} = await axiosToken.put(`${path}/${id}`,firmData)
            console.log(`useStocktan putEditData(${path})= `,data);
            dispatch(successWitoutPayload())
            toastSuccessNotify(`The Firm is editted Successfully!`);
            getDataApi(path); 
        } catch (error) {
            toastErrorNotify("Error! The New Firm couldn't be editted !");
            dispatch(fetchFirmFail())
            console.log(error);
            
        }
    }
    return { getDataApi,deleteSelectedDataApi,postNewDataApi,putEditApi }
}

export default useStockRequest
