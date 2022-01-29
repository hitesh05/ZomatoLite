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

const Profile = (props) => {

    const [edit, setEdit] = useState(false);
    const [user, setUser] = useState({});
    const [loaded, setLoaded] = useState(false);
    const id = localStorage.getItem('ZomatoId');
    const [alert, setAlert] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/vendor/ven/${id}`)
                setUser(res.data);
                setLoaded(true);
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [])


    const handleEdit = async () => {
        try {
            const res = await axios.post('http://localhost:4000/vendor/update', user);
            setUser(res.data.vendor);
            setEdit(false);
            // console.log(res.data);
            if (res.data.status === 200) {
                setAlert(false);
            }
            else {
                setAlert(true);
                setMessage(res.data.message);
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <Container>
                < Row className="text-right">
                    <Col style={{ marginRight: '100px' }}>
                        {alert &&
                            <Alert severity='error' onClose={() => setMessage('')} dismissible="true">
                                {message}
                            </Alert>
                        }
                        {!edit ? (
                            <Button variant="outline-info" onClick={() => setEdit(true)}>Edit Profile</Button>
                        ) : (
                            <div>
                                <Button variant="outline-success" className="ml-3" onClick={handleEdit}>Save</Button>

                                <Button variant="outline-danger" className="ml-3" onClick={() => setEdit(false)}>Cancel</Button>
                            </div>
                        )}
                    </Col>
                    {/* {console.log(alert)} */}
                </Row>

                {!loaded ? (<Row className="justify-content-center"><Loader /></Row>) : !edit ? <Display user={user} /> : <Edit user={user} setUser={setUser} />}
            </Container>
        </div >
    )
}

export default Profile

