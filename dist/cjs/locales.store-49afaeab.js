'use strict';

const axios = require('./axios-6fba915c.js');

const initialState = {
    entries: null,
    direction: 'ltr',
};
const { state: locales, onChange: onCalendarDatesChange } = axios.createStore(initialState);

exports.locales = locales;

//# sourceMappingURL=locales.store-49afaeab.js.map