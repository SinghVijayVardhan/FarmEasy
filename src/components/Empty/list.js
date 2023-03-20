import "../../styles/Empty/list.css";
import React from 'react';
import AddProduct from "../profile/addProduct";
import { Container } from "@mui/system";
import {useState} from 'react';

export default function NoList({ msg }) {
    const [st, setst] = useState(true);

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
    return (
        <Container>
            <div style={st ? ProductStyle : ProductStyleO}>
                <AddProduct PageClose={CrossPage} />
            </div>
            <div className="container-fluid  mt-100">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h5>Products</h5>
                            </div>
                            <div className="card-body cart">
                                <div className="col-sm-12 empty-cart-cls text-center">
                                    <img src="images/emptybox.png" width="130" height="130" className="img-fluid mb-4 mr-3" />
                                    <h3><strong>{msg}</strong></h3>
                                    <h4>Add something to make me happy :)</h4>
                                    <button className="btn btn-primary cart-btn-transform m-3" data-abc="true" onClick={SwitchOnAddProduct}>Add New Product</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}