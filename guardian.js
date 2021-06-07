/* 
Sample showing use of Guardian api with paging of data.

See here for details:
https://open-platform.theguardian.com/documentation/
*/

// Load the modules we need
const axios = require('axios');                     // for sending web requests
const secret = require("./secret")
const api_helper = require("./api-helper")

// Create a new csv
api_helper.initialiseCsv()

// Call the API to retrieve the first page
CallPagedApi(1)

// Function to call the Guardian API
async function CallPagedApi(pageNo) {

  // Build the search URL.  See the api documentation for details of what's allowed
  url = new URL("https://content.guardianapis.com/search")
  url.searchParams.append("q", "olympic+games")
  url.searchParams.append("page-size", "50")
  url.searchParams.append("page", pageNo)
  url.searchParams.append("from-date", "2021-05-26")
  url.searchParams.append("api-key", secret.guardian_api_key)

  // Submit the URL and get the response
  await axios.get(url.href).then(response => {

      // Get the api's response
      data = response.data
      console.log("Page " + pageNo + " of " + data.response.pages + " pages")

      // Store the data found to the csv, filtering for the info we want
      api_helper.storeCsv(data.response.results, filter)

      // Do we want more pages?  If so, call the URL again with the next page number
      maxPages = 3
      if (pageNo < data.response.pages && pageNo<maxPages) {
          // Get the next page
          return CallPagedApi(++pageNo);
      }
  });
}

// Function to filter for the info we want from the response
function filter(item) {
  // Create a new object for this item
  newElement = {}                               

  // Add fields you want from the response.  Refer to the API documentation for details
  newElement.sectionName = item.sectionName 
  newElement.webTitle = item.webTitle 

  // Return the object
  return newElement                             
}
