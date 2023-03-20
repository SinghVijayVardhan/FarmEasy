import { Button, Container, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Close } from '@mui/icons-material';
import "../../styles/contact.css";
import "../../styles/profile.css";
import { Save } from '@mui/icons-material';
import { OverlayBox } from '../../styles/profile';
import axios from 'axios';


export default function AddProduct({ PageClose }) {
  var state = {};
  useEffect(() => {
    const d = localStorage.getItem('user');
    state = JSON.parse(d);
  }, [state])

  const [date,setDate] = useState(new Date());

  const error = useState({ name: "", expire: "", quantity: "", description: "",price:"" })
  const [formdata, setformdata] = useState({ phone: null, name: "", expire: "", quantity: "", productImg: null, category: 'cash', description: "",price:"" });

  const verified = () => {
    error.name = formdata.name === "" ? "Offer title is required" : "";
    error.description = formdata.description === "" ? "Offer description is required" : "";
    error.quantity = formdata.quantity === "" ? "Quantity is required field" : "";
    error.expire = formdata.expire === "" ? "Expire date is required field" : "";
    if(!error.expire){
      var dt = new Date(formdata.expire);
      var now = Date.now("yyyy-mm-dd");
      var diff = now - dt;
      if(diff<=0)
        error.expire = "Not a valid expiry date"
      else
        diff = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
      if(diff<5 && diff>0)
        error.expire = "Date must be 5 days ahead from now."
    }
    error.price = formdata.price===""?"Price is a required field ": "";
    console.log(error);
    if (formdata.description === "" || formdata.title === "" || formdata.quantity === "" || formdata.expire === "") return false;
    else
      return true;
  }

  const handleSubmit = (e) => {
    if (verified()) {
      e.preventDefault();
      formdata.phone = state.phone;
      console.log("offer :", state.phone);
      axios.post('http://127.0.0.1:3002/productAdd', formdata).then((res) => {
        //console.log(res);
        if (res.data.status){
          alert("Offer Added Successfully");
          window.location.reload(false);
        }
        else
          alert("Try Again");
        // TODO : HANDLE  0
      })
    }
  }

  const handlePicChange = (e)=>{
    const file = e.target.value;
    let document = "";
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        document = reader.result;
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
    formdata.productImg = document;
    }

  const handleChange = (e) => {
    setformdata((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
  }

  const picUpload = <OverlayBox> <div className="mb-3"><input className="form-control" type="file" accept="image/*" name="productImg" onChange={handlePicChange} /></div><a href="#" className='close' style={{ textDecoration: 'none' }}><Button color="success" variant="contained" ><Save /><span>SAVE</span></Button></a></OverlayBox>;

  return (
    <Container>
      <Button style={{ float: 'right', color: 'red' }} onClick={PageClose}><Close /></Button>
      <div className="container tm-mt-big tm-mb-big">
        <div className="row">
          <div className="col-xl-9 col-lg-10 col-md-12 col-sm-12 mx-auto">
            <div className="tm-bg-primary-dark tm-block tm-block-h-auto">
              <div className="row">
                <div className="col-12">
                  <Typography variant="h2" sx={{ textAlign: 'center', color: 'orange' }}>Add Product</Typography>
                </div>
              </div>
              <form className="tm-edit-product-form">
                <div className="row tm-edit-product-row">
                  <div className="col-xl-6 col-lg-6 col-md-12">
                    <div className="form-group mb-3">
                      <label
                        for="name"
                      >Product Name
                      </label>
                      <input
                        name="name"
                        type="text"
                        className="form-control validate"
                        onChange={handleChange}
                        required
                      />
                      {error.name && <Typography sx={{ color: 'red' }} variant="caption" >{error.name}</Typography>}
                    </div>
                    <div className="form-group mb-3">
                      <label
                        for="description"
                      >Description</label
                      >
                      <textarea
                        name="description"
                        className="form-control validate"
                        rows="3"
                        onChange={handleChange}
                        required
                      ></textarea>
                      {error.description && <Typography sx={{ color: 'red' }} variant="caption" >{error.description}</Typography>}
                    </div>
                    <div className="form-group mb-3">
                      <label
                        for="category"
                      >Category</label
                      >
                      <select
                        className="custom-select tm-select-accounts"
                        name="category"
                        onChange={handleChange}
                        required
                      >
                        <option value="cash" selected>Cash</option>
                        <option value="fruit">Fruit</option>
                        <option value="vegetable">Vegetable</option>
                        <option value="Grains">Grains</option>
                        <option value="Pulses">Pulses</option>
                        <option value="edibleOil">Edible Oil</option>
                        <option value="livestock">Livestock</option>
                        <option value="fish">Fisheries</option>
                      </select>
                    </div>
                    <div className="row">
                      <div className="form-group mb-3 col-xs-12 col-sm-6">
                        <label
                          for="expire_date"
                        >Expire Date
                        </label>
                        <input
                          min = {date}
                          onChange={handleChange}
                          type="date"
                          name="expire"
                          className="form-control validate"
                          data-large-mode="true"
                        />
                        {error.expire && <Typography sx={{ color: 'red' }} variant="caption" >{error.expire}</Typography>}
                      </div>
                      <div className="form-group mb-3 col-xs-12 col-sm-6">
                        <label
                          for="stock"
                        >Quantity
                        </label>
                        <input
                          name="quantity"
                          type="text"
                          onChange={handleChange}
                          className="form-control validate"
                          placeholder="Weight In Kilograms"
                          required
                        />
                        {error.quantity && <Typography sx={{ color: 'red' }} variant="caption" >{error.quantity}</Typography>}
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-12 mx-auto mb-4">
                    <div className="custom-file mt-3 mb-3">
                      <a href="#popup">
                        <Button color="primary" variant="contained" sx={{ width: '100%', marginTop: '35%' }}>
                          <span>Upload Product Image</span>
                        </Button>
                      </a>
                      <div id="popup" className="overlay"> {picUpload} </div>
                    </div>
                    <label
                          for="stock"
                        >Price
                        </label>
                        <input
                          name="price"
                          type="text"
                          onChange={handleChange}
                          className="form-control validate"
                          placeholder="Price per kilogram"
                          required
                        />
                        {error.price && <Typography sx={{ color: 'red' }} variant="caption" >{error.price}</Typography>}
                  </div>
                  <div className="col-12">
                    <Button variant="contained" color="success" style={{ width: '100%' }} onClick={handleSubmit}>ADD PRODUCT</Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Container >
  );
}