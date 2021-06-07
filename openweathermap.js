/* 
Sample showing use of OpenWeatherMap api 

See here for details:
https://openweathermap.org/api/one-call-api
*/

// Load the modules we need
const axios = require('axios');                     // for sending web requests
const secret = require("./secret")
const api_helper = require("./api-helper")

// Create a new csv
api_helper.initialiseCsv()

// Call the API to retrieve the data
CallApi()

// Function to call the OpenWeatherMap API
async function CallApi() {

  // Build the search URL.  See the api documentation for details of what's allowed
  url = new URL("http://api.openweathermap.org/data/2.5/onecall")
  url.searchParams.append("lon", "-0.1278")
  url.searchParams.append("lat", "51.5074")
  url.searchParams.append("appid", secret.openweathermap_api_key)
  console.log(url.href)

  // Submit the URL and get the response
  await axios.get(url.href).then(response => {
      // Get the api's response
      data = response.data

      // Store the data found to the csv, filtering for the info we want
      api_helper.storeCsv(data.hourly, filter)
  });
}

// Function to filter for the info we want from the response
function filter(item) {
  // Create a new object for this item
  newElement = {}                                         

  // Add fields you want from the response.  Refer to the API documentation for details
  newElement.time = item.dt                            
  newElement.temp = item.temp 
  newElement.pressure = item.pressure  
  newElement.humidity = item.humidity 
  newElement.description = item.weather[0].description 

    // Return the object
  return newElement                                       // return the object
}
