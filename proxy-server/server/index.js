var newrelic = require('newrelic');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');


const app = express();
app.use(morgan('tiny'));

const rewardsServiceRoute =
  'http://3.22.245.147:3005';

const proxyRouter = {
  '/api/banner': 'http://18.215.78.52:3002',
  '/api/video': 'http://18.215.78.52:3002',
  '/updates': 'http://18.219.117.44:3001',
  '/comment': 'http://18.219.117.44:3001',
  '/api/story': 'http://13.209.208.249:3003',
  '/api/risksandchallenges': 'http://13.209.208.249:3003',
  '/api/environmentalcommitments': 'http://13.209.208.249:3003',
  '/api/projects': rewardsServiceRoute,
  '/api/rewards': rewardsServiceRoute,
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
