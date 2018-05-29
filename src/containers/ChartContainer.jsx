import React, { Component } from 'react';
import Chart from '../components/Chart'
// import axios from 'axios'
import data from '../sample.json'

export default class ChartContainer extends Component {
    state = {
        ohlc: [],
        volume: [],
        groupingUnits: []
    };

    getData = async () => {
        // const coinoneAPI = await axios.get('https://api.coinone.co.kr/ticker_utc?currency=xrp');
        // console.log(coinoneAPI);

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
            ohlc: ohlc,
            volume: volume,
            groupingUnits: groupingUnits,
        });
    }
    
    componentDidMount() {
        this.getData()
    }

    render() {
        console.log(this.state);
        return (
            <div>
                { this.state.ohlc.length ? <Chart {...this.state}/> : <div>Loading...</div> }
            </div>
        );
    }
}

