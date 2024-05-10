import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import useStockRequest from "../services/useStockRequest.js";
import { useSelector } from "react-redux";
import { Alert, Box, FormControlLabel, Switch } from "@mui/material";
import NewProduct from "../components/products/NewProduct.jsx";
import { useEffect, useState } from "react";
import EditProduct from "../components/products/EditProduct.jsx";
import DeleteProduct from "../components/products/DeleteProduct.jsx";
import SkeltonTable from "../components/SkeltonTable.jsx";
import NewPurchase from "../components/purchases/NewPurchase.jsx";
import EditPurchase from "../components/purchases/EditPurchase.jsx";
import DeletePurchase from "../components/purchases/DeletePurchase.jsx";
const columns = [
  { field: "date", headerName: "Date", width: 150, flex: 1 }, 
  { field: "brand", headerName: "Brand", width: 130, flex: 1 },
  { field: "product", headerName: "Product", width: 130, flex: 1 },

  {
    field: "quantity",
    headerName: "Quantity",
    type: "number",
    width: 90,
    flex: 1,
  },
  {
    field: "price",
    headerName: "Price",
    type: "number",
    width: 90,
    flex: 1,
  },
  {
    field: "amount",
    headerName: "Amount",
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
        <EditPurchase item={params.row.actions} />
        <DeletePurchase id={params.row.actions._id} />
      </Box>
    ),
    sortable: false,
  },
];

// const rows = [
//   { id: 1, category: 'Snow', brand: 'Jon', name: 35 , actions:{_id:1,name:"anme",image:"https://lkmsdf.sdlfkm"}},
//   { id: 2, category: 'Lannister', brand: 'Cersei', name: 42 , actions:{_id:1,name:"anme",image:"https://lkmsdf.sdlfkm"}},
//   { id: 3, category: 'Lannister', brand: 'Jaime', name: 45 , actions:{_id:1,name:"anme",image:"https://lkmsdf.sdlfkm"}},
//   { id: 4, category: 'Stark', brand: 'Arya', name: 16 , actions:{_id:1,name:"anme",image:"https://lkmsdf.sdlfkm"}},
//   { id: 5, category: 'Targaryen', brand: 'Daenerys', name: null , actions:{_id:1,name:"anme",image:"https://lkmsdf.sdlfkm"}},
//   { id: 6, category: 'Melisandre', brand: null, name: 150 , actions:{_id:1,name:"anme",image:"https://lkmsdf.sdlfkm"}},
//   { id: 7, category: 'Clifford', brand: 'Ferrara', name: 44 , actions:{_id:1,name:"anme",image:"https://lkmsdf.sdlfkm"}},
//   { id: 8, category: 'Frances', brand: 'Rossini', name: 36 , actions:{_id:1,name:"anme",image:"https://lkmsdf.sdlfkm"}},
//   { id: 9, category: 'Roxie', brand: 'Harvey', name: 65 , actions:{_id:1,name:"anme",image:"https://lkmsdf.sdlfkm"}},
// ];

export default function Sales() {
  
  const { getDataApi } = useStockRequest();
  
  useEffect(() => {
    getDataApi("products");
    getDataApi("brands"); 
    getDataApi("sales");
  }, []);
  
  
  const sales = useSelector((state) => state.stock.sales);
  const loading = useSelector((state) => state.stock.loading);
  const error = useSelector((state) => state.stock.error);

  const [filterModel, setFilterModel] = useState({
    items: [],
    quickFilterExcludeHiddenColumns: true,
    quickFilterValues: [""],
  });
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({});

  
  console.log(sales);
  const rows = sales?.map((item) => {
    return {
      id: item._id,
      date: item.createdAt,
      brand: item.brandId?.name,
      product: item.productId?.name,
      quantity: item.quantity,
      price: item.price,
      amount: item.amount,
      actions: item,
    };
  });
  console.log(rows);
  return (
    <div style={{ height: 400, width: "100%" }}>
      <NewPurchase />

      {error && (
        <Alert severity="error" sx={{ marginBottom: "25px" }}>
          Couldn't get the Sales!!
        </Alert>
      )}

      {loading ? (
        <Box marginLeft={12} marginRight={12}>
          <SkeltonTable />
        </Box>
      ) : (
        <>
          <FormControlLabel
            checked={columnVisibilityModel.id !== false}
            onChange={(event) =>
              setColumnVisibilityModel(() => ({ id: event.target.checked }))
            }
            control={<Switch color="primary" />}
            label="Show ID column"
          />
          <FormControlLabel
            checked={filterModel.quickFilterExcludeHiddenColumns}
            onChange={(event) =>
              setFilterModel((model) => ({
                ...model,
                quickFilterExcludeHiddenColumns: event.target.checked,
              }))
            }
            control={<Switch color="primary" />}
            label="Exclude hidden columns"
          />
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10, 20, 100]}
            checkboxSelection
            // filterModel={filterModel}
            // onFilterModelChange={setFilterModel}
            // hideFooter
            // slots={{ toolbar: GridToolbar }}
            slotProps={{ toolbar: { showQuickFilter: true } }}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={(newModel) =>
              setColumnVisibilityModel(newModel)
            }
            slots={{ toolbar: GridToolbar }}
          />
          )
        </>
      )}
    </div>
  );
}

 