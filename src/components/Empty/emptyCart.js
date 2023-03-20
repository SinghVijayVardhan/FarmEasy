import React from 'react';
import "../../styles/Empty/list.css";
import { ListItem,ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

export default function EmptyCart() {
    return (
        <div className="container-fluid  mt-100">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h5 style={{ textAlign: 'center' }}>Empty Cart <SentimentVeryDissatisfiedIcon /></h5>
                        </div>
                        <div className="card-body cart">
                            <div className="col-sm-12 empty-cart-cls text-center">
                                <img src="https://nexispro.com/wp-content/uploads/2020/09/empty-cart.jpg" width="260" height="260" className="img-fluid mb-4 mr-3" />
                                <ListItem Button component={Link} to='/Buy' sx={{textAlign:'center'}}>
                                    <ListItemText primary="Add items to cart" />
                                </ListItem>
                                <h4>No item in the cart :)</h4>
                                {/* <button className="btn btn-primary cart-btn-transform m-3" data-abc="true" onClick={SwitchOnAddProduct}>Add New Product</button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}