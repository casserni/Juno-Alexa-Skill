'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ALL = exports.ALL = {
  ALL_CURRENCIES: {
    intents: ['GetAllCurrencies'],
    slots: [],
    utterances: ['{list|show|show me|tell me|give me} {-|all} {-|the} {currencies}']
  }
};
var CLIPS = exports.CLIPS = {
  RATES: {
    intents: ['GetRateByCurrency'],
    slots: {
      CURRENCY: 'CURRENCIES'
    },
    utterances: ['{compare} {-USD|dollar|US Dollar} {-|to} {-|the} {-|CURRENCY}', '{rate|rates|exchange} {-|for|between} {-|the} {-|CURRENCY}']
  },
  SUPPORTED: {
    intents: ['Supported'],
    slots: {
      CURRENCY: 'CURRENCIES'
    },
    utterances: ['{-|is} {-|the} {-|CURRENCY} {supported}', '{-|do you} {support|have} {-|the} {-|CURRENCY}']
  },
  slotTypes: {
    CURRENCIES: ['aud', 'bgn', 'brl', 'cad', 'chf', 'cny', 'czk', 'dkk', 'eur', 'gbp', 'hkd', 'hrk', 'huf', 'idr', 'ils', 'inr', 'jpy', 'krw', 'mxn', 'myr', 'nok', 'nzd', 'php', 'pln', 'ron', 'rub', 'sek', 'sgd', 'thb', 'try', 'usd', 'zar', 'australian dollar', 'bulgarian lev', 'brazilian real', 'canadian dollar', 'swiss franc', 'chinese yuan', 'czech republic koruna', 'danish krone', 'euro', 'british pound sterling', 'hong kong dollar', 'croatian kuna', 'hungarian forint', 'indonesian rupiah', 'israeli new sheqel', 'indian rupee', 'japanese yen', 'south korean won', 'mexican peso', 'malaysian ringgit', 'norwegian krone', 'new zealand dollar', 'philippine peso', 'polish zloty', 'romanian leu', 'russian ruble', 'swedish krona', 'singapore dollar', 'thai baht', 'turkish lira', 'us dollar', 'south african rand']
  }
};

var SYSTEM = exports.SYSTEM = {
  HELP: {
    intents: ['AMAZON.HelpIntent', 'Help'],
    slots: [],
    utterances: ['{help} {-|me}'],
    responses: {
      help: 'You can use this bot to check supported currency by asking "is Euro\n        supported".  Likewise compare by currency by saying "compare to Euro".\n        If you need a list of currencies, just say "list currencies". If you are\n        finished with your experience say quit',
      reprompt: 'Can I help you with anything?'
    }
  },
  LAUNCH: {
    intents: ['LaunchRequest'],
    slots: [],
    utterances: [],
    responses: {
      intro: 'US Dollar Exchange is a currency converter than will tell you how foriegn\n      currencies currently compare to the US Dollar'
    }
  },
  START: {
    intents: ['AMAZON.StartOverIntent', 'Start'],
    slots: [],
    utterances: ['{hi|hello|hey|start|begin}'],
    responses: {
      greeting: 'Hello! Welcome to US Dollar Exchange! Say help for more options'
    }
  },
  STOP: {
    intents: ['AMAZON.CancelIntent', 'AMAZON.StopIntent', 'Quit'],
    slots: [],
    utterances: ['{quit|exit|bye|end|finished|no|nope}'],
    responses: {
      goodbye: 'Goodbye!'
    }
  }
};