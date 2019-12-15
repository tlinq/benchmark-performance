import React, { Component } from "react";
import "./Table.css"

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  sortByKey = (array, key) => {
    return array.sort(function(a, b) {
      var x = a[key];
      var y = b[key];
      return x < y ? -1 : x > y ? 1 : 0;
    });
  };

  sortIt = () => {
      console.log("sort")
  }

  rowClicked = (row) => {
      console.log("tableRow", row)
        this.props.showSummary(row)
  }

  makeTable = data => {
    if (data.length>0) {
      const keys = Object.keys(data[0]);
      const tableHeader = [
        "Benchamark Group",
        "Median Performance Change"
      ].map(x => {
        return <th  onClick={() => this.sortIt()} className="Th">{x}</th>;
      });
      const tableContent = data.map(row => {
        return (
          <tr className="Tr" onClick={()=> this.rowClicked(row)}>
            {keys.map((key, i) => {
              if (i>0){
                return <td style={{textAlign: "center"}}>{row[key]}</td>    
              }
              return <td>{row[key]}</td>;
            })}
          </tr>
        );
      });
      return { header: tableHeader, content: tableContent };
    }
    return { header: null, content: null }
  };

  render() {
    // console.log("Table", this.props.data);
    // console.log("Table sorted", this.sortByKey(this.props.data, "median"));
    const { header, content } = this.makeTable(this.props.data);
    return (
      <div className="TableWrapper">
        <table className="Table">
          <tr className="TableHeader">{header}</tr>
          {content}
        </table>
      </div>
    );
  }
}

export default Table;
