import { Container, Grid } from '@mui/material';
import {Twitter,GitHub,LinkedIn} from '@mui/icons-material';
import React from 'react';

export default function IconLink() {
    return(
        <Container>
            <Grid container sx={{paddingLeft:'20%',paddingTop:'5%'}}>
                <Grid item xs={4}>
                    <a href="https://twitter.com/VijoySingh14">
                        <Twitter color="primary"/>
                    </a>
                </Grid>
                <Grid item xs={4}>
                <a href="https://twitter.com/VijoySingh14">
                        <GitHub color="inverse"/>
                    </a>
                </Grid>
                <Grid item xs={4}>
                <a href="https://twitter.com/VijoySingh14">
                        <LinkedIn color="blue"/>
                    </a>
                </Grid>
            </Grid>
        </Container>
    );
}
