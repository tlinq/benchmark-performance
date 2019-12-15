import React, { Component } from "react";
import data from "./../Data/Data visualisation - homework - input";
import PerformanceScatter from "./PerformanceScatter";
import PerfRadarChart from "./PerfRadarChart";
import "./Dashboard.css"

class Dashboard extends Component {
  constructor(props) {
    super(props);
    // console.log(data.data)
    const medians = this.calcStats(data.data);
    this.state = { data: data.data, medians: medians, scatterData: data.data };
  }

  getTest = () => {
    console.log(this.state.data);
    console.log(this.state.medians);
  };

  calcMedian = values => {
    if (values.length === 0) {
      return null;
    }
    values.sort();

    let half = Math.floor(values.length / 2);

    if (values.length % 2) {
      return values[half];
    }

    return (values[half - 1] + values[half]) / 2.0;
  };

  calcStats = data => {
    if (data) {
      console.log("calcStats", data);
      const suites = [...new Set(data.map(x => x["Suite"]))];
      //   let medians = {};
      let medians = suites.map(suite => {
        let filtered_data = data.filter(x => x["Suite"] === suite);
        let values = filtered_data.map(y => y["Relative Performance"]);
        // medians[suite] = this.calcMedian(values);
        return { suite: suite, median: this.calcMedian(values) };
      });
      return medians;
    }
    return null;
  };

  render() {
    return (
      <div className="WrapperContainer">
        {/* <button onClick={this.getTest}>test</button> */}
        <div className="LeftContainer">
            <h4>Median performance change by Suite</h4>
          <PerfRadarChart medians={this.state.medians} />
        </div>
        <div className="RightContainer">
        <h4>Detailed performance change by Benchmark</h4>
          <PerformanceScatter data={this.state.scatterData} />
        </div>
      </div>
    );
  }
}

export default Dashboard;
