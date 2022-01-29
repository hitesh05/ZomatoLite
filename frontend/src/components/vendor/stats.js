import axios from "axios";
import React, { useState, useContext, useEffect, Component } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Button, Grid } from "@mui/material";
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2';
import BarChart from "./chart";

const Stats = () => {
    var id = localStorage.getItem('ZomatoId');
    const [user, setUser] = useState([]);
    const [allorders, setAllOrders] = useState([]);
    const [allbuyers, setAllBuyers] = useState([]);
    var loaded = false;
    var placed = 0;
    var pending = 0;
    var completed = 0;
    var rejected = 0;
    var topitems = [];
    var age = {};
    var age_key = [];
    var age_value = [];
    var batch_key = [];
    var batch_value = [];
    var batch = {};

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/vendor/ven/${id}`)
                setUser(res.data);
                const res2 = await axios.get(`http://localhost:4000/order/all`);
                setAllOrders(res2.data);
                const res3 = await axios.get(`http://localhost:4000/buyer/all`);
                setAllBuyers(res3.data);
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);

    const GetStats = () => {
        var d = {};
        for (var i = 0; i < allorders.length; i++) {
            if (allorders[i].vendorname === user.shopName) {
                placed += 1;
                if (allorders[i].status === "Completed") {
                    completed += 1;
                    var key = allorders[i].name;
                    if (d[key] === undefined) {
                        d[key] = 1;
                    }
                    else {
                        d[key] += 1;
                    }

                }
                else if (allorders[i].status === "Rejected") {
                    rejected += 1;
                }
                else {
                    pending += 1;
                }
                // console.log(allorders[i].name); 
            }
        }
        var items = Object.keys(d).map(function (key) {
            return [key, d[key]];
        });

        items.sort(function (first, second) {
            return second[1] - first[1];
        });

        topitems = items.slice(0, 5);
    }

    GetStats();

    const GetData = async () => {
        for (var i = 0; i < allorders.length; i++) {
            if (allorders[i].vendorname === user.shopName && allorders[i].status === "Completed") {
                for (var j = 0; j < allbuyers.length; j++) {
                    if (allorders[i].buyerid === allbuyers[j]._id) {
                        if (age[(allbuyers[j].age)] === undefined) {
                            age[(allbuyers[j].age)] = 1;
                        }
                        else {
                            age[(allbuyers[j].age)] += 1;
                        }

                        if (batch[(allbuyers[j].batch)] === undefined) {
                            batch[(allbuyers[j].batch)] = 1;
                        }
                        else {
                            batch[(allbuyers[j].batch)] += 1;
                        }
                    }
                }
            }
        }
        age_key = Object.keys(age).map(function (key) {
            return (key);
        });
        // console.log(age_key);

        age_value = Object.keys(age).map(function (key) {
            return age[key];
        });
        // console.log((age_value));

        batch_key = Object.keys(batch).map(function (key) {
            return (key);
        });
        batch_value = Object.keys(batch).map(function (key) {
            return [batch[key]];
        });

        loaded = true;
    };

    GetData();
    // console.log(batch_key);
    const label1 = "age";
    const label2 = "batch";

    return (
        <div align='center'>
            <div>
                <Card sx={{ maxWidth: 500 }} variant="outlined">
                    <CardHeader
                        title="Top 5 items sold"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {topitems.map((i, ind) => (
                                <b>{i[0]}<br></br></b>
                            ))}
                        </Typography>
                    </CardContent>
                </Card>
            </div>
            <div>
                <Card sx={{ maxWidth: 500 }} variant="outlined">
                    <CardHeader
                        title="Stats"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            Placed Orders: <b>{placed}</b>.<br></br>
                            Pending Orders: <b>{pending}</b>.<br></br>
                            Completed Orders: <b>{completed}.</b><br></br>
                            Rejected Orders: <b>{rejected}.</b>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
            <div>
                <Grid container>
                    <Grid item xs={5}>
                        <br></br>
                        <b>Age wise distribution of completed orders</b>
                        {loaded &&
                            <BarChart label={label1} x={age_key} y={age_value} />
                        }
                    </Grid>
                    <Grid item xs={5}>
                        <br></br>
                        <b>Batch wise distribution of completed orders</b>
                        {loaded &&
                            <BarChart label={label2} x={batch_key} y={batch_value} />
                        }
                    </Grid>
                </Grid>

            </div>
        </div>
    );
};
export default Stats;
