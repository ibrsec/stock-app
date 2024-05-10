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

const EditProduct = ({ item }) => {
  const { _id: id, categoryId, brandId, name } = item;
 
  const EditProductSchema = object({
    name: string().max(40, "Max 20 character"),
  });
  const categories = useSelector((state) => state.stock.categories);
  const brands = useSelector((state) => state.stock.brands);
  const { putEditApi } = useStockRequest();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    toastWarnNotify("Editting is Cancelled");
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
              categoryId: categoryId?._id,
              brandId: brandId?._id,
              name: name,
            }}
            validationSchema={EditProductSchema}
            onSubmit={(values, actions) => {
              //? - [x]  form and values
              console.log(values);

              //? - [x]  post new firm api write-call
              //? - [x]  get firms after post
              //? - [x]  show the result error success
              putEditApi("products", id, values);

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
              touched,
              errors,
              isSubmitting,
            }) => (
              <Form>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Category"
                      name="categoryId"
                      value={values.categoryId}
                      onChange={handleChange}
                    >
                      {categories?.map((item, index) => (
                        <MenuItem key={index} value={item._id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Brand</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Brand"
                      name="brandId"
                      value={values.brandId}
                      onChange={handleChange}
                    >
                      {brands?.map((item, index) => (
                        <MenuItem key={index} value={item._id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    label="Product Name"
                    required
                    name="name"
                    id="name"
                    type="text"
                    variant="outlined"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && Boolean(errors.name)}
                    helperText={errors.name}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={isSubmitting}
                  >
                    UPDATE PRODUCT
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

export default EditProduct;
