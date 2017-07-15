const express = require('express');
const path = require('path');

module.exports = function(app) {
  var controller = require('./controller.js');
  // serve static assets normally
  app.use(express.static(__dirname + '/'));

  app.use((req, res, next) => {
    var origin = req.hostname;
    var secure = req.secure ? 'https' : 'http';
    var allowedOrigins = [
      'localhost:3000',
      'myxx.znewton.xyz']
    var accessHeader = '';
    if (allowedOrigins.indexOf(origin) > -1) {
      accessHeader = secure + '://' + origin;
    }
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', accessHeader);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    next();
  })
  // Routes
  app.route('/')
    .get((req, res) => {
      res.sendFile(path.resolve(__dirname, '/', 'index.html'))
    })
  app.route('/channels')
    .get(controller.get_channels_by_search);

  app.route('/playlists/:channelId')
    .get(controller.get_channel_playlists);

  app.route('/mix')
    .get(controller.get_mix);
};
