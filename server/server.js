const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/symbol', (req, res) => {
  const company = req.body.company;

  const url = `http://d.yimg.com/autoc.finance.yahoo.com/autoc?query=${company}&region=1&lang=en`
  fetch(url)
  .then(res => res.json())
  .then(json => {
    res.send(json);
  })
})

app.listen(port, () => console.log(`Listening on port ${port}`));
