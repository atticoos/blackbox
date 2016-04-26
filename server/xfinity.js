'use strict';

import * as Cache from './cache';
import * as Parser from './parser';
import * as Fetcher from './fetcher';

export function loadChannels () {
  return Cache.getJSON('channels')
  .catch(() => {
    return Fetcher.getListingsPage()
    .then(response => Parser.parseListingPage(response.body))
    .then(channels => Cache.setJSON('channels', channels).then(() => channels));
  });
}

export function login (username, password) {
  return Fetcher.getLoginRequestId()
  .then(response => Parser.parseFormFields(response.body))
  .then(fields => Fetcher.login(username, password, fields));
}

export function needsLogin () {
  // @TODO
  return Cache.get('channels');
}
