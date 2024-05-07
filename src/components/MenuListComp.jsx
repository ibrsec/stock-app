import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import Divider from "@mui/material/Divider";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import SellIcon from '@mui/icons-material/Sell';
import StoreIcon from '@mui/icons-material/Store';
import SmartButtonIcon from '@mui/icons-material/SmartButton';
import InventoryIcon from '@mui/icons-material/Inventory';
import { useNavigate } from "react-router-dom";



const icons = [
  { iconName: <SpaceDashboardIcon />, title: "Dashboard", path: "/stock" },
  {
    iconName: <ShoppingBasketIcon />,
    title: "Purchases",
    path: "/stock/purchases",
  },
  { iconName: <SellIcon />, title: "Sales", path: "/stock/sales" },
  { iconName: <StoreIcon />, title: "Firms", path: "/stock/firms" },
  { iconName: <SmartButtonIcon />, title: "Brands", path: "/stock/brands" },
  {
    iconName: <InventoryIcon />,
    title: "Products",
    path: "/stock/products",
  },
];

const MenuListComp = () => {
  const navigate = useNavigate();

  return (
    <>
      <List>
        {icons.map((item, index) => (
          <ListItem
            key={index}
            disablePadding
            onClick={() => navigate(item.path)}
            sx={{color:'white' , "& .MuiSvgIcon-root":{color:"white"},"& .MuiListItemButton-root:hover":{color:"red"},"& .MuiListItemButton-root:hover .MuiSvgIcon-root":{color:"red"}}}
          >
            <ListItemButton focusVisibleClassName="focus-visible-aaa">
              <ListItemIcon>{item.iconName}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
    </>
  );
};

export default MenuListComp;
