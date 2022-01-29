import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, { useState, useContext, useEffect } from 'react';
import { ButtonGroup } from "@mui/material";
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate, useLocation } from "react-router-dom";
import Alert from '@mui/material/Alert';

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

const OrderFood = (props) => {
    const navigate = useNavigate();
    var id = localStorage.getItem('ZomatoId');
    const { state } = useLocation();
    var len = state.addons.length;
    const [alert, setAlert] = useState(false);
    const [ordered, setOrdered] = useState(false);

    const allAddons = (state.addons);
    const [addons, setAddons] = useState([]);

    const [allqty, setAllQty] = useState(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);
    const [qty, setQty] = useState(1);

    const [walletEr, setWalletEr] = useState(false);
    const [user, setUser] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`http://localhost:4000/buyer/buy/${id}`)
            setUser(res.data);
        }
        fetchData();
    }, [])

    const onChangeQty = (e, v) => {
        var value = Number(v);
        setQty(value);
    }

    const onChangeAddon = (e, v) => {
        setAddons(v);
    };

    const resetInputs = () => {
        setQty(1);
        setAddons([]);
    }

    var price = Number(state.price);
    const Submit = () => {
        // console.log("submit mei jaa raha hai. lite le");
        // console.log('submit mei addons: ', addons);
        for (var i = 0; i < addons.length; i++) {
            price += Number(addons[i].price);
        }
        price *= qty;
        // console.log(price);

        const res = {
            buyerid: id,
            vendorname: state.vendorname,
            name: state.name,
            quantity: qty,
            price: price,
            time: Date().toLocaleString(),
            addons: addons
        };
        console.log(res);
        if (price > user.wallet) {
            setWalletEr(true);
            setAlert(true);
            setOrdered(false);
        }
        else {
            axios
                .post("http://localhost:4000/order/add", res)
                .then((response) => {
                    console.log(response.status);
                    if (response.status === 200) {
                        setOrdered(true);
                        setAlert(false);
                        user.wallet -= price;
                        axios
                            .post("http://localhost:4000/buyer/update",user)
                            .then((response)=>{
                                if(response.status===200){
                                    console.log('user updated');
                                }
                            });
                    }
                    else {
                        setOrdered(false);
                        setAlert(true);
                    }
                });
            resetInputs();
        }
    };

    return (
        <div>
            <Grid container align='center'>
                {walletEr &&
                    <Alert severity='error' onClose={() => setAlert(false)} dismissible="true">
                        Not enought balance in wallet!
                    </Alert>
                }
                {alert &&
                    <Alert severity='error' onClose={() => setAlert(false)} dismissible="true">
                        Order couldn't be placed!
                    </Alert>
                }
                {ordered &&
                    <Alert severity='success' onClose={() => setOrdered(false)} dismissible="true">
                        Order placed! Go to my orders page to view your order.
                    </Alert>
                }
                <Grid item xs={12}>
                    <h2>Name: {state.name}</h2>
                </Grid>
                <Grid item xs={12}>
                    <h2>Category: {state.category}</h2>
                </Grid>
                <Grid item xs={12}>
                    <h2>Price: {state.price}</h2>
                </Grid>
                <Grid item xs={12}>
                    {len > 0 &&
                        <Autocomplete
                            onChange={onChangeAddon}
                            multiple={true}
                            id="combo-box-demo"
                            options={allAddons}
                            getOptionLabel={(option) => option.item}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Select Addons"
                                    variant="outlined"
                                />
                            )}
                        />
                    }
                    {len === 0 &&
                        <h2>No addons to choose from</h2>
                    }
                    {/* {console.log('addons',addons)} */}
                </Grid>
                <Grid item xs={12}>
                    <Autocomplete
                        onChange={onChangeQty}
                        id="combo-box-demo"
                        options={allqty}
                        getOptionLabel={(option) => option}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Select Quantity"
                                variant="outlined"
                            />
                        )}
                    />

                </Grid>
                <Grid item xs={12}>
                    <ButtonGroup variant="outlined" type="submit" onClick={() => Submit()}>
                        <Button>Submit</Button>
                    </ButtonGroup>
                </Grid>
                <Grid item xs={12}>
                    <ButtonGroup variant="outlined" type="submit" onClick={() => navigate(`/profile/buyer/${id}/viewItems`)}>
                        <Button>Go Back</Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        </div>
    )
};

export default OrderFood