import React, { useState, useEffect } from 'react'
import { Container, Button, TextField } from '@mui/material';
import { Add,DoneAll } from '@mui/icons-material';
import axios from 'axios';

const st = {
  margin: '10px',
  padding: '40px'
}


export default function Page_5() {
  const [inputarr, setinputarr] = useState([]);
  const [def, setdef] = useState(true);
  const [activeId, setId] = useState({ id: null })
  const [arrval, setarrval] = useState(null);
  var [info,setInfo] = useState({cname:null,cadd:null,fname:null,fadd:null});
  var title = null;
  var farmer = true;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    farmer = (user.farmer);
    try {
      title = JSON.parse(localStorage.getItem('agreement')).title;
    } catch { }
    if (title !== null) {
      axios.post('http://127.0.0.1:3002/agreement', { title: title, phone: user.phone }).then((res) => {
        activeId.id = res.data[0].aggid;
        info.cadd = res.data[0].address;
        info.cname = res.data[0].name;
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
      axios.post('http://127.0.0.1:3002/getMisc', state).then((res) => {
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

        {farmer ? <div><TextField type="text" name='box1' onChange={(e) => { setarrval(e.target.value) }} sx={{ height: '10px', width: '100%' }} disabled={farmer} placeholder="Farmer can add their terms and condition here" /><br /><br />
          <div style={{ margin: '25px' }} disabled={farmer}>
            <Button onClick={adddefinition} variant="contained" sx={{ float: 'left' }}>
              Add <Add />
            </Button><Button onClick={pushdef} variant="contained" sx={{ float: 'right' }}>Save <DoneAll /></Button>
          </div>
        </div> : <></>}
      </div>
      <div>
        <strong>The Company:-</strong><br /><br />
        <strong>Company Name:-</strong>{info.cname }<br /><br />
        <strong>Address :-</strong>{info.cadd}
        <br /><br />
        <strong>The Farmer</strong><br /><br />
        <strong>Farmer Name:-</strong>{info.fname }<br /><br />
        <strong>Address :-</strong>{info.fadd}
      </div>
    </Container>)
}