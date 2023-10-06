// Use d3 library to read the json data and log it inside the console
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"


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

init()

// Show the Metadata info from json
function buildMD(sample) {

    // retrieve all the metadata
    d3.json(url).then((data) => {

        let MD = data.metadata;
        let values = MD.filter(result => result.id == sample)
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
function buildBarChart(sampleId) {
    d3.json(url).then((data) => {
        let sample = data.samples 
        let values = sample.filter(result => result.id == sampleId)
        let valuesData = values[0]
        console.log(valuesData)

        let otu_ids = valuesData.otu_ids
        let otu_labels = valuesData.otu_labels
        let sample_values = valuesData.sample_values

        let trace = [{
            x: sample_values.slice(0,10).reverse(),
            y: otu_ids.slice(0,10).map(otu_id => "OTU " + otu_id).reverse(),
            text: otu_labels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h"

        }]

        let layout = {
            title: "Top 10 OTUs per ID",
            xaxis: {title: "Amount of each OTU"},
            yaxis: {title: "OTUs"}
        }

        Plotly.newPlot("bar", trace, layout)
    })
}

// Build the bubble chart
function buildBubbleChart(sampleId) {
    d3.json(url).then((data) => {
        let sample = data.samples 
        let values = sample.filter(result => result.id == sampleId)
        let valuesData = values[0]
        console.log(valuesData)

        let otu_ids = valuesData.otu_ids
        let otu_labels = valuesData.otu_labels
        let sample_values = valuesData.sample_values

        let trace = [{
            x: sample_values,
            y: otu_ids,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }

        }]

        let layout = {
            xaxis: {title: "OTU ID"}
        }

        Plotly.newPlot("bubble", trace, layout)
    })
}

function optionChanged(newSample){
    buildMD(newSample);
    buildBarChart(newSample);
    buildBubbleChart(newSample);
}