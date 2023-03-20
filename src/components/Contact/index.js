import React from "react";
import { Container,Box,Typography } from "@mui/material";
import "../../styles/contact.css";
//import { Email } from '@mui/icons-material';

export default function ContactUs() {
    const customEmail = 
            <Box>
                <Box sx={{alignItems:'center'}}>
                    <img src="images/gmail_logo.webp" />
                </Box>
                <div style={{textAlign:'center'}}>
                <a href="mailto:vijoybardhan3@gmail.com" style={{textDecoration:'none'}}>
                    <Typography variant="h6">vijoybardhan3@gmail.com</Typography> 
                </a>
                </div>
            </Box>

const customPhone = 
                <Box sx={{alignItems:'center'}}>
                    <img src="images/phone.png" />
                </Box>

    return (
        <Container>
            <section className="background firstsection">
                <div className="box-main">
                    <div className="firstHalf">
                        <p className="text-big">Contact Us</p>

                        <p className="text-small">
                            You can Contact Us if you face any problem
                        </p>

                        <br />
                            <p className="center"
                                style={{textDecoration:'none',color:'white'}}>
                                Click on the below options to Contact us
                            </p>
                    </div>
                </div>
            </section>
            <section className="service">

                <h1 className="h-primary center"
                    style={{marginTop:'30px'}}>
                    Options to Contact
                </h1>
                <div id="service" style={{display:'flex'}}>
                            <div className="box" style={{flex:'50%'}}>
                                    {customEmail}
                                    <br />
                                        <p className="center">
                                            Use this Email to send us about the problem faced
                                        </p>
                                    </div>
                                    <div className="box" style={{flex:'50%'}}>
                                            {customPhone}
                                            <br />
                                                <p className="center">
                                                    Toll Free Number:+91 7870 677 286
                                                </p>
                                            </div>
                                    </div>
                                </section>
                                <footer className="background">
                                    <p className="text-footer">
                                        Copyright @-All rights are reserved
                                    </p>

                                </footer>
                            </Container>
                            );
}

