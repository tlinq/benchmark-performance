import React, { Component } from "react";
import data from "./../Data/Data visualisation - homework - input";


import PerformanceScatter from "./PerformanceScatter"



class Dashboard extends Component {
  constructor(props) {
    super(props);
    // console.log(data.data)
    this.state = { data: data.data };
  }

  getTest = () => {
    console.log(this.state.data);
  };


  render() {

    

    return (
      <div>
        <button onClick={this.getTest}>test</button>
        <PerformanceScatter data={this.state.data}></PerformanceScatter>
        
      </div>
    );
  }
}

export default Dashboard;
