'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRateByCurrency = exports.getNames = undefined;

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _common_currencies = require('./data/common_currencies');

var _common_currencies2 = _interopRequireDefault(_common_currencies);

var _supported_currencies = require('./data/supported_currencies');

var _supported_currencies2 = _interopRequireDefault(_supported_currencies);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getNames = exports.getNames = function getNames() {
  var names = [];
  _supported_currencies2.default.forEach(function (curr) {
    return names.push(_common_currencies2.default[curr].name.toLowerCase());
  });
  return names;
};

var getRateByCurrency = exports.getRateByCurrency = function getRateByCurrency(currency) {
  var names = getNames

  //turns first letter of everyword into uppercase
  ();var curr = currency.split(' ');
  for (var i = 0; i < curr.length; i++) {
    curr[i] = curr[i].charAt(0).toUpperCase() + curr[i].substr(1);
  }

  //checks if the currency is an appreviation or a a full title
  if (names.includes(currency.toLowerCase())) {
    curr = _lodash2.default.findKey(_common_currencies2.default, ['name', curr.join(" ")]);
  } else {
    curr = currency;
  }

  return (0, _nodeFetch2.default)('https://api.fixer.io/latest?base=USD').then(function (res) {
    return res.json();
  }).then(function (data) {
    if (curr === 'usd') {
      return 1;
    } else {
      return data.rates[curr.toUpperCase()];
    }
  });
};