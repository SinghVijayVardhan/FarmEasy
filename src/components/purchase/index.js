import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import EmptyProduct from '../Empty/emptyproduct';
//import { Button } from '@mui/material';
import EmptyPurchase from '../Empty/emptyPurchase';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

export default function Purchase() {

    var state = {};
    const [renderProduct, setrender] = useState([]);
    const [reqData,setreqData] = useState({phone:null})
    const [data,setdata] = useState(true);
    const [products,setproducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, [renderProduct]);

    const fetchProducts = async () => {
        const d = localStorage.getItem('user');
        state = JSON.parse(d);
        reqData.phone = state.phone; 
        if (data) {
            await axios.post('http://127.0.0.1:3002/allpurchase', reqData).then(async (res) => {
                console.log(products, " ", res.data);
                makeElement(res.data);
            })
            setdata(false);
        }
    }

    const makeElement = (productArr) => {
        setproducts(productArr);
        if (productArr.length !== 0) {
            setrender(productArr.map((p) => (
                <div className="row justify-content-center mb-3">
                    <div className="col-md-12 col-xl-10">
                        <div className="card shadow-0 border rounded-3">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                                        <div className="bg-image hover-zoom ripple rounded ripple-surface">
                                            {p.productImg===null?<img src="https://catalog.wlimg.com/src-images/ei/no-image.jpg"
                                                className="w-100" alt="no image"/>:<img src={p.productImg}
                                                className="w-100" />}
                                            <a href="#!">
                                                <div className="hover-overlay">
                                                    <div className="mask" style={{backgroundColor:"rgba(253, 253, 253, 0.15)"}}></div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 col-xl-6">
                                        <h5>{p.name}</h5>
                                        <p className="text-truncate mb-4 mb-md-0">
                                            {p.description}
                                        </p><br/>
                                        <p className="text-truncate mb-4 mb-md-0">
                                            <strong>Quantity : </strong>{p.quantity}
                                        </p><br/>
                                        <table>
                                        <tr><span className="text-success"><strong>Expired Date :</strong></span>{(new Date(p.expire)).toLocaleDateString()}</tr>
                                        <tr><span><strong className="text-success">Purchase Date :</strong> {(new Date(p.purchaseDate)).toLocaleDateString()}</span></tr>
                                        <tr><span><strong className="text-success">shipping Address :</strong>{p.address},{p.city},{p.state}</span></tr>
                                            <tr><span><strong className="text-success">ZipCode : </strong>{p.pincode}</span></tr>
                                        </table>
                                    </div>
                                    <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                                        <div className="d-flex flex-row align-items-center mb-1">
                                            <table>
                                            <tr><th><h4 className="text-primary">{<CurrencyRupeeIcon/>} {p.price}/Kg</h4></th></tr>
                                            <tr>
                                                <th><span className="text-success"><strong>Amount : </strong>{<CurrencyRupeeIcon/>} {p.price*p.quantity}</span></th>
                                            </tr>
                                            <tr>
                                                <th><span className="text-success"><strong>CGST : </strong>{<CurrencyRupeeIcon/>} {p.price*p.quantity*0.05}</span></th>
                                            </tr>
                                            <tr>
                                                <th><span className="text-success"><strong>SGST : </strong>{<CurrencyRupeeIcon/>} {p.price*p.quantity*0.05}</span></th>
                                            </tr>
                                            <tr>
                                                <th><hr/><span className="text-success"><strong>Total : </strong>{<CurrencyRupeeIcon/>} {p.price*p.quantity*0.10 + p.price*p.quantity}</span></th>
                                            </tr>
                                            </table>
                                        </div>
                                        <br />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )))
        }
    }

    if (products.length !== 0) {
        return (
            <section style={{backgroundColor:"#eee"}}>
                <div className="container py-5">
                    <h1 style={{textAlign:'center',fontStyle:'bold'}}>Order Details</h1>
                    {renderProduct}
                </div>
            </section>
        )
    }
    else {
        return (
            <EmptyPurchase />
        )
    }
}