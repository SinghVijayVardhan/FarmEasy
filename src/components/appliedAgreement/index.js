import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, ListItem, Typography } from '@mui/material';
//import FarmerAgreement from '../farmerAgreement';
import EmptyApply from '../Empty/emptyApply';


export default function AgreementCart() {
    var state = {}

    const [reqData, setreqData] = useState({ phone: null });
    const [offers, setoffers] = useState([]);
    const [fetch, setfetch] = useState(true);

    useEffect(() => {
        fetchElement();
    }, [fetch])

    const fetchElement = async () => {
        const d = localStorage.getItem('user'); //
        state = JSON.parse(d); //
        reqData.phone = state.phone;
        if (fetch) {
            await axios.post('http://127.0.0.1:3002/getApplied', reqData).then(async (res) => {
                setoffers(res.data);
                console.log(res.data, " ", offers);
                if (res.data.length !== 0)
                    renderTable(res.data);
            })
            setfetch(false);
        }
    }

    const [data, setdata] = useState([]);
    const [renderElement, setRenderElement] = useState([]);

    const text = {
        textAlign: 'center',
        fontSize: '20px'
    }

    const renderTable = (arr) => {
        setRenderElement(arr.map((p) => (
            <div className="row justify-content-center mb-3">
                <div className="col-md-12 col-xl-10" style={{ width: '100%' }}>
                    <div className="card shadow-0 border rounded-3">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6 col-lg-6 col-xl-6">
                                    <h2 style={{ textAlign: 'center', fontFamily: 'fantasy' }}>{p.cname}</h2>
                                    <h2>Title : {p.ctitle}</h2>
                                    <h5>Location : {p.caddress}</h5>
                                    <h5>Start Date : {(new Date(p.cdate)).toLocaleDateString()}</h5>
                                </div>
                                <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                                    <div className="d-flex flex-row align-items-center mb-1">
                                        <Typography variant="h6">Applied On : {(new Date(p.fdate)).toLocaleDateString()}</Typography>
                                    </div>
                                    <br />
                                    <div className="d-flex flex-row align-items-center mb-1">
                                    {p.fpublish === 1 ?
                                        <div className="d-flex flex-column">
                                            <ListItem Button component={Link} to={`/farmAgreement/${p.aggid}`} >
                                                <Button color="success" variant="contained">
                                                    Review Form
                                                </Button>
                                            </ListItem>
                                        </div> :
                                        <div className="d-flex flex-column">
                                            <ListItem Button component={Link} to={`/farmAgreement/${p.aggid}`} >
                                                <Button color="warning" variant="contained">
                                                    Incomplete Form
                                                </Button>
                                            </ListItem>
                                        </div>
                                    }
                                    </div>
                                    <div className="d-flex flex-row align-items-center" style={{marginTop:'25px'}}>
                                        {p.fpublish === 1 ? <Typography variant="h5"><strong style={{color:'blue'}}>Status : </strong>{p.status === null ?<span style={{color:'red'}}>Pending</span>: p.status === 1 ?<span style={{color:'green'}}>Accepted</span>:<span style={{color:'red'}}>Rejected</span>}</Typography> : <></>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )))
    }

    if (offers.length !== 0) {
        return (
            <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-10">
                            <div className="card">
                                <div className="card-body p-4">
                                    <div className="row">
                                        <div className="col-lg-7">
                                            <h5 className="mb-3"><a href="#!" className="text-body"><i
                                                className="fas fa-long-arrow-alt-left me-2"></i><Typography variant='h3'>Make Your Business Global </Typography></a></h5>
                                            <hr />
                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <div>
                                                    <p style={{ fontSize: '20px', color: 'black', fontFamily: 'inherit' }}>Applied For {offers.length} contract</p>                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-5" style={{ textAlign: 'center' }}>
                                            <img src="https://cdn3.vectorstock.com/i/1000x1000/35/07/contract-agreement-paper-blank-with-seal-and-hands-vector-24913507.jpg" style={{ height: '160px', width: '200px' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                {renderElement}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
    else {
        return (
            <EmptyApply />
        )
    }
}