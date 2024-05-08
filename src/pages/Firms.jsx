import { useEffect } from "react"
import useStockRequest from "../services/useStockRequest";
import { Alert, Box, Typography } from "@mui/material";
import FirmCard from "../components/firms/FirmCard";
import { useSelector } from "react-redux";
import NewFirm from "../components/firms/NewFirm"; 
import SkeltonCards from "../components/SkeltonCards";

 

const Firms = () => {
const {getDataApi} = useStockRequest();
const firms = useSelector((state)=>state.stock.firms)
const error = useSelector((state)=>state.stock.error)
const loading = useSelector((state)=>state.stock.loading)
// const loading = true
console.log(error);
  useEffect(()=>{
    getDataApi("firms");
// eslint-disable-next-line
  },[])

  console.log('firmsten = ', firms)


  return (
    <div>
      <Typography variant='h3' marginy={2} color="greenSpec.main" fontWeight="550" align="center">Firms</Typography>
      {/* New Firm button */}
    <NewFirm />
    {error && <Alert severity="error" sx={{marginBottom:"25px"}}>Couldn't get the firms!!</Alert>}
    
    

    {loading ? <Box marginLeft={12} marginRight={12}><SkeltonCards /></Box> : (
<>
      {/* Firms List */}
      <Box display="flex" flexWrap='wrap' gap={2} justifyContent="center" alignItems="center"   marginy={5}>
       {firms?.map(firm => <FirmCard key={firm._id} {...firm} />)}
      </Box></>
    )}
    
    

      
    </div>
  )
}

export default Firms