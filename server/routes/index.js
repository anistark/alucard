var express = require('express');
var router = express.Router();
var models = require('../models/index');
var helpers = require('../helpers');


// Routes

router.get('/', function(req, res, next) {
    var git_data = {};
    if(Object.keys(req.query).length > 0) {
        if ('github_handle' in req.query) {
            console.log('github handle exists => ', req.query['github_handle']);
            if (req.query['github_handle'].length > 0) {
                //get github data for handle given
                git_data.client = 'github';
                git_data.username = req.query['github_handle'];
                helpers.getGithubUserData(req.query['github_handle'], function (err, gitData) {
                    if(err) {
                        console.log('ERR',err);
                    }
                    else {
                        git_data.data = JSON.parse(gitData);
                    }
                    res.render('pages/home', { title: 'Alucard | @'+req.query['github_handle'], git_data: git_data });
                })
            }
            else {
                res.render('pages/home', { title: 'Alucard', git_data: git_data });
            }
        }
        else {
            res.render('pages/home', { title: 'Alucard', git_data: git_data });
        }
    }
    else {
        res.render('pages/home', { title: 'Alucard', git_data: git_data });
    }
});

module.exports = router;
