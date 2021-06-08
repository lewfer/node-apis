# API calls samples

Some examples showing how to use various APIs.

You will need to download node.js to run these:

https://nodejs.org/en/download/

I suggest you also install Visual Studio Code:

https://code.visualstudio.com/

Then open the directory containing these files.

From there, start a Terminal window in Visual Studio Code and initialise the modules we need:

    npm install axios
    npm install objects-to-csv

To customise each sample, edit the corresponing .js file.

You will need to enter your API keys in a file called secret.js.  There is a template for this called secret_template.js.  Just rename that to secret.js and enter your API keys.


# Open Weather Map

Simple API call returning all data and outputting to csv

To run this sample enter the following in a terminal window:

    node openweathermap.js

# Guardian

API call returning multiple pages of data and outputting to csv

To run this sample enter the following in a terminal window:

    node guardian.js

# New York Times

API call returning multiple pages of data and outputting to csv

To run this sample enter the following in a terminal window:

    node new-york-times.js

# Twitter

API call returning timeline from Twitter

You need to install the Twitter module first:

    npm install

To run this sample enter the following in a terminal window:

    node twitter.js

