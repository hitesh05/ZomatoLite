import React, { useEffect, useContext, useState } from 'react'
// import { UserContext } from '../userContext/userContext'
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ButtonGroup } from "@mui/material";
import FormControl from '@mui/material/FormControl';

const VendorEdit = (props) => {
    const {
        user,
        setUser
    } = props

    return (
        <div>
            <div style={{ margin: "20px" }} />
            <Grid container align={"center"} spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        value={user.name}
                        onChange={e => setUser({ ...user, name: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="email"
                        variant="outlined"
                        value={user.email}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="contact"
                        variant="outlined"
                        value={user.contact}
                        onChange={e => setUser({ ...user, contact: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="shopName"
                        variant="outlined"
                        value={user.shopName}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="shopStart"
                        variant="outlined"
                        value={user.shopStart}
                        onChange={e => setUser({ ...user, shopStart: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="shopEnd"
                        variant="outlined"
                        value={user.shopEnd}
                        onChange={e => setUser({ ...user, shopEnd: e.target.value })}
                    />
                </Grid>
            </Grid>
        </div>
    )
}

export default VendorEdit