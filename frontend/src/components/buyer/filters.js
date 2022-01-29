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

import OrderFood from "./orderFood";

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

const AddFilters = () => {
    const [items, setItems] = useState([]);
    var available_items = [];
    var unavailable_items = [];
    const [perma_items, setPerma_Items] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const [category, setCategory] = useState(["Veg", "Non-Veg"]);
    const [tags, setTags] = useState(["fastfood", "soft-drink", "healthy", "juice", "kya pta"]);
    const [sortBy, setSortBy] = useState(["Price", "Rating"]);
    const [sortAs, setSortAs] = useState(["Ascending", "Descending"]);
    var shopName;
    const shops = new Set();
    const [order, setOrder] = useState(false);
    const [orderVal, setOrderVal] = useState([]);
    const navigate = useNavigate();
    const [allvendors, setAllVendors] = useState([]);

    const [filterMinPrice, setFilterMinPrice] = useState(0);
    const [filterMaxPrice, setFilterMaxPrice] = useState(0);
    const [filterCategory, setFilterCategory] = useState('');
    const [filterTags, setFilterTags] = useState([]);
    const [filterShopNames, setFilterShopNames] = useState([]);
    const [search, setSearch] = useState('');
    const [filterSortBy, setFilterSortBy] = useState('');
    const [filterSortAs, setFilterSortAs] = useState('');
    var time = Date().toLocaleString();
    time = time.slice(16, 21);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:4000/food/all')
                setItems(res.data);
                setPerma_Items(res.data);

                const res2 = await axios.get(`http://localhost:4000/vendor/all`)
                setAllVendors(res2.data);
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const ShopNames = () => {
        for (var i = 0; i < items.length; i++) {
            shops.add(items[i].vendorname);
        }
        shopName = [...shops];
    };
    ShopNames();

    const searchBar = (e) => {
        let v = e.target.value;
        setSearch(v);
    };
    const MinPriceChange = (e) => {
        var v = Number(e.target.value);
        setFilterMinPrice(v);
        // console.log(filterMinPrice);
    };
    const MaxPriceChange = (e) => {
        var v = Number(e.target.value);
        setFilterMaxPrice(v);
    };
    const CategoryChange = (e, v) => {
        setFilterCategory(v);
    };
    const TagChange = (e, v) => {
        setFilterTags(v);
        // console.log(filterTags);
    };
    const ShopNamesChange = (e, v) => {
        setFilterShopNames(v);
    };
    const SortByChange = (e, v) => {
        setFilterSortBy(v);
        console.log(v);
    };
    const SortAsChange = (e, v) => {
        setFilterSortAs(v);
        console.log(v);
    };
    const ChangeOrderVal = (props) => {
        setOrderVal(props);
        // console.log(orderVal);
        setOrder(true);
    };

    const timeChecker = (canteen) => {
        var dt = new Date();//current Date that gives us current Time also

        var start = canteen.shopStart;
        var end = canteen.shopEnd;

        var s = start.split(':');
        var dt1 = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(),
            parseInt(s[0]), parseInt(s[1]));

        var e = end.split(':');
        var dt2 = new Date(dt.getFullYear(), dt.getMonth(),
            dt.getDate(), parseInt(e[0]), parseInt(e[1]));

        if (dt2 > dt1) {
            if (dt >= dt1 && dt <= dt2)
                return true;
            else
                return false;
        }
        else {

            if (dt >= dt1 && dt <= dt2)
                return false;
            else
                return true;
        }
    }

    const resetFilters = () => {
        setFilterMinPrice(0);
        setFilterMaxPrice(0);
        setFilterCategory('');
        setFilterTags([]);
        setFilterShopNames([]);
        setSearch('');
        setSortAs('');
        setSortBy('');
        setOrder(false);
    }

    const SearchItem = () => {
        var selected_food_items = [];
        var empty = [];
        const fuse = new Fuse(
            perma_items, {
            keys: ['name']
        })
        if (search !== "") {
            selected_food_items = fuse.search(search).map(item => item.item);
        }
        else {
            selected_food_items = items;
        }

        if (filterMinPrice !== 0) {
            selected_food_items = selected_food_items.filter(i => i.price >= filterMinPrice);
        }
        if (filterMaxPrice !== 0) {
            selected_food_items = selected_food_items.filter(i => i.price <= filterMaxPrice);
        }
        if (filterCategory !== '') {
            selected_food_items = selected_food_items.filter(i => i.category === filterCategory);
        }
        if (filterTags !== empty) {
            selected_food_items = selected_food_items.filter(i => filterTags.every(val => i.tag.includes(val)));
        }
        if (filterShopNames.length !== 0) {
            // console.log(filterShopNames);
            selected_food_items = selected_food_items.filter(i => filterShopNames.includes(i.vendorname));
        }
        if (filterSortBy !== '' && filterSortAs !== '') {
            if (filterSortBy === 'Price') {
                if (filterSortAs === 'Ascending') {
                    selected_food_items = selected_food_items.sort((a, b) => a.price - b.price);
                }
                else {
                    selected_food_items = selected_food_items.sort((a, b) => b.price - a.price);
                }
            }
            else {
                if (filterSortAs === 'Ascending') {
                    selected_food_items = selected_food_items.sort((a, b) => a.rating - b.rating);
                }
                else {
                    selected_food_items = selected_food_items.sort((a, b) => b.rating - a.rating);
                }
            }
        }
        setItems(selected_food_items);
    };

    const Reset = () => {
        resetFilters();
        window.location.reload(false);
    };

    return (
        <div>
            <Grid container>
                <Grid item xs={12} md={3} lg={3}>
                    <List component="nav" aria-label="mailbox folders">
                        <ListItem text="true">
                            <h1>Food Items and Filters:</h1>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={12} md={9} lg={9}>
                    <List component="nav" aria-label="mailbox folders" onChange={searchBar}>
                        <TextField
                            id="standard-basic"
                            label="Search"
                            fullWidth={true}
                            InputProps={{
                                endAdornment: (
                                    <IconButton onClick={SearchItem}>
                                        <SearchIcon />
                                    </IconButton>
                                ),
                            }}
                        />
                    </List>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12} md={3} lg={3}>
                    <List component="nav" aria-label="mailbox folders">
                        <ListItem>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    Price
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        onChange={MinPriceChange}
                                        id="standard-basic"
                                        label="Enter Min"
                                        fullWidth={true}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        onChange={MaxPriceChange}
                                        id="standard-basic"
                                        label="Enter Max"
                                        fullWidth={true}
                                    />
                                </Grid>
                            </Grid>
                        </ListItem>
                        <Divider />
                        <ListItem divider>
                            <Autocomplete
                                id="combo-box-demo"
                                onChange={CategoryChange}
                                options={category}
                                getOptionLabel={(option) => option}
                                fullWidth
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Select Category"
                                        variant="outlined"
                                    />
                                )}
                            />
                        </ListItem>
                        <Divider />
                        <ListItem divider>
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
                        </ListItem>
                        <Divider />
                        {/* {ShopNames()} */}
                        <ListItem divider>
                            <Autocomplete
                                onChange={ShopNamesChange}
                                multiple={true}
                                id="combo-box-demo"
                                options={shopName}
                                getOptionLabel={(option) => option}
                                fullWidth
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Select Shop Names"
                                        variant="outlined"
                                    />
                                )}
                            />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>Sorting</Grid>
                                <Grid item xs={6}>
                                    <Autocomplete
                                        id="combo-box-demo"
                                        onChange={SortByChange}
                                        options={sortBy}
                                        getOptionLabel={(option) => option}
                                        fullWidth
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Sort By"
                                                variant="outlined"
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Autocomplete
                                        id="combo-box-demo"
                                        onChange={SortAsChange}
                                        options={sortAs}
                                        getOptionLabel={(option) => option}
                                        fullWidth
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Sort As"
                                                variant="outlined"
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ButtonGroup variant="contained" type="submit">
                                <Button onClick={SearchItem}>Set Filters</Button>
                            </ButtonGroup>
                            <ButtonGroup variant="contained" type="submit">
                                <Button onClick={Reset}>Reset Filters</Button>
                            </ButtonGroup>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={12} md={9} lg={9}>
                    <div>
                        {items.map((i, ind) => (
                            <div key={ind} align='center'>
                                {timeChecker(i) === true &&
                                    <div>
                                        {/* {console.log('available',i)} */}
                                        <Card sx={{ maxWidth: 500 }} variant="outlined">
                                            <CardHeader
                                                title={i.name}
                                            />
                                            <CardContent>
                                                <Typography variant="body2" color="text.secondary">
                                                    The price of this item is <b>{i.price}</b>.
                                                    The vendor is <b>{i.vendorname}</b>.
                                                    Rating given to it is <b>{i.rating}</b>.
                                                    Category is <b>{i.category}.</b>
                                                </Typography>
                                            </CardContent>
                                            <CardActions disableSpacing>
                                                <IconButton aria-label="add to favorites">
                                                    <FavoriteIcon />
                                                </IconButton>
                                                <ButtonGroup variant="contained" type="submit" onClick={() => ChangeOrderVal(i)}>
                                                    <Button>Order</Button>
                                                </ButtonGroup>
                                                {order &&
                                                    navigate(`order`, {
                                                        state: orderVal
                                                    })
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
                                                    <Typography><b>Tags:</b></Typography>
                                                    {i.tag.map((tags) => (
                                                        <Typography>
                                                            {tags}
                                                        </Typography>
                                                    ))}
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
                    <div align='center'>
                        <b>The following items are unavailable since the vendor is closed:</b><br></br>
                        {items.map((i, ind) => (
                            <div key={ind} align='center'>
                                {timeChecker(i) === false &&
                                    <div>
                                        <Card sx={{ maxWidth: 500 }} variant="outlined">
                                            <CardHeader
                                                title={i.name}
                                            />
                                            <CardContent>
                                                <Typography variant="body2" color="text.secondary">
                                                    The price of this item is <b>{i.price}</b>.
                                                    The vendor is <b>{i.vendorname}</b>.
                                                    Rating given to it is <b>{i.rating}</b>.
                                                    Category is <b>{i.category}.</b>
                                                </Typography>
                                            </CardContent>
                                            <CardActions disableSpacing>
                                                <IconButton aria-label="add to favorites">
                                                    <FavoriteIcon />
                                                </IconButton>

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
                                                    <Typography><b>Tags:</b></Typography>
                                                    {i.tag.map((tags) => (
                                                        <Typography>
                                                            {tags}
                                                        </Typography>
                                                    ))}
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
    )
};

export default AddFilters