import { Button, FormControlLabel, FormLabel, Radio, RadioGroup, Select, MenuItem,Alert} from "@mui/material";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import React from "react";
import axios from 'axios';
import { Formheading, FormContainer, FormBox, FormGroup, StyledButton, Formtitle, FormInput } from "../../styles/form";

export default function SignUp({ statusUpdate }) {
    const switchpage = () => {
        statusUpdate(true);
    };
    const [error,seterror]=useState("");
    const [conpassword,setconpassword] = useState("");
    const theme = useTheme();
    const [formControls, setformControls] = useState({ fullname: "", email: "", phone: "", gender: 'Male', dob: "", state:"Delhi", password: "",farmer:true});
    const [temp,settemp] = useState({ fullname: "", email: "", phone: "",dob: "", password: "", conpassword: "" }); 
    const handleChange = (e) => {
        setformControls((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
        verified()
    }

    const check = (e) => { return e.length === 0 }

    const verified = () => {
        var error=(/^[A-Za-z ]+$/).test(formControls.fullname) ? "" : "This Field can only have alphabates";
        temp.fullname=error;
        error = (/^(\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+)?$/).test(formControls.email) ? "" : "Invalid Email Address";
        temp.email=error;
        error = (/^[6-9]{1}[0-9]{9}$/).test(formControls.phone) ? "" : "Invalid Phone number";
        temp.phone=error;
        var dt = new Date(formControls.dob);
        var now = Date.now("yyyy-mm-dd");
        var diff = Math.abs(now - dt);
        diff = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
        error = diff < 18 ? "Person should be of 18 or above" : "";
        temp.dob=error;
        error = conpassword !== formControls.password ? "Password and Conform password must be same" : "";
        temp.conpassword=error;
        error = (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).test(formControls.password) ? "" : "Minimum eight character,at least one letter,one number,one uppercase letter and a special character required";
        temp.password=error;
        //console.log(temp);
        return (Object.values(temp)).every(check);
    }


    const onUpdate = async(e) => {
        e.preventDefault()
        //console.log(formControls)
        if(verified()){
            axios.post('http://127.0.0.1:1000/register',formControls).then((res) => {
                //console.log(res);
                if(res.data.status==="error")
                    seterror("Use different phone number")
                 // TODO : HANDLE 
             })
             if(error===""){
                axios.post('http://127.0.0.1:3002/register',formControls).then((res)=>{
                    alert("User Registered Succesfully");
                })
                window.location.reload(false);
             }
        }
    }

    return (
        <FormBox theme={theme} sx={{ width: '60%' }}>
            <Formheading>FarmEasy</Formheading>
            <FormContainer theme={theme} >
                <form onSubmit={onUpdate} method="post">
                    <Formtitle>Sign up to the FarmEasy</Formtitle>
                    { error!==""?<Alert severity="error">{error}</Alert>:<h1></h1>}
                    <FormGroup>
                        <FormInput type="text" sx={{ padding: '3%' }} placeholder="Enter Name" name="fullname" onChange={handleChange} value={formControls.fullname} error={Boolean(temp.fullname!=="")} helperText={temp.fullname} fullWidth required/>
                    </FormGroup>
                    <FormGroup>
                        <FormInput type="email" sx={{ padding: '3%' }} placeholder="Enter Email" name="email" onChange={handleChange} value={formControls.email} error={Boolean(temp.email!=="")} helperText={temp.email} fullWidth />
                    </FormGroup>
                    <FormGroup>
                        <FormInput type="text" sx={{ padding: '3%' }} placeholder="Enter contact number" name="phone" onChange={handleChange} value={formControls.phone} error={Boolean(temp.phone!=="")} helperText={temp.phone} fullWidth required/>
                    </FormGroup>
                    <FormGroup>
                        <FormInput type="date" sx={{ padding: '3%' }} placeholder="Enter Date of Birth" name="dob" onChange={handleChange} value={formControls.dob} error={Boolean(temp.dob!=="")} helperText={temp.dob} fullWidth required />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel sx={{ padding: "0 25px" }}>Gender</FormLabel>
                        <RadioGroup defaultValue='Male' onChange={handleChange} name="gender" row>
                            <FormControlLabel value="Male" label="Male" control={<Radio />} />
                            <FormControlLabel value="Female" label="Female" control={<Radio />} />
                            <FormControlLabel value="Other" label="Other" control={<Radio />} />
                        </RadioGroup>
                    </FormGroup>
                    <FormGroup>
                    <FormLabel sx={{ padding: "0 25px" }}>Occupation</FormLabel>
                        <RadioGroup defaultValue='Farmer' onChange={handleChange} name="farmer" row>
                            <FormControlLabel value={false} label="Company" control={<Radio />} />
                            <FormControlLabel value={true} label="Farmer" control={<Radio />} />                        </RadioGroup>
                    </FormGroup>
                    <FormGroup>
                        <Select onChange={handleChange} name="state" defaultValue="Delhi" value={formControls.state} sx={{ width: '100%', justifyContent: 'center', alignItems: 'center', margin: '3%' }}>
                            <MenuItem value="Andhra Pradesh">Andhra Pradesh</MenuItem>
                            <MenuItem value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</MenuItem>
                            <MenuItem value="Arunachal Pradesh">Arunachal Pradesh</MenuItem>
                            <MenuItem value="Assam">Assam</MenuItem>
                            <MenuItem value="Bihar">Bihar</MenuItem>
                            <MenuItem value="Chandigarh">Chandigarh</MenuItem>
                            <MenuItem value="Chhattisgarh">Chhattisgarh</MenuItem>
                            <MenuItem value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</MenuItem>
                            <MenuItem value="Daman and Diu">Daman and Diu</MenuItem>
                            <MenuItem value="Delhi">Delhi</MenuItem>
                            <MenuItem value="Lakshadweep">Lakshadweep</MenuItem>
                            <MenuItem value="Puducherry">Puducherry</MenuItem>
                            <MenuItem value="Goa">Goa</MenuItem>
                            <MenuItem value="Gujarat">Gujarat</MenuItem>
                            <MenuItem value="Haryana">Haryana</MenuItem>
                            <MenuItem value="Himachal Pradesh">Himachal Pradesh</MenuItem>
                            <MenuItem value="Jammu and Kashmir">Jammu and Kashmir</MenuItem>
                            <MenuItem value="Jharkhand">Jharkhand</MenuItem>
                            <MenuItem value="Karnataka">Karnataka</MenuItem>
                            <MenuItem value="Kerala">Kerala</MenuItem>
                            <MenuItem value="Madhya Pradesh">Madhya Pradesh</MenuItem>
                            <MenuItem value="Maharashtra">Maharashtra</MenuItem>
                            <MenuItem value="Manipur">Manipur</MenuItem>
                            <MenuItem value="Meghalaya">Meghalaya</MenuItem>
                            <MenuItem value="Mizoram">Mizoram</MenuItem>
                            <MenuItem value="Nagaland">Nagaland</MenuItem>
                            <MenuItem value="Odisha">Odisha</MenuItem>
                            <MenuItem value="Punjab">Punjab</MenuItem>
                            <MenuItem value="Rajasthan">Rajasthan</MenuItem>
                            <MenuItem value="Sikkim">Sikkim</MenuItem>
                            <MenuItem value="Tamil Nadu">Tamil Nadu</MenuItem>
                            <MenuItem value="Telangana">Telangana</MenuItem>
                            <MenuItem value="Tripura">Tripura</MenuItem>
                            <MenuItem value="Uttar Pradesh">Uttar Pradesh</MenuItem>
                            <MenuItem value="Uttarakhand">Uttarakhand</MenuItem>
                            <MenuItem value="West Bengal">West Bengal</MenuItem>
                        </Select>
                    </FormGroup>
                    <FormGroup>
                        <FormInput type="password" sx={{ padding: '3%' }} placeholder="Enter Password" name="password" onChange={handleChange} value={formControls.password} error={Boolean(temp.password!=="")} helperText={temp.password}  fullWidth required/>
                    </FormGroup>
                    <FormGroup>
                        <FormInput type="password" sx={{ padding: '3%' }} placeholder="Retype password" name="conpassword" onChange={(e)=>{setconpassword(e.target.value); verified()}} value={conpassword} error={Boolean(conpassword!=="")} helperText={temp.conpassword}  fullWidth required/>
                    </FormGroup>
                    <FormGroup>
                        <Button type="submit" variant="contained" size="big">Sign Up</Button>
                    </FormGroup>
                </form>
                <hr style={{ margin: '20px' }} />
                <FormGroup>
                    <StyledButton variant="contained" onClick={switchpage}>Already have an account ?</StyledButton>
                </FormGroup>
            </FormContainer>
        </FormBox>
    )
}