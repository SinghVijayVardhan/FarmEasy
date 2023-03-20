import React, { useState, useEffect } from 'react';
import { Container, TextField, Typography, Button } from '@mui/material'
import axios from 'axios';

export default function Page_1() {

  let [company, setCompany] = useState({ model: null, name: null, address: null, phone: null, title: null })
  const [form, setform] = useState({ title: null, phone: null });
  const [active, setActive] = useState(true);
  var farmer = true;

  let [Farm, setFarm] = useState({
    farmername: '',
    farmeradd: '',
    farmerParent: '',
    farmvillage: '',
    farmtaluka: '',
    farmdistrict: '',
    
    farmstate: '',
    survey: '',
    phone: null
  });

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
    company.phone = state.phone;
    farmer = state.farmer;
    form.phone = state.phone;
    try {
      form.title = JSON.parse(localStorage.getItem('agreement')).title;
      setActive(true);
    } catch { setActive(false); }
    if (active) {
      setvalues();
    }
  }, [company]);

  const setvalues = () => {
    axios.post('http://127.0.0.1:3002/agreement', form).then((res) => {
      console.log(res.data);
      res.data.map((p)=>{
        company.title=p.title;
        company.name = p.name;
        company.address = p.address;
        company.model = p.model;
      })
      console.log(company);
    })
  }

  const submitForm = (e) => {
    e.preventDefault();
    console.log(company);
    if (company.model !== null && company.name !== null && company.address !== null && company.title !== null)  {
      axios.post("http://127.0.0.1:3002/addAgreement", company).then((res) => {
        if (!res.status)
          alert('Titles of Agreement must be different');
        else {
          const data = {title:company.title}
          localStorage.setItem('agreement', JSON.stringify(data))
          setActive(true);
        }
      })
    }
    else if(company.model===null)
      alert("Select Model for agreement");
    else if(company.name===null)
      alert("Enter company's name");
    else if(company.address===null)
      alert("Company's address is required field")
    else
      alert("Company's title is required");
  }

  const onhandleChange = (e) => { setCompany((prevState) => ({ ...prevState, [e.target.name]: e.target.value })) }

  return (
    <Container sx={{ margin: '5px' }}>
      <form>
        <div style={{ textAlign: 'center' }}>
          <select name="model" placeholder='Business Model' style={{ width: '250px', height: '25px' }} onChange={onhandleChange} required disabled={!farmer} value={company.model}>
            <option value="Informal Model">Informal Model</option>
            <option value="Intermediary Model">Intermediary Model</option>
            <option value="Multipartite Model">Multipartite Model</option>
            <option value="Centralized Model">Centralized Model</option>
            <option value="Nucleus Estate Model">Nucleus Estate Model</option>
          </select>
          <h3 style={{ textAlign: 'center' }}>Farming Agreement  <TextField id="standard-basic" variant="standard" onChange={onhandleChange} name='title' value={company.title} required placeholder='TITLE OF AGREEMENT' disabled={!farmer}/></h3><br /><br />
        </div>
        <Typography>
          This Farming Agreement (the “Agreement”) is entered by and between <TextField id="standard-basic" variant="standard" onChange={onhandleChange} name='name' value={company.name} required disabled={!farmer} />
          having its office at <TextField id="standard-basic" variant="standard" onChange={onhandleChange} disabled={!farmer} name='address' value={company.address} required />(Hereinafter referred to as <spam style={{ color: 'red' }}>“Company”) </spam><br /><br />
          <div style={{ textAlign: 'center', }}> <strong>AND</strong></div>
          <div>
            Farmer’s Name: <TextField id="standard-basic" variant="standard" onChange={handleChange} name='farmername' value={Farm.farmername} disabled={!farmer} /><br /><br />
            Address: <TextField id="standard-basic" variant="standard" onChange={handleChange} name='farmeradd' value={Farm.farmeradd} disabled={!farmer} />
          </div><br /><br />

          (Hereinafter referred to as <strong style={{ color: 'green' }}>“The Farmer”</strong>)<br /><br />
          (Each Farmer and Company hereinafter individually referred to as a <strong>“Party”</strong>, and collectively as the
          <strong>“Parties”</strong>)<br /><br /><br />

          <div style={{ textAlign: 'center', }}> <strong>Preamble </strong></div>

          <div style={{ lineHeight: 3 }}>
            <strong>Whereas,</strong>  the Company is focused on working with farmers to introduce advance technology and
            production techniques to produce world class fruits in / from India.<br />

            <strong>Whereas</strong>  the farmer Shri / Smt/Ms. :<h5 style={{ textDecoration: 'underline', color: 'blue' }}>{Farm.farmername}</h5> son/daughter/wife of: <TextField id="standard-basic" variant="standard" onChange={handleChange} name='farmerson' value={Farm.farmerson} disabled={!farmer} />
            resident of Village: <TextField id="standard-basic" variant="standard" onChange={handleChange} name='farmervillage' value={Farm.farmervillage} disabled={!farmer} /> Taluka: <TextField id="standard-basic" variant="standard" onChange={handleChange} name='farmertaluka' value={Farm.farmertaluka} disabled={!farmer} />
            District: <TextField id="standard-basic" variant="standard" onChange={handleChange} name='farmerdistrict' value={Farm.farmerdistrict} disabled={!farmer} /> State: <TextField id="standard-basic" variant="standard" onChange={handleChange} name='farmerstate' value={Farm.farmerstate} disabled={!farmer} />(India) is holding agricultural land bearing Revenue Survey
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