import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Box } from "@mui/material";
import DeleteFirm from "./DeleteFirm";

const FirmCard = ({ address, _id, phone, image, name }) => {
     
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {address}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={image}
        sx={{ objectFit: "contain" }}
      />
      <Typography
        p={1}
        align="center"
        component="p"
        variant="p"
        color="text.secondary"
      >
        {phone}
      </Typography>
      <CardActions>
        <Box component="div" margin="auto">
            <DeleteFirm firmName={name} id={_id} />
           
          <Button size="small">
            <BorderColorIcon />
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

export default FirmCard;
