const express = require('express');
const pug = require('pug');
const path = require('path');
const bodyParser = require('body-parser');
const Twitter = require('twitter');
const keys = require('./config');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', './views');
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }));

// set up the twitter client object
const client = new Twitter({
    consumer_key: keys.consumerKey,
    consumer_secret: keys.consumerSecret,
    access_token_key: keys.accessToken,
    access_token_secret: keys.accessTokenSecret,
});

// query params for every API call
const queryParams = {
    count: 5,
    screen_name: 'dwdewul'
}

const getTweets = () => {
    return client.get('statuses/user_timeline', queryParams)
        .then((tweets) => {
            return tweets.map(val => val.text);
        })
        .catch(err => console.error(err));
};

const getFriends = () => {
    return client.get('friends/list', queryParams)
        .then((friends) => {
            return friends.users.map(val => val.name);
        })
        .catch(err => console.error(err));
};

const getMessages = () => {
    return client.get('direct_messages', queryParams)
        .then((messages) => {
            return messages.map(val => val.text);
        })
        .catch(err => console.error(err));
};

app.get('/', (req, res) => {
    Promise.all([getTweets(), getFriends(), getMessages()])
    .then(data => {
        res.render(path.join(__dirname, 'views', 'index'), { data });
    })
    .catch(err => console.log('Promise.all error: ', err));
});


const PORT = process.env.PORT || 3000;

app.listen(3000, () => {
    console.log(`Serving is running on port ${PORT}`);
})
