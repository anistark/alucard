/**
 * Created by Anirudha.
 * Helper File
 * Write additional functions to be used in Project here.
 *
 */

var request = require('request');
//var constants = require('./constants');

exports.getGithubUserData = function(username, cb) {
    //console.log('In getGithubUserData for=>',username);
    var url = 'https://api.github.com/users/'+username;
    //console.log(url);
    request({
        uri: url,
        method: 'GET',
        headers: {
            'User-Agent': 'request'
        }
    }, function (error, response, body) {
        if(error) {
            cb(error);
        }
        else {
            //console.log(body);
            cb(null, body);
        }
    });
};
