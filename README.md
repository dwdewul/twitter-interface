# Twitter Interface

## About
This project uses calls to [Twitter's API](https://developer.twitter.com/en.html) and pulls down the following information for your profile:
* 5 most recent tweets
* 5 most recent friends
* 5 most recent direct messages

## How to use
1. Set up a developer account at [Twitter](https://apps.twitter.com/)
2. `git clone` this repo to your local machine
3. Create a config.js folder in the directory
⋅⋅1. The structure should look like this:
    ```
    module.exports = {
    consumerKey: 'gdghdgfdhfdhfdh',
    consumerSecret: 'hdfhrdhfdhfd',
    accessToken: 'dhdhdfhfdhgdfhtfh',
    accessTokenSecret: 'hgfhdtdsh'
    }
    ```
4. Add your consumer key, consumer secret, access token, and access token secret to the config.js
5. Run `npm install` and wait for the dependencies to install
6. Run `npm start`