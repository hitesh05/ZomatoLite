import React, { useState, useContext, useEffect } from 'react'
// import { Alert, Container, Jumbotron, Form, Row, Col} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import jwt_decode from "jwt-decode";
import { UserContext } from '../userContext/useContext'
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ButtonGroup } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import Button from "@mui/material/Button";
import Alert from '@mui/material/Alert';
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [role, setRole] = useState("Buyer")
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState(false);
    const [error, setError] = useState('');
    const userContext = useContext(UserContext);
    const [redirect, setRedirect] = useState(false);
    const [user, setUser] = useState({});

    const navigate = useNavigate();

    const onChangeRole = (event) => {
        setRole(event.target.value);
    };
    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    };
    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const Submit = async () => {
        if (role === "Buyer") {
            const res = {
                email: email,
                password: password
            };
            axios
                .post("http://localhost:4000/buyer/login", res)
                .then((response) => {
                    if (response.data.status === 200) {
                        const buyer = jwt_decode(response.data.token);
                        // console.log(buyer);
                        localStorage.setItem('ZomatoId', buyer.id);
                        localStorage.setItem('ZomatoRole', "Buyer");
                        localStorage.setItem('ZomatoName', buyer.name);
                        setUser(buyer);
                        setRedirect(true);
                    }
                    else {
                        console.log(error);
                        setAlert(true);
                        setError(response.data.message);
                        console.log(response.data);
                    }
                });
        }
        else if (role === "Vendor") {
            const res = {
                email: email,
                password: password
            };
            axios
                .post("http://localhost:4000/vendor/login", res)
                .then((response) => {
                    if (response.data.status === 200) {
                        console.log(response.data);
                        const vendor = jwt_decode(response.data.token);
                        // console.log(vendor);
                        localStorage.setItem('ZomatoId', vendor.id);
                        localStorage.setItem('ZomatoRole', "Vendor");
                        localStorage.setItem('ZomatoName', vendor.name);
                        localStorage.setItem('ShopName', vendor.shopName);
                        localStorage.setItem('ShopStart', vendor.shopStart);
                        localStorage.setItem('ShopEnd', vendor.shopEnd);
                        setUser(vendor);
                        setRedirect(true);
                    }
                    else {
                        console.log(error);
                        setAlert(true);
                        setError(response.data.message);
                    }
                });
        }
        console.log(user);
    }

    if (role === "Buyer") {
        return (
            <Grid container align="center" spacing={2}>
                <h1>Buyer Login</h1>
                <Grid item xs={12}>
                    {alert &&
                        <Alert severity='error' onClose={() => setAlert(false)} dismissible>
                            {error}
                        </Alert>
                    }
                    <FormControl sx={{ m: 1, minWidth: 210 }}>
                        <InputLabel id="demo-simple-select-label">Role</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={role}
                            label="Role"
                            onChange={onChangeRole}
                        >
                            <MenuItem value={"Buyer"}>Buyer</MenuItem>
                            <MenuItem value={"Vendor"}>Vendor</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={onChangeEmail}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="standard-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        variant="outlined"
                        value={password}
                        onChange={onChangePassword}
                    />
                </Grid>
                <Grid item xs={12}>
                    <ButtonGroup variant="contained" type="submit" onClick={() => Submit()}>
                        <Button>Submit</Button>
                    </ButtonGroup>
                    <Link to='/'>
                        <Button variant="danger" className="mb-3">Go Back</Button>
                    </Link>
                </Grid>
                {redirect &&
                    navigate(`/profile/buyer/${user.id}`)
                }
            </Grid>
        );
    }
    if (role === "Vendor") {
        return (
            <div>
                {alert &&
                    <Alert severity='error' onClose={() => setAlert(false)} dismissible>
                        {error}
                    </Alert>
                }
                <Grid container align="center" spacing={2}>
                    <h1>Vendor Login</h1>
                    <Grid item xs={12}>
                        <FormControl sx={{ m: 1, minWidth: 210 }}>
                            <InputLabel id="demo-simple-select-label">Role</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={role}
                                label="Role"
                                onChange={onChangeRole}
                            >
                                <MenuItem value={"Buyer"}>Buyer</MenuItem>
                                <MenuItem value={"Vendor"}>Vendor</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            value={email}
                            onChange={onChangeEmail}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="standard-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            variant="outlined"
                            value={password}
                            onChange={onChangePassword}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <ButtonGroup variant="contained" type="submit" onClick={() => Submit()}>
                            <Button>Submit</Button>
                        </ButtonGroup>
                        <Link to='/'>
                            <Button variant="danger" className="mb-3">Go Back</Button>
                        </Link>
                    </Grid>
                    {redirect &&
                        navigate(`/profile/vendor/${user.id}`)
                    }

                </Grid>
            </div>
        );
    }
}

export default Login