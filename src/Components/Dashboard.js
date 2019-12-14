import React, { Component } from "react";
import data from "./../Data/Data visualisation - homework - input";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

const data2 = [
  { x: 100, y: 200, z: 200 },
  { x: 120, y: 100, z: 260 },
  { x: 170, y: 300, z: 400 },
  { x: 140, y: 250, z: 280 },
  { x: 150, y: 400, z: 500 },
  { x: 110, y: 280, z: 200 }
];

class Dashboard extends Component {
  constructor(props) {
    super(props);
    // console.log(data.data)


    this.state = { data: data.data };
  }


  
  getTest = () => {
      console.log(data2)
      console.log(this.state.data)
  }

  render() {
    return (
      <div>
          <button onClick={this.getTest}>test</button>
        <ScatterChart
          width={800}
          height={400}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
          }}
        >
          <CartesianGrid />
          <XAxis type="number" dataKey="index" name="Test" unit="" />
          <YAxis type="number" dataKey="Relative Performance" name="Performance" unit="" scale='log' domain={['auto', 'auto']}/>
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter name="Benchmarking" data={this.state.data} fill="#8884d8" />
        </ScatterChart>
      </div>
    );
  }
}

export default Dashboard;
