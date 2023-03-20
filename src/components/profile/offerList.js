import React, { useState } from "react";
import {DoneAll } from "@mui/icons-material";
import { Button, Typography, Container,ListItem } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect } from 'react';
import axios from 'axios';
import EmptyOffer from "../Empty/emptyoffer";

export default function OfferList() {
    var state = {}

    const [data, setdata] = useState(true);

    const [productArr, setproductArr] = useState([]);

    useEffect(() => {
        fetchOffer();
    }, [productArr])

    const fetchOffer = async () => {
        const d = localStorage.getItem('user');
        state = JSON.parse(d);
        if (data) {
            await axios.post('http://127.0.0.1:3002/getAgreementByNumber',state).then(async (res) => {
                //console.log(res.data.Offers)
                setproductArr(res.data);
                makeElement(res.data);
            })
            setdata(false);
        }
    }

    //p.upvote!==undefined?p.upvote.length():

    const makeElement = (d) => {
        if (d.length !== 0) {
            setproducts(d.map((p) => (<tr>
                <td>&nbsp;</td>
                <td class="tm-product-name">{p.title}</td>
                <td>{p.model}</td>
                <td>{(new Date(p.date)).toLocaleDateString()}</td>
                <td>{p.responses}</td>
                <td>
                    {(p.description===0 && p.definition===0 && p.duration===0 && p.quality===0 && p.price===0)?
                    <ListItem component={Link} to="/"><Button variant="outlined" color="warning">Complete Form</Button></ListItem>:
                    p.status===1? <ListItem component={Link} to={`/responseAgreement/${p.farmid}`}>
                    <Button variant="outlined" color="success"><DoneAll /></Button>
                </ListItem>:<ListItem component={Link} to={`/responses/${p.aggid}`}><Button variant="contained" color="primary">Responses</Button></ListItem>
                }
                </td>
            </tr>)))
        }
    }

    const [products, setproducts] = useState();

    if (productArr.length !== 0) {
        return (
            <Container>
                <Typography variant="h4" sx={{ textAlign: 'center', color: 'blue' }}>Contracts</Typography>
                <div className="TableContainer">
                    <table className="table table-striped" style={{ fontSize: '20px' }}>
                        <thead>
                            <tr style={{ backgroundColor: 'darkgray' }}>
                                <th scope="col">&nbsp;</th>
                                <th scope="col">Contract Title</th>
                                <th scope="col">MODEL</th>
                                <th scope="col">Opening Date</th>
                                <th scope="col">RESPONSES</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products}
                        </tbody>
                    </table>
                    <ListItem component={Link} to="/companyAgreement">
                        <Button sx={{ width: '100%', marginTop: '100%' }} variant="contained" color="primary">
                            Add new contract
                        </Button>
                    </ListItem>
                </div>
            </Container>
        )
    }
    else {
        return (
            <EmptyOffer />
        )
    }
}