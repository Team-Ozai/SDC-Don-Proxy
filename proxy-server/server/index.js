var newrelic = require('newrelic');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');


const app = express();
app.use(morgan('tiny'));

// const rewardsServiceRoute =
//   'http://ec2-3-133-92-215.us-east-2.compute.amazonaws.com:3005';

const proxyRouter = {
  // '/api/banner': 'http://localhost:3002',
  // '/api/video': 'http://localhost:3002',
  // '/api/update': 'http://localhost:3001',
  // '/api/comment': 'http://localhost:3001',
  '/api/story': 'http://15.164.34.94:3003',
  '/api/risksandchallenges': 'http://15.164.34.94:3003',
  '/api/environmentalcommitments': 'http://15.164.34.94:3003',
  // '/api/projects': rewardsServiceRoute,
  // '/api/rewards': rewardsServiceRoute,
};

app.use(express.static(path.join(__dirname, '../dist')));

app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

app.use(
  createProxyMiddleware({
    target: '/:id',
    router: proxyRouter,
    changeOrigin: true,
    prependPath: false,
  })
);

app.listen(4000, () => {
  console.log('Proxy Server is listening on port 4000');
});
