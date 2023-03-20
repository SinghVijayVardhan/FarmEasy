import React, { useEffect, useState, Suspense } from "react";
import axios from "axios";
import CanvasJSReact from './canvasjs-3.7.4/canvasjs.react';
import { CircularProgress } from "@mui/material";

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function LineChart({ name,cropData }) {

    var xaxis = [];

    var options = {
        animationEnabled : true,
        theme:'light8',
        title: {
            text: `${name.toUpperCase()}  PRICE PREDICTION`
        },
        data: [{
            type: "line",
            dataPoints: cropData[name],
            indexLabelFontSize: 16,
        }]
    }
    useEffect(()=>{
        async function fetchValues(){
            await axios.post('http://127.0.0.1:3002/priceList', { name: name }).then(async (res) => {
            var axis = [];
            res.data.map((p) => {
                axis.push({ label: p.xaxis, y: p.yaxis })
            })
            options.data[0].dataPoints = axis
        })
        }
     fetchValues();
     console.log(cropData);
    },[options])

        return (
            <div style={{ marginTop: '50px',marginBottom:'50px'}}>
                <CanvasJSChart options={options} />
            </div>
        );
 }

export default LineChart;