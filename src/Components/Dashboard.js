import React, { Component } from "react";
import data from "./../Data/Data visualisation - homework - input";
import PerformanceScatter from "./PerformanceScatter";
import PerfRadarChart from "./PerfRadarChart";
import "./Dashboard.css";
import Select from "react-select";
import Table from "./Table";
import BenchmarkModal from "./BenchmarkModal";

class Dashboard extends Component {
    /**
     * The dashboard component handels all the interaction and is the root in this application.
     */
  constructor(props) {
    super(props);
    /**
     * The user can select to filter/highlight from suites 
     * and benchmarks, the unique values of both are calculated here and assigned to the state int he constructor
     */
    
    
    let options = [...new Set(data.data.map(x => x["Suite"]))];
    const suiteOptions = options.map(x => {
      return { value: x, label: x };
    });
    options = [...new Set(data.data.map(x => x["Category"]))];
    const benchmarkCategories = options.map(x => {
      return { value: x, label: x };
    });
    // Calculate the median Performance increase in each benchmark category and suite
    const categoryMedians = this.calcStats(
      data.data,
      "Category",
      "Relative Performance"
    );
    const medians = this.calcStats(data.data, "Suite", "Relative Performance");
    console.log("categoryMedians", categoryMedians);

    this.state = {
      data: data.data,
      medians: medians,
    //   Initiall scatterdata is the same as 'data', scatterdata can be filtered by the user
      scatterData: data.data,
      selectedSuites: null,
      selectedBenchmarks: null,
      suiteOptions: suiteOptions,
      benchmarkCategoryOptions: benchmarkCategories,
    //   categoryMedians are shown in the table under the scatterplot
      categoryMedians: categoryMedians,
    //   modalData will contain data selected to be displayed as a table in the modal.
      modalData: [],
      showSummaryModal: false
    };
  }

//   getTest = () => {

//     console.log(this.state.data);
//     console.log(this.state.medians);
//   };

  calcMedian = values => {
    /**
     * This function calculates the median from an array of numbers
     */
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

  calcStats = (data, key, value) => {
      /**
       * calcStats calcualtes the median over a dataset, where key is the groups over which 
       * the median is calculated and value, is the variable
       */
    if (data) {
      console.log("calcStats", data);
      const suites = [...new Set(data.map(x => x[key]))];
      //   let medians = {};
      let medians = suites.map(suite => {
        let filtered_data = data.filter(x => x[key] === suite);
        let values = filtered_data.map(y => y[value]);
        // medians[suite] = this.calcMedian(values);
        return {
          key: suite,
          median: Math.round(this.calcMedian(values) * 100) / 100
        };
      });
      return medians;
    }
    return null;
  };

  selectedBenchmark = change => {
    console.log(change);
    this.setState({ selectedBenchmarks: change });
    this.updateDisplayedData(this.state.selectedSuites, change);
  };

  selectedSuite = change => {
    // console.log(change);
    this.setState({ selectedSuites: change });
    this.updateDisplayedData(change, this.state.selectedBenchmarks);
  };

  updateDisplayedData = (suites, benchmarks) => {
      /**
       * Fitleres scatterdata on selected suites and benchmark groups
       * This limits what is displayed int he tables and figures
       */
    let filtered_data = [...this.state.data];
    if (suites) {
      let selectedSuites = suites.map(x => x.value);
      filtered_data = filtered_data.filter(x =>
        selectedSuites.includes(x["Suite"])
      );
    }
    if (benchmarks) {
      let selectedBenchmarks = benchmarks.map(x => x.value);
      filtered_data = filtered_data.filter(x =>
        selectedBenchmarks.includes(x["Category"])
      );
    }
    const medians = this.calcStats(
      filtered_data,
      "Category",
      "Relative Performance"
    );
    console.log(medians);
    this.setState({ scatterData: filtered_data, categoryMedians: medians });
  };

  showSummaryModal = row => {
    //   filteres the active data to only being displayed in the modal
    const modalData = this.state.scatterData.filter(x => x["Category"] === row.key);

    this.setState({ modalData: modalData, showSummaryModal: true });
    console.log("modalData", modalData);
  };

  closeSummaryModal = () => {
    console.log("[closeSummaryModal]");
    this.setState({ showSummaryModal: false });
  };

  render() {
    const benchmarkModal = this.state.showSummaryModal ? (
      <BenchmarkModal
        closeSummaryModal={this.closeSummaryModal}
        data={this.state.modalData}
      />
    ) : null;

    return (
      <div>
        {benchmarkModal}
        <div className="WrapperContainer">
            {/* Splitting the layout in a left and right div */}
          <div className="LeftContainer">
            <h4>Median Performance Change by Suite</h4>
            <PerfRadarChart medians={this.state.medians} />
            <div className="Selectcontainer">
              <h5>Select Suites to Highlight</h5>
              <Select
                options={this.state.suiteOptions}
                isMulti={true}
                onChange={this.selectedSuite}
              />
              <h5>Select Benchmark Category to Highlight</h5>
              <Select
                options={this.state.benchmarkCategoryOptions}
                isMulti={true}
                onChange={this.selectedBenchmark}
              />
            </div>
          </div>
          <div className="RightContainer">
            <h4>Detailed Performance Change by Benchmark</h4>
            <PerformanceScatter data={this.state.scatterData} />
            <Table
              data={this.state.categoryMedians}
              showSummary={this.showSummaryModal}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
