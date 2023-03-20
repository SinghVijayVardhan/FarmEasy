import React, { useState, useEffect } from 'react'
import { Container, Button, TextField } from '@mui/material';
import { Add,DoneAll } from '@mui/icons-material';
import axios from 'axios';

const st = {
  margin: '10px',
  padding:'40px'
}
export default function Page_3() {

  const [def, setdef] = useState(true);
  const [dur, setdur] = useState(true);
  const [activeId, setId] = useState({ id: null })
  const [inputarr, setinputarr] = useState([]);
  const [inputarr1, setinputarr1] = useState([]);
  const [arr1val, setarr1val] = useState(null);
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
        durfunc();
      })
    }
  }, [activeId])

  /* this will be used if page refreshes or 
    if user leaves form half filled after login this will fetch data from database and renders it 
    and prevents user to fill data again ..... */
  const deffunc = () => {
    if (activeId.id !== null && def) {
      const state = { id: activeId.id }
      axios.post('http://127.0.0.1:3002/getDescription', state).then((res) => {
        if (res.data.length !== 0) {
          setdef(false);
          res.data.map((p) => { inputarr.push(p.description) });
        }
        else {
          setdef(true);
        }
      })
    }
  }

  /* this will be used if page refreshes or 
    if user leaves form half filled after login this will fetch data from database and renders it 
    and prevents user to fill data again ..... */
  const durfunc = () => {
    if (activeId.id !== null && dur) {
      const state = { id: activeId.id }
      axios.post('http://127.0.0.1:3002/getQuality', state).then((res) => {
        if (res.data.length !== 0) {
          setdur(false);
          res.data.map((p) => { inputarr1.push(p.quality) });
        }
        else {
          setdur(true);
        }
      })
    }
  }

  // add arrval value in inputarr 
  function adddefinition() {
    if (arrval !== null && arrval !== '')
      setinputarr([...inputarr, arrval])
  }

  // add arr1val value in the inputarr1
  function adddefinition1() {
    if (arr1val !== null && arr1val !== '')
      setinputarr1([...inputarr1, arr1val])
  }

  // push inputarr into database definition table
  const pushdef = () => {
    if (activeId.id === null)
      alert("page 1 is compulsory");
    else if (inputarr.length === 0)
      alert("No data available for saving")
    else {
      inputarr.map((p) => {
        const uploadData = { id: activeId.id, def: p }
        axios.post('http://127.0.0.1:3002/addDescription', uploadData).then((res) => {
          alert('Definition Added');
        })
      })
      window.location.reload(false);
    }
  }

  //push inputarr1 into database duration table
  const pushdef1 = () => {
    if (activeId.id === null)
      alert("page 1 is compulsory");
    else if (inputarr1.length === 0)
      alert("No data available for saving")
    else {
      inputarr1.map((p) => {
        const uploadData = { id: activeId.id, def: p }
        axios.post('http://127.0.0.1:3002/addQuality', uploadData).then((res) => {
          alert('Duration Added');
        })
      })
      window.location.reload(false);
    }
  }

  function adddefinition() {
    setinputarr([...inputarr, arrval])
  }

  function adddefinition1() {
    setinputarr1([...inputarr1, arr1val])
  }

  return (
    <Container>
      <div style={st}>
        <strong><span style={{ color: 'red' }}>3. Description of fram Produce</span></strong>
        <ol>
          {
            inputarr.map((info, index) => (<li key={index}>{info}</li>))
          }
        </ol>


        {def ? <><TextField type="text" name='box1' onChange={(e) => { setarrval(e.target.value) }} sx={{ height: '10px', width: '100%' }} /><br /><br />
          <div style={{ margin: '25px' }}>
            <Button onClick={adddefinition} variant="contained" sx={{ float: 'left' }}>
              Add <Add />
            </Button><Button onClick={pushdef} variant="contained" sx={{ float: 'right' }}>Save <DoneAll /></Button>
          </div>
        </> : <></>}
      </div>

      <div style={st}>
        <strong><span style={{ color: 'red' }}>4. Quality Specification</span></strong>

        {<ol>{inputarr1.map((info, index) => {
          return (<li key={index}>{info}</li>)
        })}</ol>}

        {dur ? <><TextField type="text" onChange={(e) => { setarr1val(e.target.value) }} name='box2' sx={{ height: '10px', width: '100%' }} /><br /> <br />
          <div style={{ margin: '25px' }}>
            <Button onClick={adddefinition1} variant="contained" sx={{ float: 'left' }}>
              Add <Add />
            </Button><Button onClick={pushdef1} variant="contained" sx={{ float: 'right' }}>Save <DoneAll /></Button>
          </div></> : <></>}
      </div>
    </Container>
  )

}