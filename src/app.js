const SelectView = require('./views/select_view.js');
const Countries = require('./models/countries.js');
const InfoView = require('./views/info_view.js');

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');

  const countriesSelect = document.querySelector('#countries');
  // console.log('countriesSelect', countriesSelect);
  const selectView = new SelectView(countriesSelect);
  selectView.bindEvents();

  const countries = new Countries();
  // console.log('this.countries seen by app', countries.countries);
  countries.bindEvents();

  const infoContainer = document.querySelector('#country');
  const infoView = new InfoView(infoContainer);
  infoView.bindEvents();
});
