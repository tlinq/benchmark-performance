import React, { PureComponent } from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip
} from 'recharts';


export default class PerfRadarChart extends PureComponent {

  render() {
    return (
      <RadarChart cx={300} cy={250} outerRadius={150} width={500} height={500} data={this.props.medians}>
        <PolarGrid />
        <PolarAngleAxis dataKey="suite" />
        <PolarRadiusAxis />
        <Radar name="Median Performance Increase" dataKey="median" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        <Tooltip/>
      </RadarChart>
    );
  }
}