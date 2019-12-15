import React, { Component } from "react";
import "./BenchmarkModal.css";

class BenchmarkModal extends Component {
    /**
     * The BenchmarkModal presents a table with a subset of benchmark results, 
     * It is shown when a user clickes a group of benchmarks in the table
     */
  sortByKey = (array, key) => {
    // This is a copy of the same sorting function used in Table.js
    return array.sort(function(a, b) {
      var x = a[key];
      var y = b[key];
      return x < y ? -1 : x > y ? 1 : 0;
    });
  };

  render() {
    const data = this.sortByKey(this.props.data, "Relative Performance");
    /**
     * Constructing the table for the modal manually here
     */
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
