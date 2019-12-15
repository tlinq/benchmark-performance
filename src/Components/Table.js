import React, { Component } from 'react';

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = { 

         };
    }

    sortByKey = (array, key) => {
        return array.sort(function(a, b) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }

    render() {
        console.log("Table", this.props.data)
        console.log("Table sorted", this.sortByKey(this.props.data, "median"))
        return (
            <div>
                Table goes here
            </div>        
        );
    }
}

export default Table;