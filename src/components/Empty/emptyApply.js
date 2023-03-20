import React from 'react';
import "../../styles/Empty/list.css";
import { ListItem,ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

export default function EmptyApply() {
    return (
        <div className="container  mt-80" style={{width:'50%'}}>
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h5 style={{ textAlign: 'center' }}>No Agreement<SentimentVeryDissatisfiedIcon /></h5>
                        </div>
                        <div className="card-body cart">
                            <div className="col-sm-12 empty-cart-cls text-center">
                                <img src="https://i0.wp.com/www.lawcolumn.in/wp-content/uploads/2021/01/void-agreement.jpg?fit=309%2C163&ssl=1" width="260" height="260" className="img-fluid mb-4 mr-3" />
                                <ListItem Button component={Link} to='/FutureBuy' sx={{textAlign:'center'}}>
                                    <ListItemText primary="Apply Now" />
                                </ListItem>
                                <h4>Not Yet Applied :)</h4>
                                {/* <button className="btn btn-primary cart-btn-transform m-3" data-abc="true" onClick={SwitchOnAddProduct}>Add New Product</button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}