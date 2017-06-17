'use strict';

var _alexaResponse = require('alexa-response');

var _alexaResponse2 = _interopRequireDefault(_alexaResponse);

var _listener = require('./listener');

var _listener2 = _interopRequireDefault(_listener);

var _service = require('./service');

var _nlp = require('./nlp');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_listener2.default.on('message_received', function (bot, message) {
  if (message.alexa.session.application.applicationId !== process.env.ALEXA_APPID) {
    bot.reply(message, _alexaResponse2.default.fail('Invalid applicationId: ' + message.alexa.session.application.applicationId).shouldEndSession(true));
  }
});

_listener2.default.hears(_nlp.SYSTEM.LAUNCH.intents, ['message_received'], function (bot, message) {
  bot.reply(message, _alexaResponse2.default.say(_nlp.SYSTEM.LAUNCH.responses.greeting).reprompt(_nlp.SYSTEM.HELP.responses.help).shouldEndSession(false));
  // message.utu.event("Session Launch");
});

_listener2.default.hears(_nlp.SYSTEM.START.intents, ['message_received'], function (bot, message) {
  bot.reply(message, _alexaResponse2.default.say(_nlp.SYSTEM.START.responses.greeting).reprompt(_nlp.SYSTEM.HELP.responses.help).shouldEndSession(false));
  // message.utu.event("Session Start");
});

_listener2.default.hears(_nlp.ALL.ALL_CURRENCIES.intents, ['message_received'], function (bot, message) {
  (0, _service.getNames)();
  bot.reply(message, _alexaResponse2.default.say('Supported currencies are as follows ' + (0, _service.getNames)().join(', ')).shouldEndSession(true));
  // message.utu.event("All Currencies");
});

_listener2.default.hears(_nlp.CLIPS.RATES.intents, ['message_received'], function (bot, message) {
  var currency = message.alexa.getSlotValue('CURRENCY');
  if (currency) {
    if (_nlp.CLIPS.slotTypes.CURRENCIES.indexOf(currency.toLowerCase()) > 0) {
      (0, _service.getRateByCurrency)(currency).then(function (res) {
        bot.reply(message, _alexaResponse2.default.say('One US Dollar is equivalent to ' + res + ' ' + currency).shouldEndSession(true));
      });
      // message.utu.event("Rate by Currency", {
      //   values: {
      //     "Currency": currency,
      //   }
      // });
    } else {
      bot.reply(message, _alexaResponse2.default.ask('Sorry, but ' + currency + ' is not supported.  Please try again.').reprompt(_nlp.SYSTEM.HELP.responses.help).shouldEndSession(false));
      // message.utu.event("Error - Rate by Currency");
    }
  } else {
    bot.reply(message, _alexaResponse2.default.ask("Sorry, I didn't catch a currency.  Can you repeat the statement?").reprompt(_nlp.SYSTEM.HELP.responses.help).shouldEndSession(false));
    // message.utu.event("Error - Rate by Currency");
  }
});

_listener2.default.hears(_nlp.CLIPS.SUPPORTED.intents, ['message_received'], function (bot, message) {
  var currency = message.alexa.getSlotValue('CURRENCY');
  if (currency) {
    console.log(currency);
    console.log(_nlp.CLIPS.slotTypes.CURRENCIES);
    if (_nlp.CLIPS.slotTypes.CURRENCIES.indexOf(currency.toLowerCase()) > 0) {
      bot.reply(message, _alexaResponse2.default.say('Yes, ' + currency + ' is supported').shouldEndSession(true));
    } else {
      bot.reply(message, _alexaResponse2.default.ask('No, ' + currency + ' is not currently supported.').shouldEndSession(true));
    }
    // message.utu.event("Supported", {
    //   values: {
    //     "Currency": currency,
    //   }
    // });
  } else {
    bot.reply(message, _alexaResponse2.default.ask("Sorry, I didn't catch a currency.  Can you repeat the statement?").shouldEndSession(false));
    // message.utu.event("Error - Supported");
  }
});

_listener2.default.hears(_nlp.SYSTEM.HELP.intents, ['message_received'], function (bot, message) {
  bot.reply(message, _alexaResponse2.default.say(_nlp.SYSTEM.HELP.responses.intro).say(_nlp.SYSTEM.HELP.responses.help).shouldEndSession(false));
  // message.utu.event("Help");
});

_listener2.default.hears(_nlp.SYSTEM.STOP.intents, ['message_received'], function (bot, message) {
  bot.reply(message, _alexaResponse2.default.shouldEndSession(true));
  // message.utu.event("Goodbye");
});