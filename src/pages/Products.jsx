import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import useStockRequest from "../services/useStockRequest.js";
import { useSelector } from "react-redux";
import { Alert, Box, Button, FormControlLabel, Switch } from "@mui/material"; 
import { useEffect, useState } from "react"; 
import DeleteProduct from "../components/products/DeleteProduct.jsx";
import SkeltonTable from "../components/SkeltonTable.jsx";
import ProductModal from "../components/products/ProductModal.jsx";
import BorderColorIcon from "@mui/icons-material/BorderColor";

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
    quickFilterExcludeHiddenColumns: true,
    quickFilterValues: [""],
  });
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({});
  useEffect(() => {
    getDataApi("products");
    getDataApi("brands");
    getDataApi("categories");
  }, []);
  console.log(products);
  const rows = products?.map((item) => {
    return {
      id: item._id,
      category: item.categoryId?.name,
      brand: item.brandId?.name,
      name: item?.name,
      stock: item.quantity,
      actions: item,
    };
  });
  console.log("rows=", rows);
  const columns = [
    { field: "id", headerName: "ID", width: 70, flex: 1 },
    { field: "category", headerName: "Category", width: 130, flex: 1 },
    { field: "brand", headerName: "Brand", width: 130, flex: 1 },
    { field: "name", headerName: "Name", width: 130, flex: 1 },
    {
      field: "stock",
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
                categoryId: params.row.actions?.categoryId?._id,
                brandId: params.row.actions?.brandId?._id,
                name: params.row.actions?.name,
                _id: params.row.actions?._id,
              });
            }}
          >
            <BorderColorIcon />
          </button>
          <DeleteProduct
            productName={params.row.actions.name}
            id={params.row.actions._id}
          />
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

      {error && (
        <Alert severity="error" sx={{ marginBottom: "25px" }}>
          Couldn't get the Products!!
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
