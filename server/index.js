const express = require('express');
var cors = require('cors');
const axios = require('axios');

const {hapikey} = require('./config')

const serverhapikey = process.env.hapikey || hapikey;

const app = express();

app.use(cors());

app.get('/blogs/v3/topics', (req, res) => {
    axios.get(`https://api.hubapi.com/blogs/v3/topics?hapikey=${serverhapikey}`, { params: req.query})
      .then(response => {
        const responseJson = JSON.stringify(response.data);
        res.status(200).send(responseJson);
      })
      .catch(error => {
        console.log({ error: error.response.statusText});
        res.status(error.response.status).send({ error: error.response.statusText});
      });
});

const server = app.listen(process.env.PORT || 8080, () => {
  const port = server.address().port;
  console.log(`App listening on port ${port}`);
});