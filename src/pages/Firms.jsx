import { useEffect } from "react"
import useStockRequest from "../services/useStockRequest";
import { Alert, Box, Typography } from "@mui/material";
import FirmCard from "../components/firms/FirmCard";
import { useSelector } from "react-redux";
import NewFirm from "../components/firms/NewFirm"; 

 

const Firms = () => {
const {getDataApi} = useStockRequest();
const firms = useSelector((state)=>state.firms.firms)
const error = useSelector((state)=>state.firms.error)
console.log(error);
  useEffect(()=>{
    getDataApi("firms");
  },[])

  console.log('firmsten = ', firms)


  return (
    <div>
      <Typography variant='h3' marginy={2} >Firms</Typography>
      {/* New Firm button */}
    <NewFirm />
    {error && <Alert severity="error" sx={{marginBottom:"25px"}}>Couldn't get the firms!!</Alert>}
    
      {/* Firms List */}
      <Box display="flex" flexWrap='wrap' gap={2} justifyContent="center" alignItems="center"   marginy={5}>
       {firms?.map(firm => <FirmCard key={firm._id} {...firm} />)}
      </Box>

      
    </div>
  )
}

export default Firms