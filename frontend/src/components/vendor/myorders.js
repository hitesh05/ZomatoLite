import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, { useState, useContext, useEffect } from 'react';
import { ButtonGroup } from "@mui/material";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import Fuse from 'fuse.js';
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
import emailjs from 'emailjs-com';
import { compose } from "@mui/system";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const MyOrders = () => {
    var id = localStorage.getItem('ZomatoId');
    const [user, setUser] = useState([]);
    const [allorders, setAllOrders] = useState([]);
    var email='';
    var status;
    var buyer = [];

    const [expanded, setExpanded] = useState(false);
    const [alert, setAlert] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const sendEmail = (e) => {
        // e.preventDefault();    //This is important, i'm not sure why, but the email won't send without it
        console.log(email);

        emailjs.send('gmail', 'template_3itlwjc', { message: status, email: email }, 'user_QxjIKG7seCT4Jcx79dyp4')
            .then((result) => {
                console.log(result)  //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior) 
            }, (error) => {
                console.log(error.text);
            });
    };

    const SetEmail = async (props) => {
        const res = await axios.get(`http://localhost:4000/buyer/buy/${props.buyerid}`);
        buyer = res.data;

        email = res.data.email;
        console.log('here',email);
    }

    const OnChangeStatus = async (props) => {
        // console.log(props);
        status = props.status;
        var accepted = 0;
        var cooking = 0;
        var flag = false;

        if (status === "Placed") {
            for (var i = 0; i < allorders.length; i++) {
                if (allorders[i].vendorname === user.shopName) {
                    if (allorders[i].status === "Accepted") {
                        accepted += 1;
                    }
                    else if (allorders[i].status === "Cooking") {
                        cooking += 1;
                    }
                    else {
                        continue;
                    }
                }
            }
            var total = accepted + cooking;
            if (total === 10) {
                flag = true;
            }
            else {
                status = "Accepted";
                await SetEmail(props);
                sendEmail();
            }
        }
        else if (status === "Accepted") {
            status = "Cooking";
        }
        else if (status === "Cooking") {
            status = "Ready For Pickup";
        }

        if (flag === true) {
            setAlert(true);
        }
        else {
            const res = {
                id: props._id,
                status: status
            };
            axios
                .post("http://localhost:4000/order/updateStatus", res)
                .then((response) => {
                    // console.log(response.status);
                    console.log(response.data);
                    window.location.reload(false);

                });
        }
    };
    const OnChangeReject = async (props) => {
        // console.log(props);
        status = "Rejected";
        await SetEmail(props);
        const res = {
            id: props._id,
            status: status
        };
        axios
            .post("http://localhost:4000/order/updateStatus", res)
            .then((response) => {
                // console.log(response.status);
                console.log(response.data);
            });

        buyer.wallet += props.price;
        axios
            .post("http://localhost:4000/buyer/update", buyer)
            .then((response)=>{
                console.log(response.data);
            })

        sendEmail();
        window.location.reload(false);

    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/vendor/ven/${id}`)
                setUser(res.data);
                // setLoaded(true);
                const res2 = await axios.get(`http://localhost:4000/order/all`);
                setAllOrders(res2.data);
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);

    // console.log(user);

    return (
        <div>
            <Grid container align='center'>
                {alert &&
                    <Alert severity='error' onClose={() => setAlert(false)} dismissible>
                        Too many orders (10) in the accepted and cooking stage.
                    </Alert>
                }
                <Grid item xs={12}>
                    <div>
                        {allorders.map((i, ind) => (
                            <div>
                                {i.vendorname === user.shopName &&
                                    <div key={ind} align='center'>
                                        <Card sx={{ maxWidth: 500 }} variant="outlined">
                                            <CardHeader
                                                title={i.name}
                                            />
                                            {/* {console.log(i.buyerid)} */}
                                            <CardContent>
                                                <Typography variant="body2" color="text.secondary">
                                                    The total price of this order is <b>{i.price}</b>.<br></br>
                                                    The vendor is <b>{i.vendorname}</b>.<br></br>
                                                    It was placed on <b>{i.time}.</b><br></br>
                                                    Status: <b>{i.status}</b>
                                                </Typography>
                                            </CardContent>
                                            <CardActions disableSpacing>
                                                {i.status !== "Completed" && i.status != "Rejected" &&
                                                    <div>
                                                        <ButtonGroup variant="text" color="primary" type="submit" onClick={() => OnChangeStatus(i)}>
                                                            <Button>Move To Next Stage</Button>
                                                        </ButtonGroup>
                                                        <ButtonGroup variant="text" color="secondary" type="submit" onClick={() => OnChangeReject(i)}>
                                                            <Button>Reject</Button>
                                                        </ButtonGroup>
                                                    </div>
                                                }
                                                <ExpandMore
                                                    expand={expanded}
                                                    onClick={handleExpandClick}
                                                    aria-expanded={expanded}
                                                    aria-label="show more"
                                                >
                                                    <ExpandMoreIcon />
                                                </ExpandMore>
                                            </CardActions>
                                            <Collapse in={expanded} timeout="auto" unmountOnExit>
                                                <CardContent>
                                                    <Typography><b>Quantity:</b></Typography>
                                                    {i.quantity}
                                                    <br></br>
                                                    <Typography><b>Addons:</b></Typography>
                                                    {i.addons.map((addon) => (
                                                        <Typography>
                                                            Item: {addon.item} , Price: {addon.price}
                                                        </Typography>
                                                    ))}
                                                </CardContent>
                                            </Collapse>
                                        </Card>
                                        <br></br>
                                    </div>
                                }
                            </div>
                        ))}
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default MyOrders;