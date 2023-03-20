import React, { useState, useEffect } from 'react'
import { Container, Button, TextField, appBarClasses } from '@mui/material';
import { Add,DoneAll } from '@mui/icons-material';
import axios from 'axios';

const st = {
  margin: '10px',
  padding: '40px'
}


export default function FPage_5({id}) {
  const [inputarr, setinputarr] = useState([]);
  const [def, setdef] = useState(true);
  const [activeId, setId] = useState({ id: id, phone:null })
  const [arrval, setarrval] = useState(null);
  var [info,setInfo] = useState([]);
  var [farminfo,setFarminfo] = useState([]);
  var farmer = true;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    farmer = (user.farmer);
    activeId.phone = user.phone;
    deffunc();
    Information();
  }, [activeId])

  const Information = ()=>{
    const state = {id:activeId.id};
    axios.post('http://127.0.0.1:3002/getInfo',state).then((res)=>{
      setInfo(res.data[0]);
    })
    axios.post('http://127.0.0.1:3002/getFarmInfo',activeId).then((res)=>{
      if(res.data.length!==0){
        setFarminfo(res.data[0]);
      }
    })
  }

  /* this will be used if page refreshes or 
      if user leaves form half filled after login this will fetch data from database and renders it 
      and prevents user to fill data again ..... */
  const deffunc = () => {
    if (def) {
      axios.post('http://127.0.0.1:3002/getMisc', activeId).then((res) => {
        if (res.data.length !== 0) {
          setdef(false);
          res.data.map((p) => { inputarr.push(p.miscillaneous) });
        }
        else {
          setdef(true);
        }
      })
    }
  }

  const showResponse = ()=>{
    axios.post('http://127.0.0.1:3002/publicForm',activeId).then((res)=>{
      if(res.data.error===false){
        if(inputarr.length===0){
          inputarr.push("No terms and condition");
          pushdef();
        }
      }
      alert(res.data.text);
    })
  }

  function adddefinition() {
    if (arrval !== null && arrval !== '')
      setinputarr([...inputarr, arrval])
  }

  const pushdef = () => {
    if (inputarr.length === 0)
      alert("No data available for saving")
    else {
      inputarr.map((p) => {
        const uploadData = { id: activeId.id, phone:activeId.phone , def: p }
        axios.post('http://127.0.0.1:3002/addMisc', uploadData).then((res) => {
          alert('Definition Added');
        })
      })
      window.location.reload(false);
    }
  }

  function adddefinition() {
    setinputarr([...inputarr, arrval])
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

        {def ? <><TextField type="text" name='box1' onChange={(e) => { setarrval(e.target.value) }} sx={{ height: '10px', width: '100%' }} disabled={!farmer} placeholder="Farmer can add their terms and condition here" /><br /><br />
          <div style={{ margin: '25px' }} disabled={!farmer}>
            <Button onClick={adddefinition} variant="contained" sx={{ float: 'left' }}>
              Add <Add />
            </Button><Button onClick={pushdef} variant="contained" sx={{ float: 'right' }}>Save <DoneAll /></Button>
          </div>
        </> : <></>}
      </div>
      <div>
        <strong>The Company:-</strong><br /><br />
        <strong>Company Name:-</strong>{info.cname }<br /><br />
        <strong>Address :-</strong>{info.cadd}
        <br /><br />
        <strong>The Farmer</strong><br /><br />
        <strong>Farmer Name:-</strong>{farminfo.fname }<br /><br />
        <strong>Address :-</strong>{farminfo.faddress}
      </div>
      {farminfo.publish!==0?<div className='row' style={{textAlign:'center',margin:'5px'}}>
        <div className='col-12'><Button variant='contained' color="success" style={{width:'50%'}} disabled>Already applied</Button></div>
      </div>:<div className='row' style={{textAlign:'center',margin:'5px'}}>
        <div className='col-12'><Button variant='contained' color="success" onClick={showResponse} style={{width:'50%'}} disabled={farminfo.length===0}>Submit The Response</Button></div>
      </div>}
    </Container>)
}