//Belly Button Biodiversity Dashboard
document.body.style.backgroundColor = 'white';

// Store constant URL variable 
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

// Console log promise for debug purposes
const dataPromise = d3.json(url)
console.log("Data Promise: ", dataPromise)

// Fetch JSON data and Console log it
d3.json(url).then(function(data) {
    console.log(data);
});

// Initialize 
function init() {

    // Use D3 to select dropdownMenu
    let dropdownMenu = d3.select("#selDataset");
    
    // Use D3 to retrieve sample names & populate drowdown selector
    d3.json(url).then((data) => {

        // Set variable for sample names
        let names = data.names;

        // Add samples to dropdownMenu
        names.forEach(id) => {
            
            // Log value of id for each iteration of loop
            console.log(id);

            dropdownMenu.append("option").text(id).property("value", id);
        });

        // Set first entry from data list
        let firstEntry = names[0];

        // Log value of firstEntry
        console.log(firstEntry);

        //Build initial plots
        buildMetadata(firstEntry);
        buildBarChart(firstEntry);
        buildBubbleChart(firstEntry);
    });
};

// Function to populate Metadata 
function buildMetadata(sample) {

    // Use D3 to retrieve all of data
    d3.json(url).then((data) => {

        // Retrieve all metadata
        let metadata = data.metadata;

        // Filter metadata for sample ID
        let value = metadata.filter(result => result.id == sample);
        console.log(value)

        // Retrieve first index from array
        let valueData = value[0];

        // Clear out metadata
        d3.select("#sample-metadata").html("");

        // Use Object.entries to append each key & value pair to the panel
        Object.entries(valueData).forEach(([key, value]) => {
            console.log(key, value);
            d3.select("#sample-metadata").append("h5").text(`${key.toUpperCase()}: ${value}`);
        });
    });
};

// Function to build BarChart
function buildBarChart(sample) {
    // Use D3 to retrieve all of data
    d3.json(url).then((data) => {

        // Set variables for data
        let samplesInfo = data.samples;
        let value = samplesInfo.filter(result => result.id == sample);
        let valueData = value[0];
        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_labels;
        let sample_values = valueData.sample_values;

        // Log data to console
        console.log(otu_ids, otu_labels, sample_values);

        // Set top ten items to display in descending order 
        let yticks = otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();
        let xticks = sample_values.slice(0, 10).reverse();
        let labels = otu_labels.slice(0, 10).reverse();

        // Set up trace for BarChart
        let trace = {
            x: xticks,
            y: yticks,
            text: labels,
            type: "bar",
            orientation: "h"
        };

        // Setup layout
        let layout = {
            title: "Top 10 OTUs Found",
            xaxis: {
                title: "Sample Values"
            },
            yaxis: {
                title: "OTU IDs"
            }
        };

        // Call Plotly to plot BarChart
        Plotly.newPlot("bar", [trace], layout);
    });
};

// Function to build BubbleChart
function buildBubbleChart(sample) {
    // Use D3 to retrieve all of data
    d3.json(url).then((data) => {
        // Set variables for data
        let samplesInfo = data.samples;
        let value = samplesInfo.filter(result => result.id == sample);
        let valueData = value[0];
        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_labels;
        let sample_values = valueData.sample_values;

        // Log data to console
        console.log(otu_ids, otu_labels, sample_values);

        // Set up trace for BubbleChart
        let trace = {
            x: otu_ids,
            y: sample_values,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            },
            text: otu_labels
        };

        // Setup layout
        let layout = {
            title: "Bacteria per Sample",
            hovermode: "closest",
            xaxis: {
                title: "OTU IDs"
            },
            yaxis: {
                title: "Sample Values"
            }
        };

        // Call Plotly to plot BubbleChart
        Plotly.newPlot("bubble", [trace1], layout);
    });
};

// Function update dashboard when sample changes
function optionChanged(value) {
    console.log(value);

    // Call all functions
    buildMetadata(value);
    buildBarChart(value);
    buildBubbleChart(value);
    buildGaugeChart(value);
};

// Call initialize function 
init();