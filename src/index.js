'use strict';

import * as Fetcher from './fetcher';
import * as Parser from './parser';

const username = process.env.XFINITY_USERNAME;
const password = process.env.XFINITY_PASSWORD;

Fetcher.getLoginRequestId()
.then(response => Parser.parseFormFields(response.body))
.then(fields => Fetcher.login(username, password, fields))
.then(() => Fetcher.getListingsPage())
.then(response => Parser.parseListingPage(response.body))
.then(channels => {
  console.log(`Found ${channels.length} channels`);
  console.log(`Found ${channels.length * 2} programs`);
  console.log(JSON.stringify(channels, null, 2));
})

