import React from 'react';
import highstock from 'highcharts/highstock';
import HighChartsReact from 'highcharts-react-official';
import TradingViewWidget from 'react-tradingview-widget';
import styled from 'styled-components';
// import annotations from 'highcharts/modules/annotations';
import annotations from 'highcharts-annotations';
// import 'highcharts/css/themes/dark-unica.css';

annotations(highstock);

const TradingViewWidgetWrapper = styled.div`
  width:100%;
  height: 453px;
`

const TradingViewWidgetTitle = styled.p`
  font-size: 1.5rem;
`

const Chart = props => {
        const options = {
              rangeSelector: {
                selected: 1
              },
          
              title: {
                text: `${props.currencyPair} Historical_HIGHCHART`
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
                    highcharts={highstock}
                    constructorType={'stockChart'}
                    options={options}
                />
                <TradingViewWidgetWrapper>
                  <TradingViewWidgetTitle>ICXKRW(BITHUMB)_TradingView</TradingViewWidgetTitle>
                  <TradingViewWidget
                      autosize={true}
                      symbol="BITHUMB:ICXKRW"
                      interval="1"
                      timezone="Asia/Seoul"
                      theme="Dark"
                      style="1"
                      locale="kr"
                      toolbar_bg="#f1f3f6"
                      enable_publishing={false}
                      hide_side_toolbar={false}
                  />
                </TradingViewWidgetWrapper>
            </React.Fragment>
        );
    }


export default Chart