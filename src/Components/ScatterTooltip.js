import React from "react";
import "./Tooltip.css";

function Tooltip(props) {
  const params = props.benchmark.split("_").map((x, i) => {
    // console.log("tooltip", x);
    if (i === 0) {
      return null;
    } else {
      return <li key={i}>{x}</li>;
    }
  });
  return (
    <div className="Tooltip">
      <div>
        {/* <p>Suite: {props.suite}</p> */}
        <p className="P">{props.category}</p>
        <p className="P">{props.subcategory}</p>
        <p className="P">
          New version: {props.new} {props.unit}
        </p>
        <p className="P">
          Old version: {props.old} {props.unit}
        </p>
        <div>params: {params}</div>
      </div>
    </div>
  );
}

export default Tooltip;
