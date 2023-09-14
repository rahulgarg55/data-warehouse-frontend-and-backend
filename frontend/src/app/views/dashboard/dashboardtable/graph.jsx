import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material';
import ReactEcharts from 'echarts-for-react';
import axios from 'axios'; 

const DoughnutChart = ({ height, color = [] }) => {
  const theme = useTheme();

  const [incomingGoodsCount, setIncomingGoodsCount] = useState(0);
  const [outgoingGoodsCount, setOutgoingGoodsCount] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5001/api/incoming-goods-data')
      .then(response => {
        setIncomingGoodsCount(response.data.count);
      })
      .catch(error => {
        console.error('Error fetching incoming goods data:', error);
      });

    axios.get('http://localhost:5001/api/outgoing-goods-data')
      .then(response => {
        setOutgoingGoodsCount(response.data.count);
      })
      .catch(error => {
        console.error('Error fetching outgoing goods data:', error);
      });
  }, []);

  const option = {
    legend: {
      show: true,
      itemGap: 20,
      icon: 'circle',
      bottom: 0,
      textStyle: {
        color: theme.palette.text.secondary,
        fontSize: 13,
        fontFamily: 'roboto'
      }
    },
    tooltip: {
      show: false,
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    xAxis: [
      {
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        }
      }
    ],

    series: [
      {
        name: 'Traffic Rate',
        type: 'pie',
        radius: ['45%', '72.55%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        hoverOffset: 5,
        stillShowZeroSum: false,
        label: {
          normal: {
            show: false,
            position: 'center', 
            textStyle: {
              color: theme.palette.text.secondary,
              fontSize: 13,
              fontFamily: 'roboto'
            },
            formatter: '{a}'
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '14',
              fontWeight: 'normal'
            },
            formatter: '{b} \n{c} ({d}%)'
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          {
            value: incomingGoodsCount,
            name: 'No. of Incoming Items'
          },
          {
            value: outgoingGoodsCount,
            name: 'Outgoing Items'
          },
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  return (
    <ReactEcharts
      style={{ height: height }}
      option={{
        ...option,
        color: [...color]
      }}
    />
  );
};

export default DoughnutChart;
