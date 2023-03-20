import React, { useState, useEffect } from 'react'
import { Container, Button, TextField, inputAdornmentClasses } from '@mui/material';
import axios from 'axios';

const st = {
  margin: '10px',
  padding: '40px'
}


export default function FPage_2({id}) {

  const [activeId,setId] = useState({id:id})
  var [inputarr, setinputarr] = useState([]);
  var [inputarr1, setinputarr1] = useState([]);

  useEffect(()=>{
      deffunc();
      durfunc();
  },[activeId])

  /* this will be used if page refreshes or 
    if user leaves form half filled after login this will fetch data from database and renders it 
    and prevents user to fill data again ..... */
  const deffunc = () => {
    if(inputarr.length===0){
      axios.post('http://127.0.0.1:3002/getDefinition', activeId).then((res) => {
        if (res.data.length!==0) {
          setinputarr(res.data)
        }
      })
    }
  }

  /* this will be used if page refreshes or 
    if user leaves form half filled after login this will fetch data from database and renders it 
    and prevents user to fill data again ..... */
  const durfunc = () => {
    if(inputarr1.length===0){
      axios.post('http://127.0.0.1:3002/getDuration', activeId).then((res) => {
        if (res.data.length!==0) {
         setinputarr1(res.data)
        }
      })
    }
  }

  return (
    <Container>
      <strong>Now, therefore, the Parties hereto agree as follows:</strong><br />
      <div style={st}>
        <strong><span style={{ color: 'red' }}>1. Definition</span></strong>
        <ol>
          {
            inputarr.map((info) => {
              return (<li>{info.definition}</li>)
            })
          }
        </ol>

      </div>

      <div style={st}>
        <strong><span style={{ color: 'red' }}>2. Duration of Agreement</span></strong>
          <ol>
          {
            inputarr1.map((info) => {
              return (<li>{info.duration}</li>)
            })
          }
        </ol>
      </div>
    </Container>
  )
}
