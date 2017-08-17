var express = require('express');
var router = express.Router();
var models = require('../models/index');
var helpers = require('../helpers');


// Routes

router.get('/', function(req, res, next) {
    var git_data = {}
    if(Object.keys(req.query).length > 0) {
        if ('github_handle' in req.query) {
            console.log('github handle exists => ', req.query['github_handle']);
            //get github data for handle given
        }
    }
    res.render('pages/home', { title: 'Alucard', git_data: git_data });
});

module.exports = router;
