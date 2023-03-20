import React from "react";
import { Button, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";

export default function AddButton({ onclickfunction, Buttontext }) {
    const IconStyle = {
        color: 'black',
        backgroundColor: 'skyblue',
        width: '50%',
        height: '30px',
        border: '2px solid skyblue',
        borderRadius: '4px',
        textAlign : 'right'
    }

    return (
        <Button onClick={onclickfunction} style={IconStyle}>
             <Add/>
            <Typography variant="h6">{Buttontext}</Typography>
        </Button>
    )
}