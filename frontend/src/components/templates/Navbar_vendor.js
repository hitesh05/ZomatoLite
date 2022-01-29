import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Navbar = () => {
    const navigate = useNavigate();
    // const userContext = useContext(UserContext)
    const [redirect, setRedirect] = useState(false);
    const id = localStorage.getItem('ZomatoId');

    // MAKE SIGN OUT
    const handleSignOut = () => {
        localStorage.removeItem('ZomatoId');
        localStorage.removeItem('ZomatoName');
        localStorage.removeItem('ZomatoRole');
        localStorage.removeItem('ShopName');
        setRedirect(true);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ cursor: "pointer" }}
                        onClick={() => navigate("/")}
                    >
                        Canteen Portal
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button color="inherit" onClick={() => navigate(`/profile/vendor/${id}`)}>
                        Profile
                    </Button>
                    <Button color="inherit" onClick={() => navigate(`addFood`)}>
                        Add Items
                    </Button>
                    <Button color="inherit" onClick={() => navigate(`viewFood`)}>
                        View Items
                    </Button>
                    <Button color="inherit" onClick={() => navigate(`myorders`)}>
                        View Orders
                    </Button>
                    <Button color="inherit" onClick={() => navigate(`stats`)}>
                        Stats
                    </Button>
                    <Button color="inherit" onClick={handleSignOut}>
                        Sign Out
                    </Button>
                    {redirect && navigate(`/`)}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar