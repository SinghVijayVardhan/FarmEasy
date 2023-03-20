import { Button } from "@mui/material";
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

export default function UserSection({setPage}){
    const [profile, updateprofile] = useState([]);
    const [data, setdata] = useState(true);
    var state={};


    useEffect(() => {
        const d=localStorage.getItem('user');
        state=JSON.parse(d);
        setProfile();
    }, [])

    const setProfile = async() => {
        if (data) {
            await axios.post('http://127.0.0.1:1000/enter', state).then(async(res) => 
            {
            console.log(res)
            updateprofile(res.data)
            console.log(profile);
        });
            setdata(false);
        }
    }
        return(
                <MDBContainer className="py-5">
                    <MDBRow>
                    <MDBCol lg="4">
                    <MDBCard className="mb-4 mb-lg-0">
                                <MDBCardBody className="p-0">
                                    <MDBListGroup flush className="rounded-3">
                                        <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                            <Facebook  sx={{ color: '#3b5998' }}/>
                                            <MDBCardText>{profile.facebook}</MDBCardText>
                                        </MDBListGroupItem>
                                        <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                            <Instagram sx={{ color: '#ac2bac' }}/>
                                            <MDBCardText>{profile.Instagram}</MDBCardText>
                                        </MDBListGroupItem>
                                        <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                            <GitHub sx={{ color: '#333333' }}/>
                                            <MDBCardText>{profile.github}</MDBCardText>
                                        </MDBListGroupItem>
                                        <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                            <Email sx={{color:'#f57002'}}/>
                                            <MDBCardText>{profile.email}</MDBCardText>
                                        </MDBListGroupItem>
                                        <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                            <Twitter sx={{ color: '#55acee' }}/>
                                            <MDBCardText>{profile.twitter}</MDBCardText>
                                        </MDBListGroupItem>
                                    </MDBListGroup>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol lg="4">
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
                                    <Button variant="contained" onClick={setPage}>Edit Profile</Button>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol lg="4">
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
        )
    }