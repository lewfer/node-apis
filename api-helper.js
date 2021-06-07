/*
 Some helper functions to make coding a bit easier 
*/
const fs = require('fs');                           // for writing to a file
const ObjectsToCsv = require('objects-to-csv');     // for converting Json objects to csv

// Flag to indicate we are at the first page (so we dump out the column headers)
firstPage = true

module.exports = {
  initialiseCsv: function() {
        // Clear the output file
        fs.writeFile('data.csv', "", function(err) {});

  },

  // Function to store the data to the csv file
  storeCsv: async function (data, filter) {
    console.log("Found " + data.length + " rows")
  
    // Build up the objects we want to save, using the filter function to select the columns we want
    objects = []
    data.forEach(element => objects.push(filter(element))) 
  
    // Get a array of json objects from the results
    const csv = new ObjectsToCsv(objects)
  
    // Convert the array of json objects to a csv object
    csvString = await csv.toString()
  
    // If this is not the first page of results, strip off the first line, which is the column headings
    if (firstPage)
      firstPage = false
    else
      csvString = csvString.substring(csvString.indexOf("\n")+1) // strip off first line
  
    // Append the results to the output file
    fs.appendFile('data.csv', csvString, function(err) {});
  }
}