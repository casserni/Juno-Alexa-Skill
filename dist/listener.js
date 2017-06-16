'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _botkit = require('botkit');

var _botkit2 = _interopRequireDefault(_botkit);

var _alexaBotkit = require('alexa-botkit');

var _alexaBotkit2 = _interopRequireDefault(_alexaBotkit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { uTu, constants } from 'utu';

// tag utu constants to app environment
// const utu = new uTu(process.env.UTU_SECRET, {
//   platform: constants.ALEXA,
//   appId: process.env.ALEXA_APPID,
// });

// define ears for Alexa
var ears = (0, _alexaBotkit2.default)({
  debug: true
});

// give alexa the tools to listen and communicate to the outside world
var earBuds = ears.spawn({});

// start listening to your Alexa ears!
ears.setupWebserver(process.env.PORT, function (err, webserver) {
  ears.createWebhookEndpoints(webserver, earBuds, function () {
    console.log(webserver);
    console.log('ONLINE! ' + process.env.PORT);
  });
});

// creating a middleware that adds the utu context to each incoming request
ears.middleware.receive.use(function (bot, message, next) {
  // instrument each message to have utu within the scope of each incoming message
  // message.utu = utu.withContext(
  //   {
  //     platformId: message.user,
  //     sessionId: message.alexa.getSessionId(),
  //   }
  // );

  // on any message that comes through send the message to utu
  // message.utu.message({
  //   values: {
  //     message: message.alexa.getIntentName(),
  //     rawMessage: message.alexa,
  //     botMessage: false,
  //   }
  // });

  if (!message.response.req.headers.signaturecertchainurl) {
    return next();
  }

  // Mark the request body as already having been parsed so it's ignored by // other body parser middlewares.
  message.response.req._body = true;
  message.response.req.rawBody = '';
  message.response.req.on('data', function (data) {
    return message.response.req.rawBody += data;
  });
  message.response.req.on('end', function () {
    var cert_url, er, error, requestBody, signature;
    try {
      message.response.req.body = JSON.parse(message.response.req.rawBody);
    } catch (error) {
      er = error;
      message.response.req.body = {};
    }
    cert_url = message.response.req.headers.signaturecertchainurl;
    signature = message.response.req.headers.signature;
    requestBody = message.response.req.rawBody;
    verifier(cert_url, signature, requestBody, function (er) {
      if (er) {
        console.error('error validating the alexa cert:', er);
        message.response.req.res.status(401).json({ status: 'failure', reason: er });
      } else {
        next();
      }
    });
  });
  next();
});

ears.middleware.send.use(function (bot, message, next) {
  // on any outgoing message log the message being sent back to the user
  // message.src.utu.message({
  //   values: {
  //     message: message.resp.state.response.outputSpeech.text,
  //     rawMessage: message.resp,
  //     botMessage: true,
  //   }
  // });
  next();
});

exports.default = ears;