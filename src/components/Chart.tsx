import React, { FunctionComponent } from 'react';
import { Line } from 'react-chartjs-2';




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
        pointBorderColor: '#192949',//'rgba(75,192,192,1)',
        pointBackgroundColor: '#192949',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 5,
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
        fontColor: 'rgb(255, 99, 132)'
      }
    },
    scales: {

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
        gridLines: {
          display: false
        },
        labels: [...visitorStats],
        scaleLabel: {
          display: false
        },
      }]
    }
  }
  return (
    <Line data={data} options={options} />
  )
}

export default MyChart2
