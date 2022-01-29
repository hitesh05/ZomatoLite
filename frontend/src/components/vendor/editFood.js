import axios from "axios";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import React, { useState, useEffect, useContext } from 'react'
import { ButtonGroup, Divider, ListItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate, useLocation } from "react-router-dom";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Alert from '@mui/material/Alert';
import Autocomplete from "@mui/material/Autocomplete";
import List from "@mui/material/List";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const EditFood = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    console.log(state);

    const vendorname = localStorage.getItem('ShopName');
    const [name, setName] = useState(state.name);
    const [price, setPrice] = useState(state.price);
    const [category, setCategory] = useState(state.category);
    const [tag, setTag] = useState(state.tag);
    const [addons, setAddons] = useState(state.addons);
    const [addon_name, setAddonName] = useState('');
    const [addon_price, setAddonPrice] = useState(0);
    const [alert, setAlert] = useState(false);
    const [message, setMessage] = useState("");
    const [added, setAdded] = useState(false);

    const [tags, setTags] = useState(["fastfood", "soft-drink", "healthy", "juice", "kya pta"]);

    // const onChangeVendorName = (e) => {
    //     setName(e.target.value);
    // };
    const onChangeName = (e) => {
        setName(e.target.value);
    };
    const onChangePrice = (e) => {
        setPrice(e.target.value);
    };
    const onChangeCategory = (e) => {
        setCategory(e.target.value);
    };
    const TagChange = (e, v) => {
        setTag(v);
        // console.log(filterTags);
    };
    const onChangeAddonName = (ind) => (e) => {
        const newAddOn = addons.map((add, sidx) => {
            if (ind !== sidx) return add;
            return { ...add, item: e.target.value }
        })
        setAddons(newAddOn);
    };
    const onChangeAddonPrice = (ind) => (e) => {
        const newAddOn = addons.map((add, sidx) => {
            if (ind !== sidx) return add;
            return { ...add, price: e.target.value }
        })
        setAddons(newAddOn);
    }

    const resetInputs = () => {
        setName('');
        setPrice('');
        setCategory('');
        setTag([]);
        setAddons([]);
        setAlert(false);
        setMessage('');
    };

    const Submit = () => {
        const res = {
            id: state._id,
            vendorname: vendorname,
            name: name,
            price: price,
            category: category,
            tag: tag,
            addons: addons,
            rating: state.rating
        };
        console.log(res);
        axios
            .post("http://localhost:4000/food/update", res)
            .then((response) => {
                console.log(response.data);
                console.log(response.data.status);
                if (response.data.status !== 800) {
                    setAlert(false);
                    setAdded(true);
                }
                else {
                    // setMessage(response.data.message);
                    setAlert(true);
                    setAdded(false);
                }
            });
        resetInputs();
        //window.location.reload(false)
    };

    return (
        <Grid container>
            <Grid item xs={12} md={9} lg={9}>
                <h1> Add Food Item </h1>
                {alert &&
                    <Alert severity='error' onClose={() => setAlert(false)} dismissible="true">
                        Attempt unsucceful!
                    </Alert>
                }
                {added &&
                    <Alert severity='success' onClose={() => setAdded(false)} dismissible="true">
                        Food item edited!
                    </Alert>
                }
                <List component="nav" aria-label="mailbox folders">
                    <ListItem>
                        <Grid item xs={12}>
                            <TextField
                                label="Name"
                                variant="outlined"
                                value={name}
                                onChange={onChangeName}
                            />
                        </Grid>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <Grid item xs={12}>
                            <TextField
                                label="Price"
                                variant="outlined"
                                value={price}
                                onChange={onChangePrice}
                            />
                        </Grid>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <Grid item xs={12}>
                            <FormControl sx={{ m: 1, minWidth: 210 }}>
                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={category}
                                    label="Category"
                                    onChange={onChangeCategory}
                                >
                                    <MenuItem value={"Veg"}>Veg</MenuItem>
                                    <MenuItem value={"Non-Veg"}>Non-Veg</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <Grid item xs={2}>
                            <Autocomplete
                                multiple={true}
                                id="combo-box-demo"
                                options={tags}
                                getOptionLabel={(option) => option}
                                fullWidth
                                onChange={TagChange}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Select Tags"
                                        variant="outlined"
                                    />
                                )}
                            />
                        </Grid>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <Grid item xs={12}>
                            {addons.map((a, ind) => (
                                <div key={ind}>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="name"
                                            variant="outlined"
                                            // value={addon_name}
                                            value={a.item}
                                            onChange={onChangeAddonName(ind)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="price"
                                            variant="outlined"
                                            // value={addon_price}
                                            value={a.price}
                                            onChange={onChangeAddonPrice(ind)}
                                        />
                                    </Grid>
                                </div>
                            ))}
                            <div>
                                <ButtonGroup variant="outlined" type="submit" color="secondary" onClick={() => setAddons(addons.concat([{ item: "", price: 0 }]))}>
                                    <Button>Add addon</Button>
                                </ButtonGroup>
                                {console.log(addons)}
                            </div>
                        </Grid>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <Grid item xs={12}>
                            <ButtonGroup variant="contained" type="submit" onClick={() => Submit()}>
                                <Button>Submit</Button>
                            </ButtonGroup>
                            <ButtonGroup variant="contained" color="secondary" type="submit" onClick={() => navigate(`/profile/vendor/${localStorage.getItem('ZomatoId')}/viewFood`)}>
                                <Button>Go Back</Button>
                            </ButtonGroup>
                        </Grid>
                    </ListItem>
                </List>
            </Grid>
        </Grid >
    );

};

export default EditFood