'use strict';

var BPromise = require('bluebird');
var fb = require('fb');

var fbApi = BPromise.promisify(fb.napi, fb);

function friends(accessToken) {
    return fbApi('me/friends', {
        fields: 'name,picture,birthday',
        limit: 2000,
        access_token: accessToken
    });
}

function invitableFriends(accessToken) {
    return fbApi('me/invitable_friends', {
        fields: 'name,picture,birthday',
        limit: 2000,
        access_token: accessToken
    });
}

module.exports = {
    friends: friends,
    invitableFriends: invitableFriends
};