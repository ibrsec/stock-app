 
import Box from "@mui/material/Box";
import Button from "@mui/material/Button"; 
import Modal from "@mui/material/Modal";
import { Form, Formik } from "formik";
import { TextField } from "@mui/material";
import {   object, string } from "yup";
import useStockRequest from "../../services/useStockRequest";
import { toastWarnNotify } from "../../helper/ToastNotify";
import { useState } from "react";

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

const NewBrandModal = () => {
  const newFirmSchema = object({
    name: string().max(40, "Max 20 character"), 
    image: string().url().nullable().max(250, "Max 150 character"),
  });

  const { postNewDataApi } = useStockRequest();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    toastWarnNotify("Adding new Brand is Cancelled")
  };

  return (
    <div>
      <Button variant="contained" marginy={2} onClick={handleOpen} sx={{marginBottom:"25px"}}>
        NEW BRAND
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
              name: "", 
              image: "",
            }}
            validationSchema={newFirmSchema}
            onSubmit={(values, actions) => {
              //? - [x]  form and values
              console.log(values);

              //? - [x]  post new firm api write-call
              //? - [x]  get firms after post
              //? - [x]  show the result error success
              postNewDataApi("brands", values);

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
                  <TextField
                    label="Firm Name"
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
                  <TextField
                    label="Image"
                    required
                    name="image"
                    id="image"
                    type="text"
                    variant="outlined"
                    value={values.image}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.image && Boolean(errors.image)}
                    helperText={errors.image}
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

export default NewBrandModal;