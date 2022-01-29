import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Display from './vendor_display'
import Edit from './vendor_edit'
import Loader from '../loader/loader'
import { UserContext } from '../userContext/useContext'
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import Container from 'muicss/lib/react/container';
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from '@mui/material/Alert';

const VendorDisplay = (props) => {
    const [user, setUser] = useState({});
    const id = localStorage.getItem('ZomatoId');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/vendor/ven/${id}`)
                setUser(res.data);
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [])

    return (
        <div>
            <div style={{ margin: "20px" }} />
            <Container>
                <div style={{ margin: "40px" }} />
                <Row className="justify-content-center mb-3" style={{ fontSize: "2rem" }}>
                    <Col sm={6} className="text-right"> Name : {user.name}</Col>
                </Row>
                <Row className="justify-content-center mb-3" style={{ fontSize: "2rem" }}>
                    <Col sm={6} className="text-right"> Email : {user.email}</Col>
                </Row>
                <Row className="justify-content-center mb-3" style={{ fontSize: "2rem" }}>
                    <Col sm={6} className="text-right"> Contact : {user.contact}</Col>
                </Row>
                <Row className="justify-content-center mb-3" style={{ fontSize: "2rem" }}>
                    <Col sm={6} className="text-right"> Shop Name : {user.shopName}</Col>
                </Row>
                <Row className="justify-content-center mb-3" style={{ fontSize: "2rem" }}>
                    <Col sm={6} className="text-right"> Start Time : {user.shopStart}</Col>
                </Row>
                <Row className="justify-content-center mb-3" style={{ fontSize: "2rem" }}>
                    <Col sm={6} className="text-right"> End Time : {user.shopEnd}</Col>
                </Row>
            </Container>
        </div>
    )
}

export default VendorDisplay