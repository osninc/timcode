const express = require('express');
const path = require('path');
const middleware = require('./middleware');

module.exports = {
  initlializeRoutes: (app) => {
    /* Client side: api data */

    app.post('/api', middleware.proxyApi);

    const root = path.join(path.dirname(__dirname), 'dist')

    app.use('/', express.static(root))
  }
}
