import React from 'react';
import { useState } from 'react';
import Login from './login';
import SignUp from './signup';
//import { colors } from '../../styles/theme';
import { Container } from '@mui/material';

export default function LoginSignUp({SessionUpdate}) {
    const [page, setpage] = useState(true);

    const handleState = (data)=>{
        setpage(data);
    }

    const setStatus = (data)=>{
        localStorage.setItem('user',JSON.stringify(data));
        SessionUpdate(false);
    }

    if (page) {
        return (
            <Container sx={{ background: '#00C9FF',
            background: '-webkit-linear-gradient(to right, #92FE9D, #00C9FF)', 
            background: 'linear-gradient(to right, #92FE9D, #00C9FF)' 
            ,paddingBottom:'5%'}}>
                <Login  statusUpdate={handleState} setStatus={setStatus}/>
            </Container>
        )
    }
    else {
        return (
            <Container sx={{ background: '#00C9FF',
            background: '-webkit-linear-gradient(to right, #92FE9D, #00C9FF)', 
            background: 'linear-gradient(to right, #92FE9D, #00C9FF)' 
            ,paddingBottom:'5%'}}>
                <SignUp statusUpdate={handleState}/>
            </Container>
        )
    }
}