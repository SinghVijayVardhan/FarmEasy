import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./response.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCalendar,faClock } from '@fortawesome/fontawesome-free-solid'
import { Typography,ListItem,Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Responses(){
    const {id} = useParams();
    const [productArr,setproductArr] = useState([]);
    const [data,setdata] = useState(true);
    const [render,setRender] = useState([]);
    const dt = new Date();

    useEffect(()=>{
        if(data){
            axios.post('http://127.0.0.1:3002/getFarmerByAgreementId',{id:id}).then((res)=>{
                setproductArr(res.data);
                makeElement(res.data);
            })
        }
    },[productArr])

    const makeElement = (responses)=>{
        if(responses.length!==0){
            setRender(responses.map((p)=>(
                <li className="d-flex justify-content-between">
                <div className="d-flex flex-row align-items-center"><i className="fa fa-check-circle checkicon"></i>
                    <div className="ml-2">
                        <h6 className="mb-0">{p.fname}</h6>
                        <div className="d-flex flex-row mt-10 text-black-50 date-time">
                            <div><FontAwesomeIcon icon={faCalendar} /> <span className="ml-2">{new Date(p.date).toLocaleDateString()}</span></div>
                            <div><pre>      </pre></div>
                            <div className="ml-3"><FontAwesomeIcon icon={faClock}/> <span className="ml-2">{Math.floor((dt-(new Date(p.date)))/(24*60*60*1000))} days ago</span></div>
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-row align-items-center">
                    <ListItem component={Link} to={`/responseAgreement/${p.farmId}`}>
                        <Button variant="outlined" color="success">Respond</Button>
                    </ListItem>
                </div>
            </li>
            )))
        }
    }

    return(
        <div style={{width:'80%'}} className="container">
        <div className="row">
            <div className="col-md-12">
                <div style={{textAlign:'center'}}>
                    <Typography variant="h3" color="primary" sx={{fontFamily:'cursive'}}>Responses</Typography>
                </div>
            <div className='mt-3'>
                <ul className='list list-inline'>
                    {render}
                </ul>
            </div> 
            </div>
        </div>
        </div>
    )
}