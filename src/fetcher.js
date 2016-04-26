'use strict';

import requestClient from 'request';
import Promise from 'bluebird';
const request = Promise.promisifyAll(requestClient);

const BASE_URL = 'http://xfinitytv.comcast.net';
const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) ' +
  'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.112 Safari/537.36';

export function getLoginRequestId () {
  return request.getAsync('https://login.comcast.net/login', {
    jar: true,
    headers: {
      'User-Agent': USER_AGENT,
    }
  });
}

export function login (user, passwd, hiddenFormFields) {
  var fields = {
    ...hiddenFormFields,
    user,
    passwd
  };
  var body = Object.keys(fields).reduce((kvs, field) => kvs.concat(`${field}=${fields[field]}`), []).join('&');
  return request.postAsync('https://login.comcast.net/login', {
    headers: {
      'User-Agent': USER_AGENT,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': new Buffer(body).length
    },
    body
  });
}

export function getListingsPage () {
  return request.getAsync(`${BASE_URL}/watch-live-tv`, {
    headers: {
      'UserAgent': USER_AGENT
    }
  });
}
