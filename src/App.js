import { useEffect, useState } from "react";
import React from "react";
import { ThemeProvider } from '@mui/system';
import theme from "./styles/theme";
import Home from "./components/Home";
import Appbar from "./components/appbar";
import OfferUI from "./components/OfferUi";
import Buy from "./components/Buy";
import ContactUs from "./components/Contact";
import GraphDraw from "./components/DrawGraph";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./components/profile";
import LoginSignUp from "./components/loginsignup";
import BusinessDetail from "./data/Business";
import Offered from "./components/OfferUi/AvailableOffer";
import BuyProduct from "./components/Buy/BuyProduct";
import CompanyAgreement from './components/companyAgreement';
import FarmerAgreement from "./components/farmerAgreement";
import Purchase from "./components/purchase";
import Cart from "./components/cart";
import Address from "./components/address";
import AgreementCart from "./components/appliedAgreement";
import Responses from "./components/responses";
import ResponseAgreement from "./components/responseAgreement";
import axios from 'axios';
 import Admin from "./components/admin";
const crops = ['wheat','paddy','copra','ragi','moong']

function App() {
  const [session, setSession] = useState(true);
  const SessionUpdate = (data)=>{
    setSession(data);
  }

  var dataArray = {wheat:[],paddy:[],copra:[],ragi:[],moong:[]};

  useEffect(()=>{
      axios.post('http://127.0.0.1:3002/priceList', { name: 'wheat' }).then(async (res) => {
        var axis = [];
        res.data.map((p) => {
            axis.push({ label: p.xaxis, y: p.yaxis })
        })
        //console.log(name,i);
        dataArray['wheat']=axis;
    })
    axios.post('http://127.0.0.1:3002/priceList', { name: 'paddy' }).then(async (res) => {
        var axis = [];
        res.data.map((p) => {
            axis.push({ label: p.xaxis, y: p.yaxis })
        })
        //console.log(name,i);
        dataArray['paddy']=axis;
    })
    axios.post('http://127.0.0.1:3002/priceList', { name: 'ragi' }).then(async (res) => {
        var axis = [];
        res.data.map((p) => {
            axis.push({ label: p.xaxis, y: p.yaxis })
        })
        //console.log(name,i);
        dataArray['ragi']=axis;
    })
    axios.post('http://127.0.0.1:3002/priceList', { name: 'copra' }).then(async (res) => {
        var axis = [];
        res.data.map((p) => {
            axis.push({ label: p.xaxis, y: p.yaxis })
        })
        //console.log(name,i);
        dataArray['copra']=axis;
    })
    axios.post('http://127.0.0.1:3002/priceList', { name: 'moong' }).then(async (res) => {
        var axis = [];
        res.data.map((p) => {
            axis.push({ label: p.xaxis, y: p.yaxis })
        })
        //console.log(name,i);
        dataArray['moong']=axis;
    })
  },[dataArray])

  const checksession = ()=>{
    try{
      const data = JSON.parse(localStorage.getItem('user'));
      if(data.name !== null)
      setSession(false);
    }
    catch{}
  }

  if (session) {
    checksession();
    return (
        <Router>
          <Routes>
          <Route path="/" element={<LoginSignUp SessionUpdate={SessionUpdate}/>}></Route>
          <Route path="/admin" element={<Admin/>}></Route>
          </Routes>
        </Router>
    );
  }
  else {
    return (
        <ThemeProvider theme={theme}>
          <Router>
              <Appbar />
              <Routes>
                <Route index path="/" element={<Home />}></Route>
                <Route path="GraphDraw/:id" element={<GraphDraw cropData={dataArray}/>}></Route>
                <Route path="/Buy" element={<Buy />}></Route>
                <Route path="/FutureBuy" element={<OfferUI />}></Route>
                <Route path="/contact" element={<ContactUs />}></Route>
                <Route path="/Profile" element={<Profile />}></Route>
                <Route path="/business" element={<BusinessDetail />}></Route>
                <Route path="/Offered/:id" element={<Offered />}></Route>
                <Route path="/BuyProduct/:id" element={<BuyProduct />}></Route>
                <Route path="/companyAgreement" element={<CompanyAgreement />}></Route>
                <Route path="/farmAgreement/:id" element={<FarmerAgreement />}></Route>
                <Route path="/purchase" element={<Purchase />}></Route>
                <Route path="/cart" element={<Cart />}></Route>
                <Route path="/agreementCart" element={<AgreementCart />}></Route>
                <Route path="/responses/:id" element={<Responses />}></Route>
                <Route index path="/billing" element={<Address />}></Route>
                <Route index path="/responseAgreement/:id" element={<ResponseAgreement />}></Route>
              </Routes>
          </Router>
        </ThemeProvider>
    );
  }
}

export default App;
