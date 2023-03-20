import React,{useEffect, useState} from 'react';
import axios from 'axios';
import EmptyCart from '../Empty/emptyCart';
import { Close} from '@mui/icons-material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import {Button,ListItem, Typography} from '@mui/material';
import { Link } from 'react-router-dom';
import Address from '../address';

export default function Cart() {
    const showError = {
        position: 'fixed',
        display: 'block',
        width: '100%',
        height: '100%',
        textAlign:'center',
        backgroundColor: 'black',
        opacity: '0.8',
        zIndex: '2',
        cursor: 'pointer',
        color: 'white',
    }

    var state = {};
    var [Purchasedata,setPurchaseData] = useState([]);
    const [show,setShow] = useState(false);
    const [message,setMessage] = useState("");
    const [reqData,setreqData] = useState({phone:null});
    const [data, setdata] = useState(true);
    const [render,setrender] = useState([]);
    var [products, setproducts] = useState([]);
    var selectedQuantity = 0;

    const itemPurchased = (p)=>{
        setPurchaseData(p);
        setPage(true);
    }

    const closePage = ()=>{setPage(false);}

    const [page,setPage] = useState(false);

    const handleChange = (e)=>{
        selectedQuantity=Number(e.target.value);
    }

    useEffect(()=>{
        fetchProducts()
        },[products])

    const fetchProducts = async () => {
        const d = localStorage.getItem('user');
        state = JSON.parse(d);
        reqData.phone = state.phone;
        if (data) {
            await axios.post('http://127.0.0.1:3002/allCartItems', reqData).then(async (res) => {
                console.log(res.data);
                makeElement(res.data);
            })
            setdata(false);
        }
    }

    const removeFromCart = async(p)=>{
        const temp = {cartid : p.cartid}
        await axios.post('http://127.0.0.1:3002/removeCartItems',temp).then(async (res) => {
            //console.log(products, " ", res.data);
           window.location.reload(false);
        })
    }

    const makeElement = (productArr)=>{
        setproducts(productArr);
        console.log(products);
        if(productArr.length!==0){
            setrender(productArr.map((p)=>(
                <div className="row justify-content-center mb-3">
                    <div className="col-md-12 col-xl-10" style={{width:'100%'}}>
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
                                        {p.quantity===0?<span className="text-success"><strong>Available :</strong><h4 className='text-warning'>Not Available</h4></span>:<span className="text-success"><strong>Available :</strong> {p.quantity} Kg</span>}
                                        <br/><span className="text-success"><strong>Expire :</strong> {(new Date(p.expire)).toLocaleDateString()}</span>
                                    </div>
                                    <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                                        <div className="d-flex flex-row align-items-center mb-1">
                                            <h4 className="text-primary">{<CurrencyRupeeIcon/>} {p.price}/Kg</h4>
                                        </div>
                                        <br />
                                        <div className="d-flex flex-column mt-4">
                                            <button className="btn btn-primary btn-sm" type="button" onClick={()=>itemPurchased(p)}>Buy Now</button><br/>
                                            <Button color="secondary" variant="outlined" onClick={()=>removeFromCart(p)}>
                                                Remove From wishlist
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )))
        }
    }

    const showbox = (<div style={showError}><Button onClick={()=>{setShow(false)}}><Close/></Button><br/><h3>{message}</h3></div>)

    if(page){
        return(
        <div>
            <Address p={Purchasedata} closePage={closePage}/>
        </div>
        )
    }
    else if(products.length!==0){
        return (
            <section className="h-100 h-custom" style={{backgroundColor:"#eee"}}>
                {show?showbox:<></>}
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-10">
                            <div className="card">
                                <div className="card-body p-4">
                                    <div className="row">
                                        <div className="col-lg-7">
                                            <h5 className="mb-3"><a href="#!" className="text-body"><i
                                                className="fas fa-long-arrow-alt-left me-2"></i><ListItem Button component={Link} to='/buy'><Typography variant='h3'>Continue Shopping</Typography></ListItem></a></h5>
                                            <hr />
                                                <div className="d-flex justify-content-between align-items-center mb-4">
                                                    <div>
                                                        <p style={{fontSize:'20px',color:'black',fontFamily:'inherit'}}>Shopping cart</p>
                                                        <p style={{fontSize:'20px',color:'black',fontFamily:'cursive'}}>You have {products.length} items in your cart</p>
                                                    </div>
                                            </div>
                                        </div>
                                        <div className="col-5" style={{textAlign:'center'}}>
                                            <img src="https://img.freepik.com/premium-vector/shopping-cart-with-products-illustration-buying-food-supermarket-grocery-store-trolley-fresh-fruits-vegetables-purchase-dairy-products-cereals-healthy-diet-nutrition_276875-342.jpg?w=2000" style={{height:'160px',width:'200px'}}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                               {render}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            )
    }
    else{
        return(
            <EmptyCart />
        )
    }
   
}