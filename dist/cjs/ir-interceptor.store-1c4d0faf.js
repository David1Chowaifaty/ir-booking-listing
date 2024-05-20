'use strict';

const axios = require('./axios-6fba915c.js');

const initialState = {};
const { state: interceptor_requests, onChange: onCalendarDatesChange } = axios.createStore(initialState);
function isRequestPending(url) {
    return interceptor_requests[url] === 'pending';
}

exports.interceptor_requests = interceptor_requests;
exports.isRequestPending = isRequestPending;

//# sourceMappingURL=ir-interceptor.store-1c4d0faf.js.map