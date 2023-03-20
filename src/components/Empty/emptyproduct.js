import React from 'react';
import "../../styles/Empty/list.css";

export default function EmptyProduct(){
    return(
        <div className="container-fluid  mt-100">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h5 style={{textAlign:'center'}}>PRODUCTS</h5>
                            </div>
                            <div className="card-body cart">
                                <div className="col-sm-12 empty-cart-cls text-center">
                                    <img src="https://img.freepik.com/free-vector/empty-concept-illustration_114360-1188.jpg?w=740&t=st=1672579762~exp=1672580362~hmac=36b3032fbae0673ab7e6b5f82576854d02fa572629a969a47e6fe47a3c575290" width="130" height="130" className="img-fluid mb-4 mr-3" />
                                    <h3><strong>Sorry for inconvenience</strong></h3>
                                    <h4>No Product Available For This Category :)</h4>
                                    {/* <button className="btn btn-primary cart-btn-transform m-3" data-abc="true" onClick={SwitchOnAddProduct}>Add New Product</button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}