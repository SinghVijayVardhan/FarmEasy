import React, { useState, useEffect } from 'react'
import { Container, Button, TextField } from '@mui/material';
import { Add,DoneAll } from '@mui/icons-material';
import axios from 'axios';

const st = {
  margin: '10px',
  padding:'40px'
}

export default function FPage_3({id}) {

  const [activeId, setId] = useState({ id: id })
  var [inputarr, setinputarr] = useState([]);
  var [inputarr1, setinputarr1] = useState([]);

  useEffect(() => {
        deffunc();
        durfunc();
  }, [activeId])

  /* this will be used if page refreshes or 
    if user leaves form half filled after login this will fetch data from database and renders it 
    and prevents user to fill data again ..... */
  const deffunc = () => {
    if (inputarr.length === 0) {
      const state = { id: activeId.id }
      axios.post('http://127.0.0.1:3002/getDescription', state).then((res) => {
        if (res.data.length !== 0) {
          setinputarr(res.data);
        }
      })
    }
  }

  /* this will be used if page refreshes or 
    if user leaves form half filled after login this will fetch data from database and renders it 
    and prevents user to fill data again ..... */
  const durfunc = () => {
    if (inputarr1.length === 0) {
      const state = { id: activeId.id }
      axios.post('http://127.0.0.1:3002/getQuality', state).then((res) => {
        if (res.data.length !== 0) {
          setinputarr1(res.data);
        }
      })
    }
  }

  // add arrval value in inputarr 
  

  return (
    <Container>
      <div style={st}>
        <strong><span style={{ color: 'red' }}>3. Description of fram Produce</span></strong>
        <ol>
          {
            inputarr.map((info, index) => (<li key={index}>{info.description}</li>))
          }
        </ol>
      </div>

      <div style={st}>
        <strong><span style={{ color: 'red' }}>4. Quality Specification</span></strong>

        {<ol>{inputarr1.map((info, index) => {
          return (<li key={index}>{info.quality}</li>)
        })}</ol>}
      </div>
    </Container>
  )

}