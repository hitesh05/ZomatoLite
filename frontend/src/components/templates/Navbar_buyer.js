import React, { useState, useEffect, useContext } from 'react'
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import Filters from '../buyer/filters';

const Navbar = () => {
    const navigate = useNavigate();
    // const userContext = useContext(UserContext)
    const [redirect, setRedirect] = useState(false)
    const id = localStorage.getItem('ZomatoId');
    const [filters, setFilters] = useState(false);

    // MAKE SIGN OUT
    const handleSignOut = () => {
        localStorage.removeItem('ZomatoId');
        localStorage.removeItem('ZomatoName');
        localStorage.removeItem('ZomatoRole');
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
                    <Button color="inherit" onClick={() => navigate(`/profile/buyer/${id}`)}>
                        Profile
                    </Button>
                    <Button color="inherit" onClick={() => navigate(`/profile/buyer/${id}/myorders`)}>
                        My Orders
                    </Button>
                    <Button color="inherit" onClick={() => navigate(`viewItems`)}>
                        View Items
                    </Button>
                    <Button color="inherit" onClick={handleSignOut}>
                        Sign Out
                    </Button>
                    {redirect && navigate(`/`)}
                    {filters && <Filters />}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar