const ps  = require('python-shell');

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

  let yahoo = fetch(`http://d.yimg.com/autoc.finance.yahoo.com/autoc?query=${company}&region=1&lang=en`)
    .then(res => res.json())
    .then(json => {
      let alphaVantage = fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${json.ResultSet.Result[0].symbol}&outputsize=compact&apikey=E38O55LQ9PF702VN`)
        .then(res => res.json())
        .then(prices => {
          res.send(prices);
        });
    });

});

app.post('/api/pastNews', (req, res) => {
  const company = req.body.company;
  const day = req.body.day;
  console.log(day);
  let options = {
    args: [company, day],
  };

  ps.PythonShell.run('news.py', options, function (err, results) {
    if (err) throw err;

    console.log('results: %j', results)
  })
})


app.listen(port, () => console.log(`Listening on port ${port}`));
