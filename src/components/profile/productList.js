import React, { useEffect, useState } from "react";
import { Delete } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import AddProduct from "./addProduct";
import { Container } from "@mui/system";
import axios from "axios";
import NoList from "../Empty/list";

export default function ProductsList() {
    const [st, setst] = useState(true);
    const [delData, setDel] = useState({ productid: null ,quantity : 0});
    const [productArr, setproductArr] = useState([]);
    //var productArr = [];
    var state = {};
    const [data, setdata] = useState(true);
    const [products, setproducts] = useState([]);

    const ProductStyle = {
        display: 'none',
    }


    const ProductStyleO = {
        position: 'fixed',
        display: 'block',
        width: '100%',
        height: '100%',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        backgroundColor: 'black',
        opacity: '0.8',
        zIndex: '2',
        cursor: 'pointer',
        color: 'white'
    }

    const CrossPage = () => {
        setst(true);
    }

    const SwitchOnAddProduct = () => {
        setst(false);
    }

     useEffect(() => {
       fetchElement();
     }, [productArr])


    const fetchElement = async() => {
        const d = localStorage.getItem('user'); //
        state = JSON.parse(d); //
        if (data) {
            await axios.post('http://127.0.0.1:3002/ProductList', state).then(async (res) => {
                setproductArr(res.data);
                makeElement(res.data);
                console.log(res);
            })
            setdata(false);
        }
    }

    const delItem = async (id) => {
        delData.productid = id;
        await axios.post('http://127.0.0.1:3002/updateProduct', delData).then((res) => {
            if (res.data.status) {
                alert("Something went wrong try again!!");
                setproductArr(null);
                setdata(true);
            }
            else
                alert("Product removed successfully");
            window.location.reload(false);
        })
    }

    const makeElement = (productAr) => {
        console.log(productArr, " ", productArr.length);
        if (productAr.length !== 0) {
            setproducts((productAr.map((p) => (<tr>
                <td>&nbsp;</td>
                <td class="tm-product-name">{p.name}</td>
                <td>{p.quantity}</td>
                <td>{p.price}</td>
                {((new Date()).toISOString()<=(new Date(p.expire)).toISOString())?<td>{(new Date(p.expire)).toLocaleDateString()}</td>:<td><p className="text text-warning">{"Expired"}</p></td>}
                <td>
                    <Button onClick={() => delItem(p.productid)}><Delete sx={{ color: 'grey' }} /></Button>
                </td>
            </tr>))))
        }
    }

    if (productArr.length !== 0) {
        return (
            <Container>
                <div style={st ? ProductStyle : ProductStyleO}>
                    <AddProduct PageClose={CrossPage} />
                </div>
                <Typography variant="h4" sx={{ textAlign: 'center', color: 'blue' }}>Added Products</Typography>
                <div className="TableContainer">
                    <table className="table table-striped" style={{fontSize:"20px"}}>
                        <thead style={{backgroundColor:'darkgray'}}>
                            <tr>
                                <th scope="col">&nbsp;</th>
                                <th scope="col">PRODUCT NAME</th>
                                <th scope="col">QUANTITY</th>
                                <th scope="col">PRICE</th>
                                <th scope="col">EXPIRE DATE</th>
                                <th scope="col">&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products}
                        </tbody>
                    </table>
                    <Button sx={{ width: '100%',position:'relative' ,marginTop:'100%'}} variant="contained" color="primary" onClick={SwitchOnAddProduct}>
                        Add new product
                    </Button>
                </div>
            </Container>
        )
    }
    else {
        { console.log("While rendering : ", productArr.length) }
        return (
            <NoList msg={"No Product Added"} />
        )
    }
}

