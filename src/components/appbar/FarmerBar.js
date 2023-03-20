import React from "react";
import { Applist } from "../../styles/appbar";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faHandshake } from '@fortawesome/fontawesome-free-solid'
import { ListItemIcon, ListItemText, ListItem } from "@mui/material";
import { Link } from "react-router-dom";

export default function FarmerBar(){
    return(
        <Applist>
        <ListItem Button component={Link} to='/'>
            <ListItemText primary="home" />
        </ListItem>
        <ListItem Button component={Link} to='/FutureBuy' >
            <ListItemText primary="Contracts" />
        </ListItem>
        <ListItem Button component={Link} to='/contact' >
            <ListItemText primary="Contact us" />
        </ListItem>
        <ListItem Button component={Link} to="/agreementCart">
            <ListItemIcon>
            <FontAwesomeIcon icon={faHandshake} style={{height:'30px',width:'30px'}}/>
            </ListItemIcon>
        </ListItem>
    </Applist>
    )
}
