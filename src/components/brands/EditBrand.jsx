 
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'; 
import Modal from '@mui/material/Modal';
import BorderColorIcon from "@mui/icons-material/BorderColor";
import useStockRequest from '../../services/useStockRequest';
import { toastWarnNotify } from '../../helper/ToastNotify';
import { Form, Formik } from "formik";
import { TextField } from "@mui/material";
import {  object, string } from "yup";  
import { useState } from 'react';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
  const EditBrand = ({firm}) => {
    const {   _id,   image, name } = firm; 
    const newFirmSchema = object({
        name: string().max(40, "Max 20 character"), 
        image: string().url().nullable().max(250, "Max 150 character"),
      });


      const {putEditApi} = useStockRequest();
  
  
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {setOpen(false);toastWarnNotify("Edit cancelled");}
    
  
    return (
      <span> 
          <Button size="small" variant="contained" onClick={handleOpen}><BorderColorIcon /></Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>


          <Formik
            initialValues={{
              name: name, 
              image: image,
            }}
            validationSchema={newFirmSchema}
            onSubmit={(values, actions) => {
              //? - [x]  form and values
              console.log(values);

              //? - [x]  edit with put api the selected firm - write-call
              //? - [x]  get firms after post
              //? - [x]  show the result error success
              putEditApi("brands",_id, values);

            
            
            
            //? [x] -reset form
            actions.resetForm();
            actions.setSubmitting(false);


            //? - [x]  close the modal
            setOpen(false);

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
                    UPDATE BRAND
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>


          </Box>
        </Modal>
      </span>
    );
  }
  

export default EditBrand