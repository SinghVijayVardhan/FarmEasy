import React, { useEffect, useState } from 'react'
import { Container, Typography, TextField, Button } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import FPage_2 from './fpage_2';
import FPage_1 from './fpage_1';
import FPage_3 from './fpage_3';
import FPage_4 from './fpage_4';
import FPage_5 from './fpage_5';
import { useParams } from 'react-router-dom';

export default function FarmerAgreement() {

  const { id } = useParams();

  const pages = [<FPage_1 id={id} />, <FPage_2 id={id} />, <FPage_3 id={id} />, <FPage_4 id={id} />, <FPage_5 id={id} />]
  const [num, setnum] = useState(0);

  return (
    <div style={{ marginLeft: '10%', marginRight: '10%', marginTop: '5%', marginBottom: '5%'}}>
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