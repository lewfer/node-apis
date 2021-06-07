/* 
Sample showing use of New York Times api with paging of data.

See here for details:
https://developer.nytimes.com/docs/articlesearch-product/1/overview
*/

// Load the modules we need
const axios = require('axios');                     // for sending web requests
const secret = require("./secret")
const api_helper = require("./api-helper")

// Create a new csv
api_helper.initialiseCsv()

// Call the API to retrieve the first page
CallPagedApi(0)

// Function to call the NYT API
async function CallPagedApi(pageNo) {

  // Build the search URL.  See the api documentation for details of what's allowed
  url = new URL("https://api.nytimes.com/svc/search/v2/articlesearch.json")
  url.searchParams.append("q", "olympic+games")
  url.searchParams.append("page", pageNo)
  url.searchParams.append("api-key", secret.new_york_times_api_key)

  // Submit the URL and get the response
  await axios.get(url.href).then(response => {

      // Get the api's response
      data = response.data
      offset = data.response.meta.offset
      hits = data.response.meta.hits
      console.log("Items " + offset + "+ of " + hits + " results")

      // Store the data found in the csv
      api_helper.storeCsv(data.response.docs, filter)

      // Do we want more pages?  If so, call the URL again with the next page number
      maxPages = 3
      if (offset < hits && pageNo<maxPages) {
          // Get the next page
          return CallPagedApi(++pageNo);
      }
  });
}

// Function to filter for the elements we want from the response
function filter(item) {
  // Create a new object
  newElement = {}                               

  // Add fields you want from the response.  Refer to the API documentation for details
  newElement.abstract = item.abstract 
  newElement.web_url = item.web_url 
  newElement.pub_date = item.pub_date

  // Return the object
  return newElement                             
}
