import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import useStockRequest from "../services/useStockRequest.js";
import { useSelector } from "react-redux";
import { Alert, Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import DeleteProduct from "../components/products/DeleteProduct.jsx";
import SkeltonTable from "../components/SkeltonTable.jsx";
import ProductModal from "../components/products/ProductModal.jsx";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { ErrorMessage, WarningMessage } from "../components/DataFetchMessages.jsx";

export default function DataTable() {
  const products = useSelector((state) => state.stock.products);
  const error = useSelector((state) => state.stock.error);
  const loading = useSelector((state) => state.stock.loading);
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    categoryId: "",
    brandId: "",
    name: "",
  });

  const { getDataApi } = useStockRequest();

  const [filterModel, setFilterModel] = useState({
    items: [],
    quickFilterValues: [""],
  });
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({});
  useEffect(() => {
    getDataApi("products");
    getDataApi("brands");
    getDataApi("categories");
  }, []);
  console.log(products);
  // const rows = products?.map((item) => {
  //   return {
  //     id: item._id,
  //     category: item.categoryId?.name,
  //     brand: item.brandId?.name,
  //     name: item?.name,
  //     stock: item.quantity,
  //     actions: item,
  //   };
  // });
  // console.log("rows=", rows);
  const columns = [
    { field: "_id", headerName: "ID", width: 70, flex: 1 },
    {
      field: "category",
      headerName: "Category",
      width: 130,
      flex: 1,
      valueGetter: (value, row) => row?.categoryId?.name,
    },
    {
      field: "brand",
      headerName: "Brand",
      width: 130,
      flex: 1,
      editable: true,

      valueGetter: (value, row) => row?.brandId?.name,
    },
    { field: "name", headerName: "Name", width: 130, flex: 1 },
    {
      field: "quantity",
      headerName: "Stock",
      type: "number",
      width: 90,
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 300,
      flex: 1,
      renderCell: (params) => (
        <Box
          display="flex"
          alignItems="start"
          justifyContent="start"
          gap={1}
          flexWrap="nowrap"
        >
          <button
            style={{
              backgroundColor: "transparent",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => {
              setOpen(true);
              setValues({
                categoryId: params.row?.categoryId?._id,
                brandId: params.row?.brandId?._id,
                name: params.row?.name,
                _id: params.row?._id,
              });
            }}
          >
            <BorderColorIcon />
          </button>
          <DeleteProduct productName={params.row?.name} id={params.row?._id} />
        </Box>
      ),
      sortable: false,
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Button
        variant="contained"
        marginy={2}
        onClick={() => setOpen(true)}
        sx={{ marginBottom: "25px" }}
      >
        NEW PRODUCT
      </Button>
      <ProductModal
        open={open}
        setOpen={setOpen}
        values={values}
        setValues={setValues}
      />

      {/* {error && (
        <Alert severity="error" sx={{ marginBottom: "25px" }}>
          Couldn't get the Products!!
        </Alert>
      )} */}




      {
      loading ?
       <Box marginLeft={12} marginRight={12}>
         <SkeltonTable />
       </Box>
      : error ? 
      <ErrorMessage msg="Couldn't load the data"/> 
      : !products.length ?
       <WarningMessage msg="There is no data to show!"/> 
      :  
       (
        <>
          <DataGrid
            autoHeight
            rows={products}
            columns={columns}
            getRowId={(row) => row._id}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10, 20, 100]}
            checkboxSelection
            // filterModel={filterModel}
            // onFilterModelChange={setFilterModel}
            // hideFooter
            // slots={{ toolbar: GridToolbar }}
            slotProps={{ toolbar: { showQuickFilter: true } }}
            slots={{ toolbar: GridToolbar }}
          />
        </>
      )
      }
    </div>
  );
}
