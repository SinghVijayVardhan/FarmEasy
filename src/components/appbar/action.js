import { ListItem, ListItemIcon } from "@mui/material";
import { Applist, AppbarIcons } from "../../styles/appbar";
import { Person,LogoutRounded } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import React from "react";

export default function Actions() {
    const location = useLocation();
    const activePage = location.pathname;

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem('user');
        localStorage.clear();
        window.location.href="/";
    }

    if (activePage === '/Profile') {
        return (
            <AppbarIcons>
                <Applist>
                    <ListItem Button onClick={logout} sx={{ justifyContent: 'center' }}>
                        <ListItemIcon sx={{ display: 'flex', justifyContent: 'center' ,stroke:'3.9',color:'red'}}>
                            <LogoutRounded />
                        </ListItemIcon>
                    </ListItem>
                </Applist>
            </AppbarIcons>
        )
    }
    else {
        return (
            <AppbarIcons>
                <Applist>
                    <ListItem Button component={Link} to="/Profile" sx={{ justifyContent: 'center' }}>
                        <ListItemIcon sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Person />
                        </ListItemIcon>
                    </ListItem>
                </Applist>
            </AppbarIcons>
        )
    }
}