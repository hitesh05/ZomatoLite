import axios from "axios";
import React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Button, Grid } from "@mui/material";
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2';

const BarChart = (props) => {
     //console.log(props);
    // console.log('y', y);
    return (
        <div>
            <Bar
                data={{
                    labels: props.x,
                    datasets: [
                        {
                            label: props.label,
                            data: props.y,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                            ],
                        },
                    ],
                }}
                height={400}
                width={600}
            />
        </div>
    );
};

export default BarChart;