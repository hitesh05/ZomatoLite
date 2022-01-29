import React, { useEffect, useContext, useState } from 'react'
import { UserContext } from '../userContext/useContext'
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ButtonGroup } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

const BuyerEdit = (props) => {
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
                        label="age"
                        variant="outlined"
                        value={user.age}
                        onChange={e => setUser({ ...user, age: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl sx={{ m: 1, minWidth: 210 }}>
                        <InputLabel id="demo-simple-select-label">Batch</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={user.batch}
                            label="Batch"
                            onChange={e => setUser({ ...user, batch: e.target.value })}
                        >
                            <MenuItem value={"UG1"}>UG1</MenuItem>
                            <MenuItem value={"UG2"}>UG2</MenuItem>
                            <MenuItem value={"UG3"}>UG3</MenuItem>
                            <MenuItem value={"UG4"}>UG4</MenuItem>
                            <MenuItem value={"UG5"}>UG5</MenuItem>
                            <MenuItem value={"PG1"}>PG1</MenuItem>
                            <MenuItem value={"PG2"}>PG2</MenuItem>
                            <MenuItem value={"PhD"}>PhD</MenuItem>
                            <MenuItem value={"Other"}>Other</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="CHANGE WALLET BALANCE"
                        variant="outlined"
                        value={user.wallet}
                        onChange={e => setUser({ ...user, wallet: e.target.value })}
                    />
                </Grid>
            </Grid>         
        </div>
    )
}

export default BuyerEdit