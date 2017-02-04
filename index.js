//get all the libraries
var express = require('express');
var app = express();
var OAuth = require('oauth');
var Nexmo = require('nexmo');
var OAuth = require("oauth")
//define some constants
var consumerKey = 'consumerKey';
var consumerSecret = 'consumerSecret';
var token = 'token';
var tokenSecret = 'tokenSecret';
var apiKey = 'apiKey';
var apiSecret = 'apiSecret';
var virtualNumber = '011-122-133';
var port = 8090;

//any string you would like to match on
var matchStrings = [];

var oauth = new OAuth.OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    consumerKey,
    consumerSecret,
    '1.0A',
    null,
    'HMAC-SHA1'
);

function doget() {
    oauth.get(
        'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=_&include_rts=false', token, //test user token
        tokenSecret,
        function (e, data, res) {
            if (e) {
                console.error(e);
            }
            else {
                var d = JSON.parse(data);
                d.forEach(function (entry) {
                    if (entry.in_reply_to_screen_name == null) {
                        if (res != null) {
                            nexmo.message.sendSms(
                                VIRTUAL_NUMBER, VIRTUAL_NUMBER,  entry.text ,
                                function (err, responseData) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        console.dir(responseData);
                                    }
                                }
                            );
                        }
                    }
                })
            }
            // done();
        });
}


setInterval(doget, 1800000 /*30 minutes for now */);

var nexmo = new Nexmo({
    apiKey: API_KEY,
    apiSecret: API_SECRET
});

var server = app.listen(port, '127.0.0.1', function () {

    var host = server.address().address
    var port = server.address().port

    console.log("listening http://%s:%s", host, port)

});

