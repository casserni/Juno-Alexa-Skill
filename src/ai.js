import response from 'alexa-response';
import ear from './listener';
import { getNames, getRateByCurrency } from './service';
import { SYSTEM, ALL, CLIPS } from './nlp';

ear.on('message_received', function(bot, message) {
  if (message.alexa.session.application.applicationId !== process.env.ALEXA_APPID) {
    bot.reply(message,
      response
        .fail(`Invalid applicationId: ${message.alexa.session.application.applicationId}`)
        .shouldEndSession(true)
    );
  }
});

ear.hears(SYSTEM.LAUNCH.intents, ['message_received'], function(bot, message) {
  bot.reply(message,
    response
      .say(SYSTEM.LAUNCH.responses.greeting)
      .reprompt(SYSTEM.HELP.responses.reprompt)
      .shouldEndSession(false)
  );
  // message.utu.event("Session Launch");
});

ear.hears(SYSTEM.START.intents, ['message_received'], function(bot, message) {
  bot.reply(message,
    response
      .say(SYSTEM.START.responses.greeting)
      .reprompt(SYSTEM.HELP.responses.reprompt)
      .shouldEndSession(false)
  );
  // message.utu.event("Session Start");
});

ear.hears(ALL.ALL_CURRENCIES.intents, ['message_received'], function(bot, message) {
  getNames()
      bot.reply(message,
        response
        .say(`Supported currencies are as follows ${getNames().join(', ')}`)
        .reprompt(SYSTEM.HELP.responses.reprompt)
        .shouldEndSession(false)
      );
    // message.utu.event("All Currencies");
});

ear.hears(CLIPS.RATES.intents, ['message_received'], function(bot, message) {
  const currency = message.alexa.getSlotValue('CURRENCY');
  if (currency) {
    if (CLIPS.slotTypes.CURRENCIES.indexOf(currency.toLowerCase()) > 0) {
      getRateByCurrency(currency)
        .then((res) => {
          bot.reply(message,
            response
              .say(`One US Dollar is equivalent to ${res} ${currency}`)
              .reprompt(SYSTEM.HELP.responses.reprompt)
              .shouldEndSession(false)
          );
        });
      // message.utu.event("Rate by Currency", {
      //   values: {
      //     "Currency": currency,
      //   }
      // });
    } else {
      bot.reply(message,
        response
          .ask(`Sorry, but ${currency} is not supported.  Please try again.`)
          .reprompt(SYSTEM.HELP.responses.reprompt)
          .shouldEndSession(false)
      );
      // message.utu.event("Error - Rate by Currency");
    }
  } else {
    bot.reply(message,
      response
        .ask("Sorry, I didn't catch a currency.  Can you repeat the statement?")
        .reprompt(SYSTEM.HELP.responses.reprompt)
        .shouldEndSession(false)
    );
    // message.utu.event("Error - Rate by Currency");
  }
});

ear.hears(CLIPS.SUPPORTED.intents, ['message_received'], function(bot, message) {
  const currency = message.alexa.getSlotValue('CURRENCY');
  if (currency) {
    console.log(currency)
    console.log(CLIPS.slotTypes.CURRENCIES)
    if (CLIPS.slotTypes.CURRENCIES.indexOf(currency.toLowerCase()) > 0) {
      bot.reply(message,
        response
          .say(`Yes, ${currency} is supported`)
          .reprompt(SYSTEM.HELP.responses.reprompt)
          .shouldEndSession(false)
          );
    } else {
      bot.reply(message,
        response
          .ask(`No, ${currency} is not currently supported.`)
          .reprompt(SYSTEM.HELP.responses.reprompt)
          .shouldEndSession(false)
      );
    }
    // message.utu.event("Supported", {
    //   values: {
    //     "Currency": currency,
    //   }
    // });
  } else {
    bot.reply(message,
      response
        .ask("Sorry, I didn't catch a currency.  Can you repeat the statement?")
        .reprompt(SYSTEM.HELP.responses.reprompt)
        .shouldEndSession(false)
    );
    // message.utu.event("Error - Supported");
  }
});

ear.hears(SYSTEM.HELP.intents, ['message_received'], (bot, message) => {
  bot.reply(message,
    response
      .say(SYSTEM.HELP.responses.help)
      .reprompt(SYSTEM.HELP.responses.reprompt)
      .shouldEndSession(false)
  );
  // message.utu.event("Help");
});

ear.hears(SYSTEM.STOP.intents, ['message_received'], (bot, message) => {
  bot.reply(message,
    response
    .say(SYSTEM.STOP.responses.goodbye)
      .shouldEndSession(true)
  );
  // message.utu.event("Goodbye");
});
