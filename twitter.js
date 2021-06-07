/* 
Sample showing use of Twitter api

See here for details:
https://www.npmjs.com/package/twitter
*/

var Twitter = require('twitter');
const secret = require("./secret")
const api_helper = require("./api-helper")

// Create a new csv
api_helper.initialiseCsv()

// Call the API to retrieve the data
CallApi()

async function CallApi() {
    var client = new Twitter({
    consumer_key: secret.twitter_consumer_key,
    consumer_secret: secret.twitter_consumer_secret,
    access_token_key: secret.twitter_access_token_key,
    access_token_secret: secret.twitter_access_token_secret
    });
    
    var params = {screen_name: 'nodejs'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
        // Store the data found to the csv, filtering for the info we want
        api_helper.storeCsv(tweets, filter)        
    }
    else {
        console.log(error)
    }
    });
}

// Function to filter for the info we want from the response
function filter(item) {
    // Create a new object for this item
    newElement = {}                                         
  
    // Add fields you want from the response.  Refer to the API documentation for details
    newElement.created_at = item.created_at                            
    newElement.text = item.text 

    // Extract the hash tags
    hashtags = ""
    ht = item.entities.hashtags
    for (i=0; i<ht.length; ht++) {
        hashtags = hashtags + "," + ht[i].text
    }
    newElement.hashtags = hashtags  
  
      // Return the object
    return newElement                                       // return the object
  }
  