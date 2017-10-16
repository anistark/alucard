/**
 * Created by Anirudha.
 * Helper File
 * Write additional functions to be used in Project here.
 *
 */

var request = require('request');
var helpers = require('./helpers');
//var constants = require('./constants');
// import waterfall from 'async/waterfall';
var async = require('async');
var config = require('../config');

var githubAuthKeyString = '?client_id='+config.github.githubAPIClientId+'&client_secret='+config.github.githubAPIClientSecret

exports.getGithubUserData = function(username, cb) {
    //console.log('In getGithubUserData for=>',username);
    try {
        request({
            uri: 'https://api.github.com/users/'+username+githubAuthKeyString,
            method: 'GET',
            headers: {
                'User-Agent': 'request'
            }
        }, function (error, response, body) {
            if(error) {
                cb(error);
            }
            else {
                body = JSON.parse(body)
                // console.log('repos_url:', body['repos_url']);
                var getUrlRequestData = {
                    'url': body['repos_url'],
                    'totalRepoCount': body['public_repos']
                }
                helpers.getRepoData(getUrlRequestData, function (err, repoData) {
                    if(err) {
                        console.log('getUrlData res ERR',err);
                    }
                    else {
                        // console.log(repoData);
                        body['repoData'] = repoData;
                        helpers.getRandomColor(repoData.length, function (err, randomColors) {
                            if(err) {
                                console.log('getRandomColor res ERR',err);
                            }
                            else {
                                // console.log(repoData);
                                body['randomColors'] = randomColors;
                            }
                            cb(null, body);
                        });
                    }
                });
            }
        });
    } catch (e) {
        console.log('Exception caught in getGithubUserData');
        cb(e);
    }
};


exports.getRepoData = function(data, cb) {
    try {
        var maxPage = Math.ceil(data['totalRepoCount']/30);
        var repoLanguages = {};
        async.times(maxPage, function(n, next) {
            // createUser(n, function(err, user) {
            //     next(err, user);
            // });
            let p = n+1
            request({
                uri: data['url']+githubAuthKeyString+'&page='+p,
                method: 'GET',
                headers: {
                    'User-Agent': 'request'
                }
            }, function (error, response, body) {
                if(error) {
                    next(error);
                }
                else {
                    body = JSON.parse(body);
                    for (var i = 0, len = body.length; i < len; i++) {
                        // console.log('name:', body[i]['name'], '| url:', body[i]['html_url'], 'language:', body[i]['language']);
                        // console.log('=-===--==-==--==');
                        if (repoLanguages.hasOwnProperty(body[i]['language'])) {
                            repoLanguages[body[i]['language']] = repoLanguages[body[i]['language']]+1
                        }
                        else {
                            repoLanguages[body[i]['language']] = 1
                        }
                    }
                    next(null, repoLanguages);
                }
            });
        }, function(err, repos) {
            var allRepoLangs = repos[0];
            // console.log('allRepoLangs', allRepoLangs, 'allRepoLangs length', Object.keys(allRepoLangs).length)
            var allRepoLangStructured = []
            for (allRepoLang in allRepoLangs) {
                // console.log('allRepoLang', allRepoLang, allRepoLangs[allRepoLang]);
                if (allRepoLang == 'null') {
                    allRepoLangStructured.push({
                        'label': 'UnDetermined',
                        'value': allRepoLangs[allRepoLang]
                    })
                }
                else {
                    allRepoLangStructured.push({
                        'label': allRepoLang,
                        'value': allRepoLangs[allRepoLang]
                    })
                }
            }
            cb(null, allRepoLangStructured);
        });
    } catch (e) {
        console.log('Exception caught in getUrlData');
        cb(e)
    }
};


exports.getRandomColor = function(n, cb) {
    var colors = []
    for (var x = 0; x < n; x++) {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        colors.push(color);
    }
    cb(null, colors);
}
