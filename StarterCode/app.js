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

// Function to build Bar Chart
function buildBarChart(sample) {
    // Use D3 to retrieve all of data
    d3.json(url).then((data) => {
