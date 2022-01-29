import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Display from './vendor_display'
import Edit from './vendor_edit'
import Loader from '../loader/loader'
import { UserContext } from '../userContext/useContext'
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import Container from 'muicss/lib/react/container';

const BuyerDisplay = (props) => {
    const [user, setUser] = useState({});
    const id = localStorage.getItem('ZomatoId');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/buyer/buy/${id}`)
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
                    <Col sm={6} className="text-right"> Age : {user.age}</Col>

                </Row>
                <Row className="justify-content-center mb-3" style={{ fontSize: "2rem" }}>
                    <Col sm={6} className="text-right"> Batch : {user.batch}</Col>
                </Row>
                <Row className="justify-content-center mb-3" style={{ fontSize: "2rem" }}>
                    <Col sm={6} className="text-right"> Wallet balance : {user.wallet}</Col>
                </Row>
            </Container>
        </div>
    )
}

export default BuyerDisplay