import React, { useEffect } from 'react'
import useStockRequest from '../services/useStockRequest'
import { useSelector } from 'react-redux';
import { Alert, Box, Typography } from '@mui/material';
import SkeltonCards from '../components/SkeltonCards';
import BrandCard from '../components/brands/BrandCard';
import NewBrand from '../components/brands/NewBrand';

const Brands = () => {

  const {getDataApi} = useStockRequest();
  const error = useSelector((state)=>state.stock.error)
  const loading = useSelector((state)=>state.stock.loading)
  const brands = useSelector((state)=> state.stock.brands)

  useEffect(()=>{
    getDataApi("brands")
  },[])
  


  return (
    <div>
      <Typography variant='h3' marginy={2} color="greenSpec.main" fontWeight="550" align="center">Brands</Typography>
      {/* New Firm button */}
    <NewBrand />
    {error && <Alert severity="error" sx={{marginBottom:"25px"}}>Couldn't get the brands!!</Alert>}
    
    

    {loading ? <Box marginLeft={12} marginRight={12}><SkeltonCards /></Box> : (
<>
      {/* Firms List */}
      <Box display="flex" flexWrap='wrap' gap={2} justifyContent="center" alignItems="center"   marginy={5}>
       {brands?.map(brand => <BrandCard key={brand._id} {...brand} />)}
      </Box></>
    )}
    
    </div>
  )
}

export default Brands