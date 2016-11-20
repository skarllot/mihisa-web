'use strict';

var firebase = require('firebase/app');
require("firebase/auth");
//require("firebase/database");
//require("firebase/storage");

// Initialize Firebase
var config = require('./config.json');
var app = firebase.initializeApp(config);

module.exports = firebase;
