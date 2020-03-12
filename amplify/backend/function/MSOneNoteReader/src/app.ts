import * as express from 'express';
import * as bodyParser from "body-parser";
import * as awsServerlessExpressMiddleware from 'aws-serverless-express/middleware';

var app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

app.use(function (_req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/reader', function (req, res) {
  readerGet(req, res);
});

app.get('/reader/*', function (req, res) {
  readerGet(req, res);
});

function readerGet(req, res) {
  res.json({ success: 'get call succeed!', url: req.url });
}

app.listen(3000, function () {
  console.log("App started");
});

export default app;
