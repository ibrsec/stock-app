import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Form, Formik } from "formik";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

import useStockRequest from "../../services/useStockRequest";
import { toastWarnNotify } from "../../helper/ToastNotify";
import { useState } from "react";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const NewSale = () => {  
  const brands = useSelector((state) => state.stock.brands);
  const products = useSelector((state) => state.stock.products);
  const { postNewDataApi } = useStockRequest();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    toastWarnNotify("Adding  is Cancelled");
  };

  return (
    <div>
      <Button
        variant="contained"
        marginy={2}
        onClick={handleOpen}
        sx={{ marginBottom: "25px" }}
      >
        NEW SALE
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Formik
            initialValues={{ 
              brandId:"",
              productId:"",
              quantity: "", 
              price: "", 
            }} 
            onSubmit={(values, actions) => {
              //? - [x]  form and values
              console.log(values);

              //? - [x]  post new firm api write-call
              //? - [x]  get firms after post
              //? - [x]  show the result error success
              postNewDataApi("sales", values);

              //? - [x]  close the modal
              setOpen(false);

              //? [x] -reset form
              actions.resetForm();
              actions.setSubmitting(false);
            }}
          >
            {({
              values,
              handleChange,
              handleBlur, 
              isSubmitting,
            }) => (
              <Form>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  
                  <FormControl fullWidth>
                    <InputLabel id="purchase-brand-new-label">Brand</InputLabel>
                    <Select
                      labelId="purchase-brand-new-label"
                      id="purchase-brand-new"
                      label="Brand"
                      name="brandId"
                      value={values.brandId}
                      onChange={handleChange}
                      required
                    >
                        {brands?.map((item,index)=>(
                            <MenuItem key={index} value={item._id}>{item.name}</MenuItem>

                        ))} 
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel id="purchase-product-new-label">Product</InputLabel>
                    <Select
                      labelId="purchase-product-new-label"
                      id="purchase-product-new"
                      label="Product"
                      name="productId"
                      value={values.productId}
                      onChange={handleChange}
                      required
                    >
                        {products?.map((item,index)=>(
                            <MenuItem key={index} value={item._id}>{item.name}</MenuItem>

                        ))} 
                    </Select>
                  </FormControl> 
                  <TextField
                    label="Quantity" 
                    required 
                    name="quantity" 
                    id="quantity" 
                    type="text" 
                    variant="outlined" 
                    value={values.quantity} 
                    onChange={handleChange} 
                    onBlur={handleBlur} 
                    
                  /> 
                  <TextField
                    label="Price"
                    required
                    name="price"
                    id="price"
                    type="text"
                    variant="outlined"
                    value={values.price} 
                    onChange={handleChange} 
                    onBlur={handleBlur} 
                    
                  /> 
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={isSubmitting}
                  >
                    ADD SALE
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};

export default NewSale;
