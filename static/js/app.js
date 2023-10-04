// Use d3 library to read the json data and log it inside the console
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Grab json data and load into console
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
        buildMD(sampleOne);
        buildBarChart(sampleOne);
        buildBubbleChart(sampleOne);
        
    })};

// Show the Metadata info from json
function buildMD(sample) {

    // retrieve all the metadata
    d3.json(url).then((data) => {

        let MD = data.metadata;
        let values = metadata.filter(result => result.id == sample)
        console.log(values);

        let valuesData = values[0];

        d3.select("#sample-metadata").html("");

        Object.entries(valuesData).forEach(([key,value]) => {

            // Log the individual key/value pairs as they are being appended to the metadata panel
            console.log(key,value);

            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });

};

// Build the bar chart
function buildBarChart(sample) {
    d3.json(url).then((data) => {

    })
}