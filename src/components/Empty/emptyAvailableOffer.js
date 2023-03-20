import React from 'react';
import "../../styles/Empty/list.css";

export default function EmptyAvailableOffer(){
    return(
        <div className="container-fluid  mt-100">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h5 style={{textAlign:'center'}}>OFFERS</h5>
                            </div>
                            <div className="card-body cart">
                                <div className="col-sm-12 empty-cart-cls text-center">
                                    <img src="images/banner/noofferfound.png" width="130" height="130" className="img-fluid mb-4 mr-3" />
                                    <h3><strong>See Offers for another model</strong></h3>
                                    <h4>No Offer Available For This Model :)</h4>
                                    {/* <button className="btn btn-primary cart-btn-transform m-3" data-abc="true" onClick={SwitchOnAddProduct}>Add New Product</button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}