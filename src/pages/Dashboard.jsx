import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useApiRequests from "../services/useApiRequests";
import { useSelector } from "react-redux";

function Dashboard() {
  const currentUser = true;
  const { logoutApi } = useApiRequests();
  const tokenGlobal = useSelector((state) => state.auth.token);
  console.log(tokenGlobal);
   
  const handleLogout = () => {
    //? GET - token logout
    //? write api
    //? delete global user and token states
    //?show the results
    // navigate to login page
    
    //? write api
    //? delete global user and token states
    //?show the results
    // navigate to login page
    logoutApi(tokenGlobal)
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            STOCK APP
          </Typography>
          {currentUser && (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Dashboard;
