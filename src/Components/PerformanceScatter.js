import React, { Component } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
// import TestTooltip from "./testTooltip";
import ScatterTooltip from "./ScatterTooltip"

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    console.log("payload", payload[0].payload);
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

class PerformanceScatter extends Component {


  render() {

    

    return (
      <div>
        <ScatterChart
          width={1000}
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
          <Scatter name="Benchmarking" data={this.props.data} fill="#8884d8" />
        </ScatterChart>
      </div>
    );
  }
}

export default PerformanceScatter;