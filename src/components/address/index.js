import React, { useState } from 'react';
import { Close } from '@mui/icons-material';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';


export default function Address({ p, closePage }) {
  const showError = {
    position: 'fixed',
    display: 'block',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    backgroundColor: 'black',
    opacity: '0.8',
    zIndex: '2',
    cursor: 'pointer',
    color: 'white',
  }
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [add, setAdd] = useState({ address: null, city: null, pincode: null, state: null, quantity: 0 })

  const handleChange = (e) => {
    setAdd((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
  }

  const itemPurchased = () => {
    const state = JSON.parse(localStorage.getItem('user'));
    if (add.quantity <= p.quantity && add.quantity > 0) {
      const purchasedata = { phone: state.phone, quantity: add.quantity, productId: p.productid, address: add.address, city: add.city, state: add.state, pincode: add.pincode }
      console.log(purchasedata);
      axios.post("http://127.0.0.1:3002/addPurchase", purchasedata).then(async (result) => {
        if (result.status) {
          const deductData = { quantity: p.quantity - add.quantity, productid: p.productid }
          console.log("deductData : ", deductData);
          axios.post("http://127.0.0.1:3002/updateProduct", deductData).then(async (res) => {
            setMessage("Order Successful");
            setShow(true);
          })
        }
      })
    }
    else {
      setMessage("Quantity exceeds the available quantity Enter quantity less than or equal to " + p.quantity);
      setShow(true);
    }
  }

  const showbox = (<div style={showError}><Button onClick={() => { setShow(false) }}><Close /></Button><br /><h3>{message}</h3></div>)

  return (
    <div>
      <div className="row mt-3 mx-3" style={{ marginTop: "25px" }}>
        {show ? showbox : <></>}
        <div className="col-md-3">
          <div style={{ marginTop: '50px', marginLeft: '10px' }} className="text-center">
            <i id="animationDemo" data-mdb-animation="slide-right" data-mdb-toggle="animation"
              data-mdb-animation-reset="true" data-mdb-animation-start="onScroll"
              data-mdb-animation-on-scroll="repeat" className="fas fa-3x fa-shipping-fast text-white"></i>
            <h3 style={{ color: 'GrayText' }}>Welcome</h3>
            <p className="white-text">You are few seconds away from compleating your order!</p>
          </div>
          <div className="text-center">
            <Button color="secondary" size="large" variant="contained" onClick={closePage}>Cancel Order</Button>
          </div>
          <div className="container" style={{ border: '5px solid blue', marginTop: '15px',padding:'5px' }}>
          <h3 style={{textAlign:'center',color:'limegreen'}}>Invoice</h3>
          <div style={{border:'2px solid black',margin:'2px'}} className="container">
            <div className="row">
              <div className="col-6"><h3  className='text text-primary'>Address : </h3></div>
              <div className='col-6'><h3>{add.address}</h3></div>
            </div>
            <div className="row">
              <div className="col-6"><h3  className='text text-primary'>City : </h3></div>
              <div className='col-6'><h3>{add.city}</h3></div>
            </div>
            <div className="row">
              <div className="col-6"><h3  className='text text-primary'>Zip : </h3></div>
              <div className='col-6'><h3>{add.pincode}</h3></div>
            </div>
            </div>
            <div style={{border:'2px solid black',margin:'2px'}} className="container">
            <div className="row">
              <div className="col-6"><h3  className='text text-primary'>Price : </h3></div>
              <div className='col-6'><h3><CurrencyRupeeIcon />{(add.quantity * p.price).toFixed(2)}</h3></div>
            </div>
            <div className="row">
              <div className="col-6"><h3  className='text text-primary'>CGST : </h3></div>
              <div className='col-6'><h3><CurrencyRupeeIcon />{(add.quantity * p.price * 0.05).toFixed(2)}</h3></div>
            </div>
            <div className="row">
              <div className="col-6"><h3  className='text text-primary'>SGST : </h3></div>
              <div className='col-6'><h3><CurrencyRupeeIcon />{(add.quantity * p.price * 0.05).toFixed(2)}</h3></div>
            </div>
            </div>
            <div className="row">
            <hr style={{ height: '5px'}} />
              <div className="col-6"><h3 className='text text-primary'>Total : </h3></div>
              <div className='col-6'><h3><CurrencyRupeeIcon />{(add.quantity * p.price * 1.1).toFixed(2)}</h3></div>
            </div>
          </div>
        </div>
        <div className="col-md-9 justify-content-center">
        <div className="card card-custom pb-4">
        <div className="card-body mt-0 mx-5">
        <div className="text-center mb-3 pb-2 mt-3">
          <div className="row justify-content-center mb-3">
            <div className="col-md-12 col-xl-10">
              <div className="card shadow-0 border rounded-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                      <div className="bg-image hover-zoom ripple rounded ripple-surface">
                        {p.productImg === null ? <img src="https://catalog.wlimg.com/src-images/ei/no-image.jpg"
                          className="w-100" alt="no image" /> : <img src={p.productImg}
                            className="w-100" />}
                        <a href="#!">
                          <div className="hover-overlay">
                            <div className="mask" style={{ backgroundColor: "rgba(253, 253, 253, 0.15)" }}></div>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-6 col-xl-6">
                      <h5>{p.name}</h5>
                      <p className="text-truncate mb-4 mb-md-0">
                        {p.description}
                      </p><br />
                      <p className="text-truncate mb-4 mb-md-0">
                        <strong>Available Quantity : </strong>{p.quantity} Kg
                      </p><br />
                      <table>
                        <tr><span className="text-success"><strong>Expired Date : </strong></span>{(new Date(p.expire)).toLocaleDateString()}</tr>
                        <tr><span><strong className="text-success">Purchase Date : </strong> {(new Date(p.purchaseDate)).toLocaleDateString()}</span></tr>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
                <h4 style={{ color: "#495057" }}>Delivery Details</h4>
              </div>

              <form className="mb-0">

                <div className="row mb-4">
                  <div className="col-6" style={{ textAlign: 'center' }}>
                    <div className="form-outline">
                      <TextField type="number" min="1" max={p.quantity} name="quantity" placeholder="quantity" onChange={handleChange} variant="outlined" className="form-control input-custom" required />
                    </div>
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col">
                    <div className="form-outline">
                      <TextField type="text" id="form9Example3" className="form-control input-custom" name="city" placeholder="city" onChange={handleChange} variant="outlined" required />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-outline">
                      <TextField type="text" id="form9Example4" className="form-control input-custom" name="pincode" placeholder="Zip" onChange={handleChange} required />
                    </div>
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col">
                    <div className="form-outline">
                      <TextField type="text" id="form9Example6" className="form-control input-custom" name="address" placeholder="address" onChange={handleChange} required />                    </div>
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col">
                    <div className="form-outline">
                      <TextField type="text" id="form9Example6" className="form-control input-custom" name="state" onChange={handleChange} required placeholder="State" />
                    </div>
                  </div>
                </div>

                <div className="float-end ">
                  <button type="submit" className="btn btn-primary btn-rounded"
                    style={{ backgroundColor: '#0062CC' }} onClick={itemPurchased} >Place order</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}