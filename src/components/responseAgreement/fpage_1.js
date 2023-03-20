import React, { useState, useEffect,useLayoutEffect } from 'react';
import { Container, TextField, Typography, Button } from '@mui/material'
import axios from 'axios';
import { blue } from '@mui/material/colors';

export default function FPage_1({ id,farmid }) {

  var farmer = true;
  const [active, setActive] = useState(true);
  const [company, setCompany] = useState([]);

  const textstyle = {color:'blue',textTransform:'uppercase'}
  const underline = {color:'blue',textTransform:'uppercase',textDecoration:'unerline'}

  let [Farm, setFarm] = useState({
    id:id,
    fparent:'',
    fname: '',
    faddress: '',
    fparent: '',
    fvillage: '',
    ftaluka: '',
    fdistrict: '',
    fstate: '',
    survey: '',
    area: '',
    phone: null,
  });

  useEffect(() => {
      axios.post('http://127.0.0.1:3002/agreementId', { id: id }).then((res) => {
        console.log(res.data);
          setCompany(res.data[0]);
        console.log(company.title);
      })
  }, [id])

  useEffect(() => {
    const state = JSON.parse(localStorage.getItem('user'));
    Farm.phone = state.phone;
    farmer = state.farmer;
    axios.post('http://127.0.0.1:3002/getFarmerById',{id:farmid}).then((res) => {
      if (res.data.length !== 0) {
        setFarm(res.data[0]);
        setActive(true);
      }else {setActive(false);}
    })
  }, []);


  return (
    <Container sx={{ margin: '5px' }}>
      <form>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ textAlign: 'center' }}>Farming Agreement  <span style={textstyle}>{company.title}</span></h3><br /><br />
        </div>
        <Typography>
          This Farming Agreement (the “Agreement”) is entered by and between <span style={underline}>{company.name}</span>
          having its office at <span style={underline}>{company.address}</span> (Hereinafter referred to as <spam style={{ color: 'red' }}>“Company”) </spam><br /><br />
          <div style={{ textAlign: 'center', }}> <strong>AND</strong></div>
          <div>
            Farmer’s Name: <span style={underline}>{Farm.fname}</span><br /><br />
            Address: <span style={underline}>{Farm.faddress}</span>
          </div><br /><br />

          (Hereinafter referred to as <strong style={{ color: 'green' }}>“The Farmer”</strong>)<br /><br />
          (Each Farmer and Company hereinafter individually referred to as a <strong>“Party”</strong>, and collectively as the
          <strong>“Parties”</strong>)<br /><br /><br />

          <div style={{ textAlign: 'center', }}> <strong>Preamble </strong></div>

          <div style={{ lineHeight: 3 }}>
            <strong>Whereas,</strong>  the Company is focused on working with farmers to introduce advance technology and
            production techniques to produce world class fruits in / from India.<br />

            <strong>Whereas</strong>  the farmer Shri / Smt/Ms. : <span style={textstyle}>{Farm.fname}</span> son/daughter/wife of: <span style={textstyle}>{Farm.fparent}</span>
            resident of Village: <span style={textstyle}>{Farm.fvillage}</span> Taluka: <span style={textstyle}>{Farm.ftaluka}</span>
            District: <span style={textstyle}>{Farm.fdistrict}</span> State:  <span style={textstyle}>{Farm.fstate}</span> (India) is holding agricultural land bearing Revenue Survey
            No(s).  <span style={textstyle}>{Farm.survey}</span> , having land area and measuring: <span style={textstyle}>{Farm.area}</span>
            Acres, is keen to cultivate Banana in the above land and wish the Company to guide
            him/her in producing quality and support in marketing his/her produce.
          </div>
          <br /><br />
        </Typography>
      </form>
    </Container>
  )
}