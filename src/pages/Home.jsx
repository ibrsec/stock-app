import React, { useEffect } from "react";
import Chart from "../components/charts/Chart";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import useStockRequest from "../services/useStockRequest";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import BalanceIcon from '@mui/icons-material/Balance';
const Home = () => {
  const { purchases, sales } = useSelector((state) => state.stock);
  const {getDataApi} = useStockRequest();

  useEffect(()=>{
    getDataApi("sales");
    getDataApi("purchases");
  },[])


  const totalSales = sales.map(item=>item.amount).reduce((sum,current)=>sum + current);
  const totalPurchases = purchases.map(item=>item.amount).reduce((sum,current)=>sum + current);
  const profit =totalSales - totalPurchases;


  return (
    <>
      <Box display={"flex"} alignItems="start" justifyContent="center" gap={2} mt={5} flexWrap="wrap" >
        <Box display={"flex"} alignItems="start" justifyContent="center" gap={3} borderRadius={2} backgroundColor="primary.main" p={2}>
          <Box variant="span" component="span" sx={{backgroundColor:"lightpink",borderRadius:"50%",color:"purple",padding:"12px"}} display="flex" alignItems="center" justifyContent="center"><MonetizationOnIcon/></Box>
          <Box>
            <Box sx={{color:"whiteSpec.main",fontWeight:"600"}}>Sales</Box>
            <Box sx={{color:"whiteSpec.main",whiteSpace:"nowrap"}}>$ {totalSales}</Box>
          </Box>
        </Box>



        <Box display={"flex"} alignItems="start" justifyContent="center" gap={3} borderRadius={2} backgroundColor="primary.main" p={2}>
          <Box variant="span" component="span" sx={{backgroundColor:"#D9E291",borderRadius:"50%",color:"#62304A",padding:"12px"}} display="flex" alignItems="center" justifyContent="center"><BalanceIcon/></Box>
          <Box>
            <Box sx={{color:"whiteSpec.main",fontWeight:"600"}}>Profit</Box>
            <Box sx={{color:"whiteSpec.main",whiteSpace:"nowrap"}}>$ {profit}</Box>
          </Box>
        </Box>



        <Box display={"flex"} alignItems="start" justifyContent="center" gap={3} borderRadius={2} backgroundColor="primary.main" p={2}>
          <Box variant="span" component="span" sx={{backgroundColor:"#32CAFA",borderRadius:"50%",color:"#9F4C38",padding:"12px"}} display="flex" alignItems="center" justifyContent="center"><ShoppingCartCheckoutIcon/></Box>
          <Box>
            <Box sx={{color:"whiteSpec.main",fontWeight:"600"}}>Purchases</Box>
            <Box sx={{color:"whiteSpec.main",whiteSpace:"nowrap"}}>$ {totalPurchases}</Box>
          </Box>
        </Box>
      </Box>
       


      <Box display="flex" flexWrap="wrap" mt={10}>
        <Chart datas={purchases} dataName="Purchases" />
        <Chart datas={sales} dataName="Sales" />
      </Box>
    </>
  );
};

export default Home;
