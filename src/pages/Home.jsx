import React, { useEffect } from "react";
import Chart from "../components/charts/Chart";
import { useSelector } from "react-redux";
import useStockRequest from "../services/useStockRequest";
import { Box } from "@mui/material";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import BalanceIcon from '@mui/icons-material/Balance';
import Kpi from "../components/kpi/Kpi";
const Home = () => {
  const { purchases, sales } = useSelector((state) => state.stock);
  const {getDataApi,getAllDataGenericApi} = useStockRequest();

  useEffect(()=>{ 
    //with Promise all
    getAllDataGenericApi(['sales',"purchases"])
  },[])


  const totalSales = sales.map(item=>item.amount).reduce((sum,current)=>sum + current,0);
  const totalPurchases = purchases.map(item=>item.amount).reduce((sum,current)=>sum + current,0);
  const profit =totalSales - totalPurchases;


  return (
    <>
      <Kpi />
       


      <Box display="flex" flexWrap="wrap" mt={10}>
        <Chart datas={purchases} dataName="Purchases" />
        <Chart datas={sales} dataName="Sales" />
      </Box>
    </>
  );
};

export default Home;
