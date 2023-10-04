// Use d3 library to read the json data and log it inside the console
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

d3.json(url).then(function(data){
    console.log(data);
});

// Create a function to initialize the dashboard and create dropdown using names from json
function init(){
    // Select the dropdown menu
    let dropMenu = d3.select("#selDataset");

    d3.json(url).then((data) => {
        let sampleNames = data.names;

        // For loop to loop through all names and add to dropdown
        for (let i = 0; i< sampleNames.length; i++){

            dropMenu.append("option")
            .text(sampleNames[i])
            .property("value", sampleNames[i]);
        };

        // Select first sample from list and log the value
        let sampleOne = sampleNames[0];
        console.log(sampleOne);

        // Inital Plots
        buildBarChart(sampleOne);
        buildBubbleChart(sampleOne);
        buildMetaData(sampleOne);
});


















