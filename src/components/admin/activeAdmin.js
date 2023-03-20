import {Box,Typography,TextField,Button} from '@mui/material';
import React from 'react';

const password = "pesumca";

export default function ActiveAdmin(props){

    const [pswrd,setPswrd] = React.useState(null);

    const handleChange = ()=>{
        if(pswrd===password)
            props.session(true);
        else
            alert("Wrong Password");
    }

    return(
        <Box style={{marginTop:'15%',marginBottom:'30%',marginRight:'auto',marginLeft:'auto',width: '40%',border: '3px solid green',backgroundColor:'white',height:'200px',textAlign:'center'}}>
            <Typography variant="h5" sx={{paddingTop:'10px'}}>Admin Login</Typography>
            <Typography variant="h6" sx={{paddingTop:'10px'}}>Enter admin password for login</Typography>
            <TextField onChange={(e)=>{setPswrd(e.target.value)}} type="password" placeholder="Enter Password" sx={{width:'280px',marginTop:'10px'}}/><br/>
            <Button onClick={handleChange} variant="contained" sx={{marginTop:'10px'}}>Login</Button>
        </Box>
    )
}