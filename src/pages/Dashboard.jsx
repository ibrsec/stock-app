// import React from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import CssBaseline from "@mui/material/CssBaseline";

// import Toolbar from "@mui/material/Toolbar";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import useApiRequests from "../services/useApiRequests";
// import { useSelector } from "react-redux";

// function Dashboard() {
//   const currentUser = true;
//   const { logoutApi } = useApiRequests();
//   const tokenGlobal = useSelector((state) => state.auth.token);
//   console.log(tokenGlobal);
   
//   const handleLogout = () => {
//     //? GET - token logout
//     //? write api
//     //? delete global user and token states
//     //?show the results
//     // navigate to login page
    
//     //? write api
//     //? delete global user and token states
//     //?show the results
//     // navigate to login page
//     logoutApi(tokenGlobal)
//   };

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       <AppBar position="fixed">
//         <Toolbar>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             STOCK APP
//           </Typography>
//           {currentUser && (
//             <Button color="inherit" onClick={handleLogout}>
//               Logout
//             </Button>
//           )}
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// }

// export default Dashboard;



import * as React from "react"
import PropTypes from "prop-types"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import CssBaseline from "@mui/material/CssBaseline"
import Divider from "@mui/material/Divider"
import Drawer from "@mui/material/Drawer"
import IconButton from "@mui/material/IconButton"

import MenuIcon from "@mui/icons-material/Menu"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import useApiRequests from "../services/useApiRequests";
import { useSelector } from "react-redux";
import { Button } from "@mui/material"
import MenuListComp from "../components/MenuListComp"
import { Outlet } from "react-router-dom"

const drawerWidth = 240

function Dashboard(props) {

  const currentUser = true;
  const { logoutApi } = useApiRequests();
  const tokenGlobal = useSelector((state) => state.auth.token);
 
   
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




  const { window } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [isClosing, setIsClosing] = React.useState(false)

  const handleDrawerClose = () => {
    setIsClosing(true)
    setMobileOpen(false)
  }

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false)
  }

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen)
    }
  }

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <MenuListComp />
      
    </div>
  )

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Stock App
          </Typography>
          
          {currentUser && (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor:'secondary.main'
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor:'secondary.main'
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />





      </Box>
    </Box>
  )
}

export default Dashboard
