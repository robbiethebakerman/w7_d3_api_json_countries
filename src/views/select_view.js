const PubSub = require('../helpers/pub_sub.js');

const SelectView = function (selectElement) {
  this.selectElement = selectElement;
};

SelectView.prototype.bindEvents = function () {
  PubSub.subscribe('Countries:all-countries-ready', (event) => {
    const allCountries = event.detail;
    console.log('payload received in select view subscribe', allCountries);
    this.populate(allCountries);
  });

  this.selectElement.addEventListener('change', (event) => {
    const selectedIndex = event.target.value;
    PubSub.publish('SelectView:change', selectedIndex);
  });
};

SelectView.prototype.populate = function (countryArray) {
  countryArray.forEach((country, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = country.name;
    this.selectElement.appendChild(option);
  });
};

module.exports = SelectView;
