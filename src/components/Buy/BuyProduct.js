import React, { useState, useEffect } from 'react';
import { useFetcher, useParams } from 'react-router-dom';
import axios from 'axios';
import EmptyProduct from '../Empty/emptyproduct';
import { Button } from '@mui/material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { Close } from '@mui/icons-material';
import Address from '../address';


const category = ["cash", "fruit", "vegetable", "Grains", "Pulses", "edibleOil", "livestock", "fish"]

export default function BuyProduct() {

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

    var [Purchasedata,setPurchaseData] = useState([]);
    const [page,setPage] = useState(false);
    const [show,setShow] = useState(false);
    const [message,setMessage] = useState("");
    const { id } = useParams();
    var state = {};
    var [products, setproducts] = useState([]);
    const [reqData, setreqData] = useState({ category: null });
    const [data, setdata] = useState(true)
    const [renderProduct, setrender] = useState([]);
    const [wish,setWish] = useState({phone:null,productId:null})

    useEffect(() => {
        fetchProducts();
    }, [renderProduct]);

    const addToWishlist = (p)=>{
        wish.phone = state.phone;
        wish.productId = p.productid;
        axios.post('http://127.0.0.1:3002/addToCart',wish).then((res)=>{
            if(res.data.status===true){
                setMessage("Item added to cart");
                setShow(true);
            }
            else{
                setMessage("Item already in cart");
                setShow(true);
            }
        })
    }

    const closePage = ()=>{setPage(false);}

    const fetchProducts = async () => {
        const d = localStorage.getItem('user');
        state = JSON.parse(d);
        reqData.category = category[id]
        if (data) {
            await axios.post('http://127.0.0.1:3002/allproducts', reqData).then(async (res) => {
                console.log(products, " ", res.data);
                makeElement(res.data);
            })
            setdata(false);
        }
    }

    const itemPurchased = (p)=>{
        setPurchaseData(p);
        setPage(true);
    }

    const showbox = (<div style={showError}><Button onClick={()=>{setShow(false)}}><Close/></Button><br/><h3>{message}</h3></div>)

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
                                        <span className="text-success"><strong>Available :</strong> {p.quantity} Kg</span><br/>
                                        <span className="text-success"><strong>Expire :</strong> {(new Date(p.expire)).toLocaleDateString()}</span>
                                    </div>
                                    <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                                        <div className="d-flex flex-row align-items-center mb-1">
                                            <h4 className="text-primary">{<CurrencyRupeeIcon/>} {p.price}/Kg</h4>
                                        </div>
                                        <br />
                                        <div className="d-flex flex-column mt-4">
                                            <button className="btn btn-primary btn-sm" type="button" onClick={()=>itemPurchased(p)}>Buy Now</button><br/>
                                            <Button color="secondary" variant="outlined" onClick={()=>addToWishlist(p)}>
                                                Add to wishlist
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
        console.log(renderProduct.length);
    }

    if(page){
        return(
        <div>
            <Address p={Purchasedata} closePage={closePage}/>
        </div>
        )
    }
    else if(products.length !== 0){
        return (
            <section style={{backgroundColor:"#eee"}}>
                {show?showbox:<></>}
                <div className="container py-5">
                    {renderProduct}
                </div>
            </section>
        )
    }
    else {
        return (
            <EmptyProduct />
        )
    }
}