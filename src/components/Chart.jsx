import React from 'react';
import highcharts from 'highcharts/highstock';
import HighChartsReact from 'highcharts-react-official';

 const Chart = (props) => {
        const options = {
            rangeSelector: {
                selected: 1
              },
          
              title: {
                text: 'AAPL Historical'
              },
          
              yAxis: [{
                labels: {
                  align: 'right',
                  x: -3
                },
                title: {
                  text: 'OHLC'
                },
                height: '60%',
                lineWidth: 2,
                resize: {
                  enabled: true
                }
              }, {
                labels: {
                  align: 'right',
                  x: -3
                },
                title: {
                  text: 'Volume'
                },
                top: '65%',
                height: '35%',
                offset: 0,
                lineWidth: 2
              }],
          
              tooltip: {
                split: true
              },
          
              series: [{
                type: 'candlestick',
                name: 'AAPL',
                data: props.ohlc,
                dataGrouping: {
                  units: props.groupingUnits
                }
              }, {
                type: 'column',
                name: 'Volume',
                data: props.volume,
                yAxis: 1,
                dataGrouping: {
                  units: props.groupingUnits
                }
            }]
        };
        return (
            <React.Fragment>
                <HighChartsReact
                    highcharts={highcharts}
                    constructorType={'stockChart'}
                    options={options}
                />
            </React.Fragment>
        );
    }


export default Chart