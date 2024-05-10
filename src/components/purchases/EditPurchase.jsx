 

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Form, Formik } from "formik";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { object, string } from "yup";
import useStockRequest from "../../services/useStockRequest";
import { toastWarnNotify } from "../../helper/ToastNotify";
import { useState } from "react";
import { useSelector } from "react-redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";

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

const EditPurchase = ({item}) => {
    const { _id: id,   brandId, quantity,price,firmId,productId, } = item;


  const firms = useSelector((state) => state.stock.firms);
  const brands = useSelector((state) => state.stock.brands);
  const products = useSelector((state) => state.stock.products);
  const { putEditApi } = useStockRequest();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    toastWarnNotify("Editting  is Cancelled");
  };

  return (
    <div>
      <button
        style={{
          backgroundColor: "transparent",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={handleOpen}
      >
        <BorderColorIcon />
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Formik
            initialValues={{
              firmId: firmId?._id,
              brandId: brandId?._id,
              productId: productId?._id,
              quantity: quantity,
              price: price,
            }}
            onSubmit={(values, actions) => {
              //? - [x]  form and values
              console.log(values);

              //? - [x]  post new firm api write-call
              //? - [x]  get firms after post
              //? - [x]  show the result error success
              putEditApi("purchases",id, values);

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
                    <InputLabel id="purchase-brand-new-label">Firm</InputLabel>
                    <Select
                      labelId="purchase-firm-new-label"
                      id="purchase-firm-new"
                      label="Firm"
                      name="firmId"
                      value={values.firmId}
                      onChange={handleChange}
                      required
                    >
                      {firms?.map((item, index) => (
                        <MenuItem key={index} value={item._id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
                      {brands?.map((item, index) => (
                        <MenuItem key={index} value={item._id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel id="purchase-product-new-label">
                      Product
                    </InputLabel>
                    <Select
                      labelId="purchase-product-new-label"
                      id="purchase-product-new"
                      label="Product"
                      name="productId"
                      value={values.productId}
                      onChange={handleChange}
                      required
                    >
                      {products?.map((item, index) => (
                        <MenuItem key={index} value={item._id}>
                          {item.name}
                        </MenuItem>
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
                    UPDATE PURCHASE
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

export default EditPurchase;
