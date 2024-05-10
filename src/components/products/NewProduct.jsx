import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Form, Formik } from "formik";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { object, string } from "yup";
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

const NewProductModal = () => {
  const newProductSchema = object({
    name: string().max(40, "Max 20 character"), 
  });
  const categories = useSelector((state) => state.stock.categories);
  const brands = useSelector((state) => state.stock.brands);
  const { postNewDataApi } = useStockRequest();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    toastWarnNotify("Adding is Cancelled");
  };

  return (
    <div>
      <Button
        variant="contained"
        marginy={2}
        onClick={handleOpen}
        sx={{ marginBottom: "25px" }}
      >
        NEW PRODUCT
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
              categoryId:"",
              brandId:"",
              name: "", 
            }}
            validationSchema={newProductSchema}
            onSubmit={(values, actions) => {
              //? - [x]  form and values
              console.log(values);

              //? - [x]  post new firm api write-call
              //? - [x]  get firms after post
              //? - [x]  show the result error success
              postNewDataApi("products", values);

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
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Category"
                      name="categoryId"
                      value={values.categoryId}
                      onChange={handleChange}
                      required

                    >
                        {categories?.map((item,index)=>(
                            <MenuItem key={index} value={item._id}>{item.name}</MenuItem>

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
                      required
                    >
                        {brands?.map((item,index)=>(
                            <MenuItem key={index} value={item._id}>{item.name}</MenuItem>

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
                    ADD BRAND
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

export default NewProductModal;
