import React,{useState} from 'react';
import { Container } from '@mui/material';
import { ListItem } from '@mui/material';
import { Link } from 'react-router-dom';

export default function EmptyOffer(){

    return(
        <Container>
            <div className="container-fluid  mt-100">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h5>Contracts</h5>
                            </div>
                            <div className="card-body cart">
                                <div className="col-sm-12 empty-cart-cls text-center">
                                    <img src="images/emptybox.png" width="130" height="130" className="img-fluid mb-4 mr-3" />
                                    <h3><strong>No Contracts Added</strong></h3>
                                    <h4>Add something to make me happy :)</h4>
                                    <ListItem component={Link} to="/companyAgreement">
                                    <button className="btn btn-primary cart-btn-transform m-3" data-abc="true" >Add New Offer</button>
                                    </ListItem>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}