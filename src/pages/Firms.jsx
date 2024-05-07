import { useEffect } from "react"
import useStockRequest from "../services/useStockRequest";
import { Box, Typography } from "@mui/material";
import FirmCard from "../components/firms/FirmCard";
import { useSelector } from "react-redux";
import NewFirm from "../components/firms/NewFirm";

 

const Firms = () => {
const {getDataApi} = useStockRequest();
const firms = useSelector((state)=>state.firms.firms)
  useEffect(()=>{
    getDataApi("/firms");
  },[])

  console.log('firmsten = ', firms)


  return (
    <div>
      <Typography variant='h3' marginY={2} >Firms</Typography>
      {/* New Firm button */}
    <NewFirm />

      {/* Firms List */}
      <Box display="flex" flexWrap='wrap' gap={2} justifyContent="center" alignItems="center"   marginY={5}>
       {firms?.map(firm => <FirmCard key={firm._id} {...firm} />)}
      </Box>

      
    </div>
  )
}

export default Firms