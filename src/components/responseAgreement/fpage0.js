import { Typography,Container } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
//import { Link} from "react-router-dom";
import { Instagram, Facebook, Email, GitHub, Twitter } from "@mui/icons-material";
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBListGroup,
    MDBListGroupItem
} from 'mdb-react-ui-kit';
import axios from 'axios';

export default function FPage_0({id}){
    const [data, setdata] = useState(true);
    const [profile,updateprofile] = useState([]);
    const [phone,setPhone] = useState(null);

    useEffect(()=>{
        axios.post('http://127.0.0.1:3002/getFarmerById',{id:id}).then((res)=>{
            setPhone(res.data[0].phone);
            setProfile();
        })
      },[phone,id]);


    const setProfile = async() => {
        if (data) {
            await axios.post('http://127.0.0.1:1000/enter',{phone:phone}).then(async(res) => 
            {
            updateprofile(res.data)
        });
            setdata(false);
        }
    }
        return(
                <Container>
                    <Typography variant="h4" color="primary" sx={{textAlign:'center'}}>User Profile</Typography>
                    <MDBContainer className="py-5">
                    <MDBRow>
                        <MDBCol lg="6">
                            <MDBCard className="mb-4">
                                <MDBCardBody className="text-center">
                                    {profile.profilePic===null?
                                        <MDBCardImage
                                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                                        alt="avatar"
                                        className="rounded-circle"
                                        style={{ width: '150px' }}
                                        fluid />:<MDBCardImage
                                        src={`data:image/jpeg;base64,$(profile.profilePic.data.toString('base64'))`}
                                        alt="Profile Pic"
                                        className="rounded-circle"
                                        style={{ width: '150px' }}
                                        fluid />
                                        }
                                    <p className="text-muted mb-1">{profile.fullname}</p>
                                    <p className="text-muted mb-4">{profile.state + " ,India"}</p>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol lg="6">
                            <MDBCard className="mb-4">
                                <MDBCardBody>
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Full Name</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">{profile.fullname}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Email</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">{profile.email}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Mobile</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">{profile.phone}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Address</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">{profile.address}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>About</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">{profile.about}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        </MDBRow>
                        <MDBRow>
                    </MDBRow>
                </MDBContainer>
                </Container>
        )
    }