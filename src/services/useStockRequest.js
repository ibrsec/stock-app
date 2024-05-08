import { useDispatch } from "react-redux";
import useAxios from "./useAxios" 
import { fetchFirmFail, fetchFirmStart, firmsSuccess, successWitoutPayload } from "../features/firmsSlice";
import {
    taostStopLoading,
    toastErrorNotify,
    toastLoading,
    toastLoadingNotify,
    toastSuccessNotify  
  } from "../helper/ToastNotify";
 
const useStockRequest = () => {
    const {axiosToken} = useAxios();
    const dispatch = useDispatch();


    const getDataApi = async (path) => {
        const idLoading = toastLoading(`Getting the ${path}...` );
        try {
            dispatch(fetchFirmStart())
            const {data} = await axiosToken("/"+path)
            console.log(`useStocktan getData(${path})= `,data);
            dispatch(firmsSuccess({data,path}))
            taostStopLoading(idLoading,"success",`${path} are loaded successfully!`) 
        } catch (error) {
            // toastErrorNotify("Error! Couldn't Get Firms");
            taostStopLoading(idLoading,"error","Error! Datas couldn't be loaded!") 

            dispatch(fetchFirmFail())
            console.log(error);
            
        }
    }
    const deleteSelectedDataApi = async (path,id) => {
        const idLoading = toastLoading(`Deleting...` );
        try {
            dispatch(fetchFirmStart())
            const {data} = await axiosToken.delete(`${path}/${id}` )
            console.log(`useStocktan getData(${path})= `,data);
            dispatch(successWitoutPayload())
            // toastSuccessNotify(`Deleted Successfully!`);
            taostStopLoading(idLoading,"success","Deleted Successfully!") 
            getDataApi(path);
        } catch (error) {
            // toastErrorNotify("Error! The Firm couldn't be deleted !");
            taostStopLoading(idLoading,"error","Error! Data couldn't be deleted!") 

            dispatch(fetchFirmFail())
            console.log(error);
            
        }
    }
    const postNewDataApi = async (path,firmData) => { 
        const idLoading = toastLoading("Creating...!");
        try {
            dispatch(fetchFirmStart())
            const {data} = await axiosToken.post(path,firmData)
            console.log(`useStocktan postnewData(${path})= `,data);
            dispatch(successWitoutPayload())
            // toastSuccessNotify(`New Firm is added Successfully!`);
            getDataApi(path);
            taostStopLoading(idLoading,"success","Posted Successfully!") 
        } catch (error) {
            taostStopLoading(idLoading,"error","Error! The New data couldn't be added !") 
            // toastErrorNotify("Error! The New Firm couldn't be added !");
            dispatch(fetchFirmFail())
            console.log(error);
            
        }
    }
    const putEditApi = async (path,id,firmData) => {
        const idLoading = toastLoading(`Editting...` );
        try {
            dispatch(fetchFirmStart())
            const {data} = await axiosToken.put(`${path}/${id}`,firmData)
            console.log(`useStocktan putEditData(${path})= `,data);
            dispatch(successWitoutPayload())
            // toastSuccessNotify(`The Firm is editted Successfully!`);
            taostStopLoading(idLoading,"success","Editted Successfully!") 
            
            getDataApi(path); 
        } catch (error) {
            // toastErrorNotify("Error! The New Firm couldn't be editted !");
            taostStopLoading(idLoading,"error","Error! Data couldn't be editted!") 

            dispatch(fetchFirmFail())
            console.log(error);
            
        }
    }
    return { getDataApi,deleteSelectedDataApi,postNewDataApi,putEditApi }
}

export default useStockRequest
