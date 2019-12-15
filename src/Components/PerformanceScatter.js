import React, { Component } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
// import TestTooltip from "./testTooltip";
import ScatterTooltip from "./ScatterTooltip"

const CustomTooltip = ({ active, payload }) => {
  if (active) {
    // console.log("payload", payload[0].payload);
    return (
      <ScatterTooltip 
        relPerf={payload[0].payload["Relative Performance"]}
        benchmark={payload[0].payload["Benchmark"]}
        category={payload[0].payload["Category"]}
        new = {payload[0].payload["New"]}
        old = {payload[0].payload["Old"]}
        subcategory = {payload[0].payload["SubCategory"]}
        suite = {payload[0].payload["Suite"]}
        unit = {payload[0].payload["Unit"]}
        />
    );
  }

  return null;
};

const suiteColour = {
    "Core API": "#8884d8",
    "Cypher": "#116466", 
    "Kernel API": "#447AC4",
    "Page Cache": "#66BFC2", 
    "Procedures": "#BCDFC1"
}


class PerformanceScatter extends Component {


  render() {
    const suites = [...new Set(this.props.data.map(x => x['Suite']))]
    console.log("suites",suites)

    const scatters = suites.map(suite => {
        let filtered_data = this.props.data.filter(x => x['Suite']===suite)
        return <Scatter name={suite} data={filtered_data} fill={suiteColour[suite]} />
    })

    return (
      <div>
        <ScatterChart
          width={850}
          height={350}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
          }}
        >
          <CartesianGrid />
          <XAxis type="number" dataKey="index" name="Test" unit="" domain={["auto", "auto"]}/>
          <YAxis
            type="number"
            dataKey="Relative Performance"
            name="Performance"
            unit=""
            scale="log"
            domain={["auto", "auto"]}
          />
          {/* <Tooltip cursor={{ strokeDasharray: "3 3" }} /> */}
          <Tooltip content={<CustomTooltip />} />
          {/* <Scatter name="Benchmarking" data={this.props.data} fill="#8884d8" /> */}
          {scatters}
          <Legend/>
        </ScatterChart>
      </div>
    );
  }
}

export default PerformanceScatter;