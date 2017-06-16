import fetch from 'node-fetch';
import COMMON_CURRENCIES from './data/common_currencies'
import SUPPORTED_CURRENCIES from './data/supported_currencies'
import _ from 'lodash'

export const getNames = () => {
  let names=[]
  SUPPORTED_CURRENCIES.forEach(curr => names.push(COMMON_CURRENCIES[curr].name.toLowerCase()))
  return names
}

export const getRateByCurrency = (currency) => {
  const names = getNames()

  //turns first letter of everyword into uppercase
  let curr = currency.split(' ')
  for(var i = 0 ; i < curr.length ; i++){
    curr[i] = curr[i].charAt(0).toUpperCase() + curr[i].substr(1);
  }

  //checks if the currency is an appreviation or a a full title
  if(names.includes(currency.toLowerCase())) {
    curr = _.findKey(COMMON_CURRENCIES, ['name', curr.join(" ")]);
  } else {
    curr = currency
  }

  return fetch(`https://api.fixer.io/latest?base=USD`)
    .then(res => res.json())
    .then((data) => {
      if (curr ==='usd') {
        return 1
      } else {
        return data.rates[curr.toUpperCase()]
      }
    })
};
