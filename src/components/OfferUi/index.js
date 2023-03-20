import React from 'react';
import GraphComponent from './box';
import { Grid,Container } from '@mui/material';
import { useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import {Button} from '@mui/material';

const offers = [
    { id: "0", image: "images/banner/informalui.jfif", name: "Informal Model" },
    { id: "2", image: "images/banner/multipartiteui.gif", name: "Multipartite Model" },
    { id: "3", image: "images/banner/centralizedui.gif", name: "Centralized Model" },
    { id: "1", image: "images/banner/intermediaryui.jpg", name: "Intermediary Model" },
    { id: "4", image: "images/banner/nucleusui.jpg", name: "Nucleus Estate Model" },
]

export default function OfferUI(){

    const ImgStyle = {
        height:'90%',
    }

    const theme = useTheme();
    const renderProducts = offers.map(offer => (
            <div className="col-md-6 col-sm-6" style={{textAlign:'center'}}>
            <div className="card mb-30" style={ImgStyle}>
                <a class="card-img-tiles" href="#" data-abc="true">
                <div className="inner">
                  <div className="main-img" style={{position:'relative',overflow:'hidden'}}><img src={offer.image} alt="Category" style={{height:'300px'}} /></div>
                  {/* <div className="thumblist"><img src="" alt="Category" /><img src="" alt="Category" /></div> */}
                </div></a>
              <div className="card-body text-center">
                <h4 className="card-title">{offer.name}</h4>
                {/* <p className="text-muted">{offer.name}</p> */}
                <Link to={`/Offered/${offer.id}`}><Button variant='contained'>View Offers</Button></Link>
              </div>
            </div>
          </div>
    ))

    return (
        <Container>
            <h1 style={{textAlign:'center'}}><Link to="/business">Business Models</Link></h1>
            <div className="row">
                {renderProducts}
            </div>
        </Container>
    )
}