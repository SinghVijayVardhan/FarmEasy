import React from 'react';
import "../../styles/Empty/list.css";

export default function EmptyPurchase(){
    return(
        <div className="container-fluid  mt-100">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h5 style={{textAlign:'center'}}>ORDERS</h5>
                            </div>
                            <div className="card-body cart">
                                <div className="col-sm-12 empty-cart-cls text-center">
                                    <img src="https://media.istockphoto.com/id/531492129/vector/set-of-colorful-empty-shopping-bags-isolated-vector-illustration.jpg?s=170667a&w=0&k=20&c=2BF4C1DiJoCH8rOywiaXOvIDj9P4z3r-n30sxacNSMY=" width="130" height="130" className="img-fluid mb-4 mr-3" />
                                    <h3><strong>Sorry for inconvenience</strong></h3>
                                    <h4>No Purchase Available For This Category :)</h4>
                                    {/* <button className="btn btn-primary cart-btn-transform m-3" data-abc="true" onClick={SwitchOnAddProduct}>Add New Product</button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}