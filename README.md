## Accessing the Dashboard
(this assumes you have node installed)
### Install packages, run:
yarn install (npm install works as well if you don't have yarn)

### To see the dashboard at localhost:5000
run
> node server.js

### To work with the dashboard in development mode
run
> yarn start
This will serve the dashboard at localhost:3000

### How to view the Dashboard
The radar-schart shows on an overall squite level the median relative performance between new and old

The scatterchart shows the relative performance between the new and the old versions of the software for each individual benchmark

The table shows the median relative performance for different types of operations

The dropdown menues lets the user select suites and groups of benchmark to be highlighted in the scatterchart and table



This project was started from a create-react-app

A small python notebook exists in the src/data folder where some pre-processing and formatting of the inputs were done. 