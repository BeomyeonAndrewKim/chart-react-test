import React, { Component } from 'react';
import Chart from '../components/Chart'
import axios from 'axios'
import data from '../sample.json'



export default class ChartContainer extends Component {
    constructor(){
        super();

        this.state = {
            ohlc: [],
            volume: [],
            groupingUnits: []
        };
    
        this.currencyPair = null;
    }

   
    getData = async () => {

        //CoinoneAPI
        // const coinoneAPI = await axios.get('https://api.coinone.co.kr/ticker_utc?currency=xrp');
        // console.log(coinoneAPI);

        //Cryptocompare API
        


        //Poloniex API
        this.currencyPair = 'USDT_ETH'; 
        const start = 1410158341, period = 14400;

        let poloniexAPI;

        await axios.get(`https://poloniex.com/public?command=returnChartData&currencyPair=${this.currencyPair}&start=${start}&end=9999999999&period=${period}`,{ timeout: 15000 })
                .then(response => {
                    poloniexAPI = response.data;
                });

        let ohlc2 = [],
            volume2 = [],
            data2Length = poloniexAPI.length;
            
        for(let i = 0; i < data2Length; i++) {
            ohlc2.push([
                poloniexAPI[i].date*1000,
                poloniexAPI[i].open,
                poloniexAPI[i].high,
                poloniexAPI[i].low,
                poloniexAPI[i].close
            ]);

            volume2.push([
                poloniexAPI[i].date*1000,
                poloniexAPI[i].volume
            ])
        }
        
        
        //sample.json
        let ohlc = [],
            volume = [],
            dataLength = data.length,
            groupingUnits = 
            [
            [
                'week',             // unit name
                [1]               // allowed multiples
            ], 
            [
                'month',
                [1, 2, 3, 4, 6]
            ]
            ];
    
        for (let i = 0; i < dataLength; i += 1) {
            ohlc.push([
            data[i][0], // the date
            data[i][1], // open
            data[i][2], // high
            data[i][3], // low
            data[i][4] // close
            ]);
    
            volume.push([
            data[i][0], // the date
            data[i][5] // the volume
            ]);
        };

        this.setState({
            ohlc: ohlc2,
            volume: volume2,
            groupingUnits: groupingUnits,
        });

    }
    
    componentDidMount() {
        this.getData()
    }

    render() {
        return (
            <div>
                { 
                    this.state.ohlc.length 
                        ? <Chart 
                            {...this.state}
                            currencyPair={this.currencyPair}
                            /> 
                        : <div>Loading...</div> 
                }
            </div>
        );
    }
}

