import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Container, TextField, Typography, Button } from '@mui/material'
import axios from 'axios';

export default function FPage_1({ id }) {

  const [form, setform] = useState({ id: id, phone: null });
  var farmer = true;
  const [active, setActive] = useState(true);
  const [company, setCompany] = useState([]);

  let [Farm, setFarm] = useState({
    id: id,
    fparent: '',
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

  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setFarm((prevalue) => {
      return {
        ...prevalue,
        [name]: value
      }
    })
  }

  useEffect(() => {
    const state = JSON.parse(localStorage.getItem('user'));
    form.id = id;
    form.phone = state.phone;
    Farm.phone = state.phone;
    farmer = state.farmer;
    axios.post('http://127.0.0.1:3002/getFarmer', form).then((res) => {
      if (res.data.length !== 0) {
        setFarm(res.data[0]);
        setActive(true);
      } else { setActive(false); }
    })
  }, []);



  const submitForm = (e) => {
    e.preventDefault();
    console.log(Farm);
    if (Farm.faddress !== null && farmer.fname !== null && Farm.fdistrict !== null && Farm.fstate !== null && Farm.fparent !== null && Farm.fvillage !== null && Farm.survey !== null && Farm.area !== null && Farm.ftaluka) {
      axios.post("http://127.0.0.1:3002/addFarmer", Farm).then((res) => {
        if (!res.status)
          alert('Only one response allowed per user');
        else {
          window.location.reload(false);
        }
      })
    }
  }

  const onhandleChange = (e) => { setCompany((prevState) => ({ ...prevState, [e.target.name]: e.target.value })) }

  return (
    <Container sx={{ margin: '5px' }}>
      <form>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ textAlign: 'center' }}>Farming Agreement  <TextField id="standard-basic" variant="standard" name='title' value={company.title} required placeholder='TITLE OF AGREEMENT' disabled={farmer} /></h3><br /><br />
        </div>
        <Typography>
          This Farming Agreement (the “Agreement”) is entered by and between <TextField id="standard-basic" variant="standard" name="name" value={company.name} required disabled={farmer} />
          having its office at <TextField id="standard-basic" variant="standard" disabled={farmer} name="address" value={company.address} required />(Hereinafter referred to as <spam style={{ color: 'red' }}>“Company”) </spam><br /><br />
          <div style={{ textAlign: 'center', }}> <strong>AND</strong></div>
          <div>
            Farmer’s Name: <TextField id="standard-basic" variant="standard" onChange={handleChange} name='fname' value={Farm.fname} disabled={!farmer} /><br /><br />
            Address: <TextField id="standard-basic" variant="standard" onChange={handleChange} name='faddress' value={Farm.faddress} disabled={!farmer} />
          </div><br /><br />

          (Hereinafter referred to as <strong style={{ color: 'green' }}>“The Farmer”</strong>)<br /><br />
          (Each Farmer and Company hereinafter individually referred to as a <strong>“Party”</strong>, and collectively as the
          <strong>“Parties”</strong>)<br /><br /><br />

          <div style={{ textAlign: 'center', }}> <strong>Preamble </strong></div>

          <div style={{ lineHeight: 3 }}>
            <strong>Whereas,</strong>  the Company is focused on working with farmers to introduce advance technology and
            production techniques to produce world class fruits in / from India.<br />

            <strong>Whereas</strong>  the farmer Shri / Smt/Ms. : <span style={{ color: 'blue' }}>{Farm.fname}</span> son/daughter/wife of: <TextField id="standard-basic" variant="standard" onChange={handleChange} name='fparent' value={Farm.fparent} disabled={!farmer} />
            resident of Village: <TextField id="standard-basic" variant="standard" onChange={handleChange} name='fvillage' value={Farm.fvillage} disabled={!farmer} /> Taluka: <TextField id="standard-basic" variant="standard" onChange={handleChange} name='ftaluka' value={Farm.ftaluka} disabled={!farmer} />
            District: <TextField id="standard-basic" variant="standard" onChange={handleChange} name='fdistrict' value={Farm.fdistrict} disabled={!farmer} /> State: <TextField id="standard-basic" variant="standard" onChange={handleChange} name='fstate' value={Farm.fstate} disabled={!farmer} />(India) is holding agricultural land bearing Revenue Survey
            No(s). <TextField id="standard-basic" variant="standard" onChange={handleChange} name='survey' value={Farm.survey} disabled={!farmer} />, having land area and measuring: <TextField id="standard-basic" variant="standard" onChange={handleChange} name='area' value={Farm.area} disabled={!farmer} />
            Acres, is keen to cultivate Banana in the above land and wish the Company to guide
            him/her in producing quality and support in marketing his/her produce.
          </div>
          <Button onClick={submitForm} variant="contained" type='submit' sx={{ float: 'right' }} disabled={active}>SAVE</Button>
          <br /><br />
        </Typography>
      </form>
    </Container>
  )
}