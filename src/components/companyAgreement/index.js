import React, { useEffect, useState } from 'react'
import { Container, Typography, TextField, Button } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import "../../styles/terms.css";
import Page_2 from './page_2';
import Page_1 from './page_1';
import Page_3 from './page_3';
import Page_4 from './page_4';
import Page_5 from './page_5';
import axios from 'axios';

export default function CompanyAgreement() {

  const [id, setId] = useState(null);
  var state = [];

  useEffect(() => {
    try {
      state = JSON.parse(localStorage.getItem('agreement'));
      const sendData = { title: state.title, phone: null };
      state = JSON.parse(localStorage.getItem('user'));
      sendData.phone = state.phone;
      axios.post('http://127.0.0.1:3002/agreement', sendData).then((res) => {
        if (res.data) {
          res.data.map((p) => {
            console.log(p);
            setId(p.aggid)
          })
        }
      })
    } catch { }
  }, [id])

  const pages = [<Page_1 />, <Page_2 />, <Page_3 />, <Page_4 />, <Page_5 />]
  const [num, setnum] = useState(0);

  return (
    <div style={{ marginLeft: '10%', marginRight: '10%', marginTop: '5%', marginBottom: '5%' }}>
      <div style={{ border: '5px solid black', padding: '5px', margin: '15px' }}>
        <Container sx={{ marginBottom: '20px', border: '2px solid black' }}>
          {pages[num]}
        </Container>
        <div className='row'>
          <div className='col-1'><Button onClick={() => { setnum(num === 0 ? pages.length - 1 : num - 1) }} color="primary"><ArrowBackIosIcon /></Button></div>
          <div className='col-10' style={{ textAlign: 'center' }}>
            <div> Page <strong>{num + 1}</strong> of <strong>{pages.length}</strong> </div>
          </div>
          <div className='col-1'><Button onClick={() => { setnum((num + 1) % pages.length) }} color="secondary"><ArrowForwardIosIcon /></Button></div></div>
      </div>
    </div>
  )
}