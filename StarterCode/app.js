// Store constant URL variable 
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

// Fetch JSON data and Console log it
d3.json(url).then(function(data) {
    console.log(data);
});

// Initialize 
function init() {

    // D3 to select dropdownMenu
    let dropdownMenu = d3.select("#selDataset");

     // Use D3 for dropdown selector
     d3.json(url).then((data) => {
        
        // Set variable for sample names
        let names = data.names;

        // Add samples to dropdownMenu
        names.forEach((id) => {

            // Log value of ID for each iteration of the loop
            console.log(id);

            dropdownMenu.append("option")
            .text(id)
            .property("value",id);
        });

        // Set first sample from list
        let first_sample = names[0];

        // Log value of sample_zero
        console.log(first_sample);

        // Build the initial plots
        buildMetadata(first_sample);
        buildBarChart(first_sample);
        buildBubbleChart(first_sample);
        buildGaugeChart(first_sample);

    });
};