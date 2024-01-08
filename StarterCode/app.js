// Create a variable to store the URL of the JSON file
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

// JSON Data & console log it 
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
        let sample_ids = data.names;
        console.log(sample_ids);
            for (id of sample_ids) {
                dropdownMenu.append("option").attr("value", id).text(id);
            };

        // Set first entry from data list
        let firstEntry = sample_ids[0];
        console.log(firstEntry);

        // Build initial plots
        buildBarChart(firstEntry);
        buildBubbleChart(firstEntry);   
        buildMetadata(firstEntry);
    });
};

// Function to build BarChart
function buildBarChart(sample) {
    // Use D3 to retrieve all of data
    d3.json(url).then((data) => {

        // Set variables for data
        let sample_data = data.samples;
        let results = sample_data.filter(id => id.id == sample);
        let firstResult = results[0];
        console.log(firstResult);

        // Store first 10 results to display in bar chart 
        let sample_values = results[0].sample_values;
        let otu_ids = firstResult.otu_ids.slice(0, 10);
        let otu_labels = firstResult.otu_labels.slice(0, 10);
        console.log(sample_values);
        console.log(otu_ids);
        console.log(otu_labels);

        // Set up trace for BarChart
        let barTrace = {
            x: sample_values.slice(0, 10).reverse(),
            y: otu_ids.map(id => `OTU ${id}`).reverse(),
            text: otu_labels.reverse(),
            type: "bar",
            orientation: "h"
        };

        // Set up layout for BarChart
        let layout = {
            title: "Top 10 OTU's Found",
            xaxis: {
                title: "Sample Values"
            },
            yaxis: {
                title: "OTU ID"
            }
        };

        // Call Plotly to plot BarChart
        Plotly.newPlot("bar", [BarTrace], layout);
    });
};

// Function to build BubbleChart
function buildbubbleChart(sample) {
    // Use D3 to retrieve all of data
    d3.json(url).then((data) => {

        // Set variables for data
        let sample_data = data.samples;
        let results = sample_data.filter(id => id.id == sample);
        let firstResult = results[0];
        console.log(firstResult);
        // Store results to display in bubbleChart
        let sample_values = firstResult.sample_values;
        let otu_ids = firstResult.otu_ids;
        let otu_labels = firstResult.otu_labels;
        console.log(sample_values);
        console.log(otu_ids);
        console.log(otu_labels);

        // Set up trace for bubbleChart
        let bubbleTrace = {
            x: otu_ids.reverse(),
            y: sample_values.reverse(),
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            },
            text: otu_labels
        };
        // Set up layout for BubbleChart
        let layout = {
            title: "Bacteria Count per Sample ID",
            showlegend: false,
            hovermode: "closest",
            xaxis: {
                title: "OTU IDs"
            },
            yaxis: {
                title: "Bacteria Count"
            }
        };

        // Call Plotly to plot BubbleChart
        Plotly.newPlot("bubble", [bubbleTrace], layout);
    });
};

// Create demographic info function to populate each sample's information
function buildDemographics(sample) {
    d3.json(url).then((data) => {
        let demographics = data.metadata;
        let results = demographics.filter(id => id.id == sample);
        let firstResult = results[0];
        console.log(firstResult);
        d3.select('#sample-metadata').text('');
        Object.entries(firstResult).forEach(([key, value]) => {
            console.log(key, value);
            d3.select('#sample-metadata').append('h3').text(`${key}: ${value}`);
    });

    });
};
// Function update dashboard when sample changes
function optionChanged(value) {
    console.log(value);

    // Call all functions
    buildBarChart(value);
    buildBubbleChart(value);
    buildMetadata(value);
};

// Initialize dashboard
init();

