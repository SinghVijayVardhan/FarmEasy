import React, { useState, useEffect } from 'react'
import { Container, Button, TextField } from '@mui/material';
import { Add,DoneAll } from '@mui/icons-material';
import FarmerRight from './farmerRight';
import axios from 'axios';

const st = {
  margin: '10px',
  padding:'40px'
}
export default function FPage_4({id}) {

  const [inputarr, setinputarr] = useState([]);
  const [activeId, setId] = useState({ id: id })

  useEffect(() => {
        deffunc();
  }, [activeId])

  /* this will be used if page refreshes or 
      if user leaves form half filled after login this will fetch data from database and renders it 
      and prevents user to fill data again ..... */
  const deffunc = () => {
    if (activeId.id !== null) {
      const state = { id: activeId.id }
      axios.post('http://127.0.0.1:3002/getPrice', state).then((res) => {
        if (res.data.length !== 0) {
          setinputarr(res.data);
        }
      })
    }
  }



  return (
    <Container>
      <div style={st}>
        <strong><span style={{ color: 'red' }}>5. Price Determination:</span></strong>
        <ol>
          {
            inputarr.map((info, index) => (<li key={index}>{info.price}</li>))
          }
        </ol>
      </div>
      <div style={st}>
        <strong><span style={{ color: 'red' }}>6. Protection of Farmer's Rights.</span></strong>
        <FarmerRight />
      </div>
    </Container>
  )

}