import React from "react";
import { Applist } from "../../styles/appbar";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';import { ListItemIcon, ListItemText, ListItem } from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

export default function CompanyBar(){
    return(
        <Applist>
        <ListItem Button component={Link} to='/'>
            <ListItemText primary="home" />
        </ListItem>
        <ListItem Button component={Link} to='/Buy' >
            <ListItemText primary="Products" />
        </ListItem>
        <ListItem Button component={Link} to='/contact' >
            <ListItemText primary="Contact us" />
        </ListItem>
        <ListItem Button component={Link} to="/cart">
            <ListItemIcon>
                <ShoppingCartCheckoutIcon />
            </ListItemIcon>
        </ListItem>
        <ListItem Button component={Link} to="/purchase">
            <ListItemIcon>
                <ShoppingBagIcon />
            </ListItemIcon>
        </ListItem>
    </Applist>
    )
}
