const router = require('express').Router();
const Twitter = require('twitter');
const path = require('path');
const moment = require('moment');
const keys = require('../config');

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
            let myTweets = [];
            // only return the data that we need
            tweets.map(val => {
                myTweets.push({
                    time: moment(val.created_at).fromNow(),
                    tweet: val.text,
                    name: val.user.name,
                    screenName: val.user.screen_name,
                    reTweetCount: val.retweet_count,
                    favoriteCount: val.favorite_count,
                    profilePic: val.user.profile_image_url,
                    friendCount: val.user.friends_count
                })
            });
            return myTweets;
        })
        .catch(err => console.error(err));
};

const getFriends = () => {
    return client.get('friends/list', queryParams)
        .then((friends) => {
            return friends.users;
        })
        .catch(err => console.error(err));
};

const getMessages = () => {
    return client.get('direct_messages', queryParams)
        .then((messages) => {
            let directMessages = [];
            // only return the data that we need
            messages.map(val => {
                directMessages.push({
                    messageTime: moment(val.created_at).fromNow(),
                    messageText: val.text,
                    senderProfilePic: val.sender.profile_image_url,
                    senderScreenName: val.sender.screen_name,
                    recipientProfilePic: val.recipient.profile_image_url,
                    recipientMessageTime: moment(val.recipient.created_at).format('YYYY MM Do, h:mm:ss a')
                });
            });
            return directMessages;
        })
        .catch(err => console.error(err));
};

router.get('/', (req, res) => {
    // Make sure all promises resolve, then pass that 
    // chunked data to the PUG template
    Promise.all([getTweets(), getFriends(), getMessages()])
    .then(data => {
        res.render(path.join('../views', 'index'), { data, moment });
    })
    .catch(err => console.log('Promise.all error: ', err));
});

module.exports = router;