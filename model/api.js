const axios = require("axios");

const options = {
  method: 'GET',
  url: 'https://indeed-indeed.p.rapidapi.com/apisearch',
  params: {
    useragent: '<REQUIRED>',
    userip: '<REQUIRED>',
    chnl: '<REQUIRED>',
    co: '<REQUIRED>',
    latlong: '<REQUIRED>',
    filter: '<REQUIRED>',
    highlight: '<REQUIRED>',
    fromage: '<REQUIRED>',
    limit: '<REQUIRED>',
    start: '<REQUIRED>',
    jt: '<REQUIRED>',
    st: '<REQUIRED>',
    radius: '25',
    sort: '<REQUIRED>',
    l: 'austin, tx',
    q: 'java',
    callback: '<REQUIRED>',
    format: 'json',
    v: '2',
    publisher: 'undefined'
  },
  headers: {
    'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
    'X-RapidAPI-Host': 'indeed-indeed.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});