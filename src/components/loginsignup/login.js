import { FormBox, FormContainer, Formheading, Formtitle, FormGroup, StyledButton } from "../../styles/form";
import { FormInput } from "../../styles/form";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import React from "react";
import axios from "axios";
import {Alert} from '@mui/material';

export default function Login({ statusUpdate, setStatus }) {
    const theme = useTheme();
    const [formControls, setformControls] = useState({ phone: null, password: null });
    const [error,seterror] = useState("");

    const onStatusUpdate = (e) => {
        e.preventDefault();
        statusUpdate(false);
    }

    const handleChange = (e) => {
        setformControls((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    }

    const onUpdate = async(e) => {
        e.preventDefault();
        if (formControls.name !== null && formControls.password !== null) {
            axios.post('http://127.0.0.1:1000/login',formControls).then((res) => {
                if(res.data.status==="error")
                    seterror(res.data.error)
                else
                    setStatus({name:res.data.fullname,phone:res.data.phone,farmer:res.data.farmer});
             })
        }
        else {
            seterror("Email or Password is missing !!!")
        }
    }

    return (
        <FormBox theme={theme}>
            <Formheading>FarmEasy</Formheading>
            <FormContainer theme={theme}>
                <form onSubmit={onUpdate}>
                    <Formtitle>Log in to the FarmEasy</Formtitle>
                    {(error!=="")?<Alert severity="error">{error}</Alert>:<h1></h1>}
                    <FormGroup>
                        <FormInput type="number" value={formControls.phone} placeholder="Enter phone number" name="phone" onChange={handleChange} fullWidth required />
                    </FormGroup>
                    <FormGroup>
                        <FormInput type="password" value={formControls.password} placeholder="Password" name="password" onChange={handleChange} fullWidth required />
                    </FormGroup>
                    <FormGroup>
                        <Button type="submit" variant="contained" size="big">Log in</Button>
                    </FormGroup>
                </form>
                <hr style={{ margin: '20px' }} />
                <FormGroup>
                    <StyledButton type="submit" variant="contained" onClick={onStatusUpdate}>Create New Account</StyledButton>
                </FormGroup>
            </FormContainer>
        </FormBox>
    );
}