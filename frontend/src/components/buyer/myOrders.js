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
import { useNavigate } from "react-router-dom";

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
    const [user, setUser] = useState([]);
    const [allorders, setAllOrders] = useState([]);
    const id = localStorage.getItem('ZomatoId');
    const [expanded, setExpanded] = useState(false);
    const [loaded, setLoaded] = useState(false);
    // console.log(id);

    const [status, setStatus] = useState('');

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const OnChangeStatus = (props) => {
        // console.log(props);
        const res = {
            id: props._id,
            status: "Completed"
        };
        axios
            .post("http://localhost:4000/order/updateStatus",res)
            .then((response)=>{
                console.log(response.status);
                console.log(response.data);
            });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/buyer/buy/${id}`)
                setUser(res.data);
                setLoaded(true);
            }
            catch (err) {
                console.log(err);
            }

            try {
                const res = await axios.get(`http://localhost:4000/order/all`);
                setAllOrders(res.data);
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);
    // console.log(allorders);

    return (
        <div>
            <Grid container align='center'>
                <Grid item xs={12}>
                    <div>
                        {allorders.map((i, ind) => (
                            <div>
                                {i.buyerid === id &&
                                    <div key={ind} align='center'>
                                        <Card sx={{ maxWidth: 500 }} variant="outlined">
                                            <CardHeader
                                                title={i.name}
                                            />
                                            <CardContent>
                                                <Typography variant="body2" color="text.secondary">
                                                    The total price of this order is <b>{i.price}</b>.
                                                    The vendor is <b>{i.vendorname}</b>.
                                                    {/* Rating given to it is <b>{i.rating}</b>. */}
                                                    It was placed on <b>{i.time}.</b><br></br>
                                                    Status: <b>{i.status}</b>
                                                </Typography>
                                            </CardContent>
                                            <CardActions disableSpacing>
                                                {i.status === "Ready For Pickup" &&
                                                    <ButtonGroup variant="text" color="primary" type="submit" onClick={()=>OnChangeStatus(i) && window.location.reload(false)}>
                                                        <Button>Pickup</Button>
                                                    </ButtonGroup>
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

export default MyOrders