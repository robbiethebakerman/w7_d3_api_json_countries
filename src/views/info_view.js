const PubSub = require('../helpers/pub_sub.js');

const InfoView = function (container) {
 this.container = container;
};

InfoView.prototype.bindEvents = function () {
  PubSub.subscribe('Countries:selected-country-ready', (event) => {
    const selectedCountry = event.detail;
    console.log('selectedCountry in info view', selectedCountry);
    this.render(selectedCountry);
  });
};

InfoView.prototype.render = function (country) {
  this.container.innerHTML = '';

  const name = this.setUpTextElement('h2', country.name, 'country-name');
  this.container.appendChild(name);

  const region = this.setUpTextElement('h3', `Region: ${country.region}`, 'country-region');
  this.container.appendChild(region);

  const flag = this.setUpImageElement(country.flag, `The flag of ${country.name}`, 'country-flag');
  this.container.appendChild(flag);

  const languagesHeading =this.setUpTextElement('h3', 'Languages:', 'country-languages-heading');
  const languages = this.setUpLanguageList(country.languages, 'country-languages');
  this.container.appendChild(languagesHeading);
  this.container.appendChild(languages);
};

InfoView.prototype.setUpTextElement = function (type, textContent, cssClass) {
  const newElement = document.createElement(type);
  newElement.textContent = textContent;
  newElement.classList.add(cssClass);
  return newElement;
};

InfoView.prototype.setUpImageElement = function (src, alt, cssClass) {
  const newElement = document.createElement('img');
  newElement.src = src;
  newElement.alt = alt;
  newElement.classList.add(cssClass);
  return newElement;
};

InfoView.prototype.setUpLanguageList = function (languageArray, cssClass) {
  const list = document.createElement('ul');
  languageArray.forEach((language) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${language.name} (${language.nativeName})`;
    list.appendChild(listItem);
  });
  list.classList.add(cssClass);
  return list;
};

module.exports = InfoView;
