const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js');

const Countries = function () {
  this.countries = [];
};

Countries.prototype.bindEvents = function () {
  this.getCountriesData();

  PubSub.subscribe('SelectView:change', (event) => {
    const selectedCountry = this.countries[event.detail];
    PubSub.publish('Countries:selected-country-ready', selectedCountry);
  });
};

Countries.prototype.getCountriesData = function () {
  const request = new RequestHelper('https://restcountries.eu/rest/v2/all');
  request.get((data) => {
    this.countries = data;
    PubSub.publish('Countries:all-countries-ready', this.countries);
  });
};

module.exports = Countries;
