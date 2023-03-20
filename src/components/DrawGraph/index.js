import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/graphstyle.css"
import LineChart from "./linechart";
import { Container } from "@mui/material";


const images = {
    wheat: "https://cdn.pixabay.com/photo/2016/09/21/04/46/barley-field-1684052_960_720.jpg",
    paddy: "https://thumbs.dreamstime.com/b/paddy-field-11870763.jpg",
    copra: "https://cdn.xxl.thumbs.canstockphoto.com/coconut-tree-stock-images_csp8060765.jpg",
    ragi: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/201603/ragi-story_647_030916113225.jpg?VersionId=mndy1fmnaZXQrcQYe0mk0dxJKv9_Q.IJ",
    moong: "https://cdn.pixabay.com/photo/2014/07/11/17/05/mung-beans-390017_960_720.jpg"
}
const crops = ['paddy', 'wheat', 'copra', 'ragi', 'moong']
export default function DrawGraph({cropData}) {
    const { id } = useParams();
    const name = crops[id];
    const [info, setinfo] = useState([]);

    useEffect(() => {
        axios.post('http://127.0.0.1:3002/cropInfo', { name: name }).then((res) => {
            addInformation(res.data[0]);
        })
        // alert('im here')
    }, [name])

    const addInformation = (data) => {
        setinfo(data)
    }

    return (
        <Container>
        <div className="main">
            <div className="nav-wrapper">
                <h3 className="card-panel Blue amber lighten-2 center valign-wrapper center"><a className="brand-logo  #ffd54f-text text-lighten-4" href="#">{info.name?info.name.toUpperCase():info.name}
                </a></h3>
            </div>
            <div className="row" style={{ height: '300px',overflow:'hidden'}}>
                <div className="col-4">
                    <div className="card-image" style={{ overflow: 'hidden' }}>
                        <img src={images[info.name]} />
                    </div>
                </div>
                <div className="col-4" >
                    <div className="card-stacked">
                        <div className="card-content">
                            <table>
                                <tr rowspan={2}>
                                    <td>Prime Location</td>
                                    <td><b>{info.location}</b></td>
                                </tr>
                                <tr>
                                    <td><hr/></td>
                                    <td><hr/></td>
                                </tr>
                                <tr>
                                    <td>Crop Type</td>
                                    <td><b>{info.croptype}</b></td>
                                </tr>
                                <tr>
                                    <td><hr/></td>
                                    <td><hr/></td>
                                </tr>
                                <tr>
                                    <td>Export</td>
                                    <td><b>{info.export}</b></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="col-3" style={{ backgroundColor: 'cyan'}}>        
                    <div className="card-content black-text">
                    <span className="card-title" style={{color:'darkblue',fontSize:'30px'}}>Brief Forecast</span>
                    <table>
                        <tr>
                            <td><p>Min. crop price time</p></td>
                            <tr>
                            <td><h5>{info.mindate}</h5></td>
                            <td>
                                <h4>₹{info.minPrice}</h4>
                            </td>
                            </tr>
                        </tr>
                                <tr>
                                    <td><hr/></td>
                                    <td><hr/></td>
                                </tr>
                        <tr>
                            <td><p>Max. crop price time</p></td>
                            <tr>
                            <td><h5>{info.maxdate}</h5></td>
                            <td>
                                <h4>₹{info.maxPrice}</h4>
                            </td>
                            </tr>
                        </tr>
                    </table>
                </div>
                </div>
            </div>
        </div >
        <LineChart name={name} cropData={cropData} />
        </Container>
    )
}