import React, { useState, useEffect } from 'react'
import { Container, Button, TextField } from '@mui/material';
import { Add,DoneAll } from '@mui/icons-material';
import FarmerRight from './farmerRight';
import axios from 'axios';

const st = {
  margin: '10px',
  padding:'40px'
}
export default function Page_4() {

  const [inputarr, setinputarr] = useState([]);
  const [def, setdef] = useState(true);
  const [activeId, setId] = useState({ id: null })
  const [arrval, setarrval] = useState(null);
  var title = null;

  useEffect(() => {
    try {
      title = JSON.parse(localStorage.getItem('agreement')).title;
    } catch { }
    if (title !== null) {
      const phone = JSON.parse(localStorage.getItem('user')).phone
      axios.post('http://127.0.0.1:3002/agreement', { title: title, phone: phone }).then((res) => {
        activeId.id = res.data[0].aggid;
        deffunc();
      })
    }
  }, [activeId])

  /* this will be used if page refreshes or 
      if user leaves form half filled after login this will fetch data from database and renders it 
      and prevents user to fill data again ..... */
  const deffunc = () => {
    if (activeId.id !== null && def) {
      const state = { id: activeId.id }
      axios.post('http://127.0.0.1:3002/getPrice', state).then((res) => {
        if (res.data.length !== 0) {
          setdef(false);
          res.data.map((p) => { inputarr.push(p.price)});
        }
        else {
          setdef(true);
        }
      })
    }
  }

  function adddefinition() {
    if (arrval !== null && arrval !== '')
      setinputarr([...inputarr, arrval])
  }

  const pushdef = () => {
    if (activeId.id === null)
      alert("page 1 is compulsory");
    else if (inputarr.length === 0)
      alert("No data available for saving")
    else {
      inputarr.map((p) => {
        const uploadData = { id: activeId.id, def: p }
        axios.post('http://127.0.0.1:3002/addPrice', uploadData).then((res) => {
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
        <strong><span style={{ color: 'red' }}>5. Price Determination:</span></strong>
        <ol>
          {
            inputarr.map((info, index) => (<li key={index}>{info}</li>))
          }
        </ol>
        {def ? <><TextField type="text" name='box1' onChange={(e) => { setarrval(e.target.value) }} sx={{ height: '10px', width: '100%' }} /><br /><br />
          <div style={{ margin: '25px' }}>
            <Button onClick={adddefinition} variant="contained" sx={{ float: 'left' }}>
              Add <Add />
            </Button><Button onClick={pushdef} variant="contained" sx={{ float: 'right' }}>Publish <DoneAll /></Button>
          </div>
        </> : <></>}
      </div>
      <div style={st}>
        <strong><span style={{ color: 'red' }}>6. Protection of Farmer's Rights.</span></strong>
        <FarmerRight />
      </div>
    </Container>
  )

}