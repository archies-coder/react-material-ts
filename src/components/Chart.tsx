import React, { FunctionComponent } from 'react';
import { Line } from 'react-chartjs-2';
import { Box, Paper, Theme } from "@material-ui/core";
import { addDays, format, subDays } from 'date-fns';




export const MyChart2: FunctionComponent<any> = ({visitorStats}) => {
  
  const data = {
    datasets: [
      {
        label: 'Visitors',
        fill: false,
        lineTension: 0.1,
        backgroundColor: '#192949',//'rgba(75,192,192,0.4)',
        borderColor: '#192949',//'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        //borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        borderWidth: 1,
        pointBorderColor: '#192949',//'rgba(75,192,192,1)',
        pointBackgroundColor: '#192949',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 10,
        data: visitorStats
      }
    ]
  };
  const options = {
    title: {
      display: false,
      text: 'xyz ',
      position: 'bottom'
    },
    legend: {
      display: false,
      labels: {
        fontColor: 'rgb(255, 99, 132)',
        fontSize: 18
      }
    },
    layout: {
      padding: {
          left: 20,
          right: 20,
          top: 20,
          bottom: 0
      }
    },
    scales: {
      scaleLabel: {
        display: false,
        //fontSize: 100
      },
      ticks:{
        fontSize:18.75,
        lineHeight:5,
        fontStyle: 'bold'
      },
      yAxes: [{
        display: false,
        gridLines: {
          display: false
        },
        scaleLabel: {
          display: false
        },
      }],
      xAxes: [{
        display:true,
        gridLines: {
          display: false
        },
        labels: [format(subDays(new Date(), 0), 'MMM dd'),format(subDays(new Date(), 1), 'dd'),format(subDays(new Date(), 2), 'dd'),format(subDays(new Date(), 3), 'dd'),format(subDays(new Date(), 4), 'dd')],
        scaleLabel: {
          display: false,
          lineHeight: 2
        },
        ticks:{
          fontSize:18.25,
          fontColor: '#192949',//'rgb(255, 99, 132)',
          //fontFamily: ''
          padding:20,
          lineHeight:1,
          maxRotation:0,
          fontStyle: 'bold'
        }
      }]
    }
  }
  return (
    <Box>
      <Line data={data} options={options} />
    </Box>
    
  )
}

export default MyChart2
