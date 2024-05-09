import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import useAxios from '../services/useAxios.jsx';
import DeleteIcon from '@mui/icons-material/Delete';
import useStockRequest from '../services/useStockRequest.js';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import NewProduct from '../components/products/NewProduct.jsx';
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'category', headerName: 'Category', width: 130 },
  { field: 'brand', headerName: 'Brand', width: 130 },
  { field: 'name', headerName: 'Name', width: 130 },
  {
    field: 'stock',
    headerName: 'Stock',
    type: 'number',
    width: 90,
  },
  { field: 'action', headerName: 'Actions', width: 90 },
];

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

export default function DataTable() {
const{axiosToken} = useAxios();
const products = useSelector((state)=>state.stock.products)
   

const {getDataApi} = useStockRequest();



  React.useEffect(()=>{
    getDataApi("products");
    getDataApi("brands");
    getDataApi("categories");
  },[])
  console.log(products);
  const rows = products.map(item => {
    return {id:item._id,category:item.categoryId.name,brand:item.brandId.name,name:item.name,stock:item.quantity,action:"⌫"}
  })
  console.log(rows);
  return (
    <div style={{ height: 400, width: '100%' }}>
      <NewProduct />
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
