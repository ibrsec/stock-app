import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import BorderColorIcon from "@mui/icons-material/BorderColor";
import useStockRequest from '../../services/useStockRequest';
import { toastWarnNotify } from '../../helper/ToastNotify';
import { Form, Formik } from "formik";
import { TextField } from "@mui/material";
import { number, object, string } from "yup";  



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
  
  const EditFirm = ({firm}) => {
    const { address, _id, phone, image, name } = firm; 
    const newFirmSchema = object({
        name: string().max(20, "Max 20 character"),
        phone: number("Must be a number"),
        address: string().max(50, "Max 50 character"),
        image: string().url().nullable().max(150, "Max 150 character"),
      });


      const {putEditApi} = useStockRequest();
  
  
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {setOpen(false);toastWarnNotify("Edit cancelled");}
    
  
    return (
      <span> 
          <Button size="small" onClick={handleOpen}><BorderColorIcon /></Button>
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
              phone: phone,
              address: address,
              image: image,
            }}
            validationSchema={newFirmSchema}
            onSubmit={(values, actions) => {
              //? - [x]  form and values
              console.log(values);

              //? - [x]  edit with put api the selected firm - write-call
              //? - [x]  get firms after post
              //? - [x]  show the result error success
              putEditApi("firms",_id, values);

            
            
            
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
                    label="Phone"
                    required
                    name="phone"
                    id="phone"
                    type="text"
                    variant="outlined"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.phone && Boolean(errors.phone)} 
                  />
                  <TextField
                    label="Address"
                    required
                    name="address"
                    id="address"
                    type="text"
                    variant="outlined"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.address && Boolean(errors.address)}
                    helperText={errors.address}
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
                    UPDATE FIRM
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
  

export default EditFirm