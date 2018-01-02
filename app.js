const Twitter = require('twitter');
const keys = require('./config');

const client = new Twitter({
    consumer_key: keys.consumerKey,
    consumer_secret: keys.consumerSecret,
    access_token_key: keys.accessToken,
    access_token_secret: keys.accessTokenSecret,
});

const queryParams = {
    count: 5,
    screen_name: 'dwdewul'
}

client.get('statuses/user_timeline', queryParams, (error, tweets, res) => {
    if (error) {
        console.error(error);
        throw error;
    }
    tweets.map((val) => {
        console.log(val.text);
    });
});

client.get('friends/list', queryParams, (error, friends, res) => {
    if (error) {
        console.error(error);
        throw error;
    }
    friends.users.map((val) => {
        console.log(val.name);
    });
});

client.get('direct_messages', queryParams, (error, messages, res) => {
    if (error) {
        console.error(error);
        throw error;
    }
    messages.map((val) => {
        console.log(val.text);
    });
});
