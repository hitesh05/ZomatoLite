import axios from "axios";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import React, { useState, useEffect, useContext } from 'react'
import { ButtonGroup, cardClasses } from "@mui/material";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

const ViewFood = () => {
    const [user, setUser] = useState([]);
    const [allfood, setAllfood] = useState([]);
    const id = localStorage.getItem('ZomatoId');
    const [expanded, setExpanded] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();
    const [edit,setEdit] = useState(false);
    // console.log(id);

    const [food,setFood] = useState(false);

    const onChangeFood = (props) => {
        setFood(props);
        setEdit(true);
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

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

            try {
                const res = await axios.get(`http://localhost:4000/food/all`);
                setAllfood(res.data);
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);

    return (
        <Grid container>
            <Grid item xs={12} md={9} lg={9}>
                <div>
                    {allfood.map((i, ind) => (
                        <div>
                            {i.vendorname === user.shopName &&
                                <div key={ind} align='center'>
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
                                            <ButtonGroup variant="text" color="primary" type="submit" onClick={()=>onChangeFood(i)}>
                                                <Button>Edit</Button>
                                            </ButtonGroup>
                                            {edit &&
                                                navigate(`edit`,{
                                                    state: food
                                                })
                                            }
                                            <ButtonGroup variant="text" color="secondary" type="submit" onClick={() => axios.post(`http://localhost:4000/food/delete`,i) && window.location.reload(false)}>
                                                <Button>Delete</Button>
                                            </ButtonGroup>
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
    );
};

export default ViewFood