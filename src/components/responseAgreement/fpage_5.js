import React, { useState, useEffect } from 'react'
import { Container, Button, TextField, appBarClasses, Typography } from '@mui/material';
import { Add, DoneAll } from '@mui/icons-material';
import axios from 'axios';

const st = {
  margin: '10px',
  padding: '40px'
}


export default function FPage_5({ id, farmid }) {
  const [inputarr, setinputarr] = useState([]);
  const [activeId, setId] = useState({ id: id })
  const [update,setUpdate] = useState(true);
  var [info, setInfo] = useState([]);
  var [farminfo, setFarminfo] = useState([]);
  var farmer = true;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    farmer = (user.farmer);
    if(update){
      deffunc();
      Information();
      setUpdate(false);
    }
  }, [activeId])

  const Information = () => {
    const state = { id: activeId.id };
    axios.post('http://127.0.0.1:3002/agreementId', state).then((res) => {
      console.log(res)
      setInfo(res.data[0]);
    })
    axios.post('http://127.0.0.1:3002/getFarmerById', { id: farmid }).then((res) => {
      if (res.data.length !== 0) {
        setFarminfo(res.data[0]);
      }
    })
  }

  const reportResponse = () => {
    axios.post('http://127.0.0.1:3002/updateFarmerStatus', {id:farmid,aggid:id,d:1}).then((res) => {})
    axios.post('http://127.0.0.1:3002/updateCompanyStatus',{id:farmid,aggid:id,d:1}).then((res)=>{})
    alert("Agreement accepted ");
    window.location.reload(false);
  }

  const rejectResponse = ()=>{
    axios.post('http://127.0.0.1:3002/updateFarmerStatus', {id:farmid,aggid:id,d:0}).then((res) => {
      alert("Agreement Rejected ");
      window.location.reload(false);
    })
  }

  /* this will be used if page refreshes or 
      if user leaves form half filled after login this will fetch data from database and renders it 
      and prevents user to fill data again ..... */
  const deffunc = () => {
    axios.post('http://127.0.0.1:3002/getMisc', activeId).then((res) => {
      if (res.data.length !== 0) {
        res.data.map((p) => { inputarr.push(p.miscillaneous) });
      }
    })
  }

  return (
    <Container>
      <div style={st}>
        <strong><span style={{ color: 'red' }}>7. Miscillaneous :</span></strong>
        <ol>
          {
            inputarr.map((info, index) => {
              return (<li key={index}>{info}</li>)
            })
          }
        </ol>
      </div>
      <div>
        <strong>The Company:-</strong><br /><br />
        <strong>Company Name:-</strong>{info.name}<br /><br />
        <strong>Address :-</strong>{info.add}
        <br /><br />
        <strong>The Farmer</strong><br /><br />
        <strong>Farmer Name:-</strong>{farminfo.fname}<br /><br />
        <strong>Address :-</strong>{farminfo.faddress}
      </div>
      <div style={{marginBottom:'20px',marginTop:'20px'}}>
      {farminfo.status===0?<Typography variant="h5" sx={{color:'green',textAlign:'center'}}>This offer is Rejected</Typography>:
        farminfo.status===1?<Typography variant="h5" sx={{color:'green',textAlign:'center'}}>This offer is Accepted</Typography>:
        info.status===0?
        <div className="d-flex justify-content-between">
        <div className="p-2"><Button variant="outlined" color="success" onClick={reportResponse}>Accept</Button></div>
        <div className="p-2"><Button variant="outlined" color="warning" onClick={rejectResponse}>Reject</Button></div>
      </div>:<></>}
      </div>
    </Container>)
}