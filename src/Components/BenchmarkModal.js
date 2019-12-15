import React, { Component } from "react";
import "./BenchmarkModal.css";

class BenchmarkModal extends Component {
  sortByKey = (array, key) => {
    return array.sort(function(a, b) {
      var x = a[key];
      var y = b[key];
      return x < y ? -1 : x > y ? 1 : 0;
    });
  };

  render() {
    const data = this.sortByKey(this.props.data, "New");

    console.log("[BenchmarkModal] - data", this.props.data);
    // const tableHeaders = ["Suite", "Benchmark", "Old", "New", "Unit"].map(x => {
    //   return <th className="Th">{x}</th>;
    // });
    const tableHeaders = (
      <tr className="TableHeader">
        <th className="Tablehead">Suite</th>
        <th className="Benchmark">Benchmark</th>
        <th className="Tablehead">Old</th>
        <th className="Tablehead">New</th>
        <th className="Tablehead">Unit</th>
      </tr>
    );

    const tableContent = data.map(row => {
      return (
        <tr className="Tr">
          <td className="Suite">{row["Suite"]}</td>
          <td className="Benchmark">{row["Benchmark"]}</td>
          <td>{row["Old"]}</td>
          <td>{row["New"]}</td>
          <td>{row["Unit"]}</td>
        </tr>
      );
    });

    return (
      <div className="ModalDark" onClick={this.props.closeSummaryModal}>
        <div className="BenchmarkTableWrapper">
          <table className="BenchmarkTable">
              {tableHeaders}
            {/* <tr className="TableHeader">{tableHeaders}</tr> */}
            {tableContent}
          </table>
        </div>
      </div>
    );
  }
}

export default BenchmarkModal;
