import { Container, Button, ListItem } from '@mui/material'
import { Save, Clear } from '@mui/icons-material';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ContactSupport } from '@mui/icons-material';
import { OverlayBox } from '../../styles/profile';
import axios from 'axios';
import "../../styles/profile.css";

export default function Edit({ setpage }) {

    const changePage = () => {
        setpage(true);
    }

    const [reqbody, setreqboady] = useState([]);
    const [profile, updateprofile] = useState([]);
    const [data, setdata] = useState(true);
    var state = {};

    const handleChange = (e) => {
        setreqboady((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    }

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem('user');
        localStorage.clear();
        window.location.reload(false);
    }

    useEffect(() => {
        const d = localStorage.getItem('user');
        state = JSON.parse(d);
        setProfile();
    }, [])

    const setProfile = async () => {
        if (data) {
            await axios.post('http://127.0.0.1:1000/enter', state).then(async (res) => {
                console.log(res)
                updateprofile(res.data)
            });
            setdata(false);
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        Object.keys(reqbody).forEach(key => {
            if (reqbody[key]==="") delete reqbody[key];
          });
        reqbody.phone = profile.phone;
        console.log(reqbody)
        await axios.post('http://127.0.0.1:1000/updateProfile',reqbody).then(async(res)=>{
            console.log(res)
            if(res.data.status)
                alert("Updated Successfully");
            window.location.reload(false);
        });
    }

    const picUpload = <OverlayBox> <div className="mb-3"><input className="form-control" type="file" id="formFile" name="profilePic" onChange={handleChange} /></div><a href="#" className='close' style={{ textDecoration: 'none' }}><Button color="success" variant="contained"><Save /><span>SAVE</span></Button></a></OverlayBox>;

    return (
        <Container sx={{ marginTop: '20px', background: '#f8f8f8' }}>
            <div className="row flex-lg-nowrap">
                <div className="col-12 col-lg-auto mb-3" style={{ width: '200px' }}>
                    <div className="card p-3">
                        <div className="e-navlist e-navlist--active-bg">
                            <ul className="nav">
                                <li className="nav-item"><Button color="warning" variant="contained" onClick={changePage}><Clear /><span>Discard</span></Button></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="row">
                        <div className="col mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="e-profile">
                                        <div className="row">
                                            <div className="col-12 col-sm-auto mb-3">
                                                <div className="mx-auto" style={{ width: '140px' }}>
                                                    <div className="d-flex justify-content-center align-items-center rounded" style={{ height: '140px', backgroundColor: 'rgb(233, 236, 239)' }}>
                                                        <span style={{ color: 'rgb(166, 168, 170)', font: 'bold 8pt Arial' }}>140x140</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                                                <div className="text-center text-sm-left mb-2 mb-sm-0">
                                                    <h4 className="pt-sm-2 pb-1 mb-0 text-nowrap">{profile.fullname}</h4>
                                                    <p className="mb-0">{profile.phone}</p>
                                                    <div className="mt-2">
                                                        <a href="#popup">
                                                            <Button color="primary" variant="contained" size="large">
                                                                <i className="fa fa-fw fa-camera"></i>
                                                                <span>Change Photo</span>
                                                            </Button>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div id="popup" className="overlay"> {picUpload} </div>
                                            </div>
                                        </div>
                                        <ul className="nav nav-tabs">
                                            <li className="nav-item"><a href="" className="active nav-link">Profile</a></li>
                                        </ul>
                                        <div className="tab-content pt-3">
                                            <div className="tab-pane active">
                                                <form className="form">
                                                    <div className="row">
                                                        <div className="col">
                                                            <div className="row">
                                                                <div className="col">
                                                                    <div className="form-group">
                                                                        <label>Full Name</label>
                                                                        <input className="form-control" type="text" name="name" value={profile.fullname} disabled />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col">
                                                                    <div className="form-group">
                                                                        <label>Email</label>
                                                                        <input className="form-control" type="text" placeholder={profile.email} onChange={handleChange} name="email" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col mb-3">
                                                                    <div className="form-group">
                                                                        <label>About</label>
                                                                        <textarea className="form-control" rows="5" name="about" placeholder={profile.about} onChange={handleChange} maxlength="90"></textarea>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="mb-2"><b>Social Media</b></div>
                                                        <div className="col-12 col-sm-6 mb-3">
                                                            <div className="col">
                                                                <div className="form-group">
                                                                    <label>Twitter</label>
                                                                    <input className="form-control" type="text" placeholder={profile.twitter} name="twitter" onChange={handleChange} />
                                                                </div>
                                                            </div>
                                                            <div className="col">
                                                                <div className="form-group">
                                                                    <label>GitHub</label>
                                                                    <input className="form-control" type="text" placeholder={profile.github} name="github" onChange={handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-sm-5 offset-sm-1 mb-3">
                                                            <div className="row">
                                                                <div className="form-group">
                                                                    <label>Instagram</label>
                                                                    <input className="form-control" type="text" placeholder={profile.instagram} name="instagram" onChange={handleChange} />
                                                                </div>
                                                            </div>
                                                            <div className="col">
                                                                <div className="form-group">
                                                                    <label>Facebook</label>
                                                                    <input className="form-control" type="text" placeholder={profile.facebook} name="facebook" onChange={handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                                <div className="form-group">
                                                                    <label>Address</label>
                                                                    <input className="form-control" type="text" name="address" placeholder="Flat no.xxx" onChange={handleChange} />
                                                                </div>
                                                    </div><br/>
                                                    <div className="row">
                                                        <div className="col d-flex justify-content-end">
                                                            <Button color="primary" type="submit" size="large" variant="contained" onClick={handleSubmit} >Save Changes</Button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-3 mb-3">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="px-xl-3">
                                        <Button onClick={logout} variant="contained" color="error" size="large">
                                            <span>Logout</span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <h6 className="card-title font-weight-bold">Support</h6>
                                    <p className="card-text">Get fast, free help from us.</p>
                                    <ListItem component={Link} to="/contact" >
                                        <ContactSupport size="large" />
                                    </ListItem>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}