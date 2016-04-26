'use strict';

import * as Xfinity from './xfinity';
import * as Cache from './cache';

const username = process.env.XFINITY_USERNAME;
const password = process.env.XFINITY_PASSWORD;

Xfinity.needsLogin().then(needsLogin => {
  if (needsLogin) {
    return Xfinity.login(username, password);
  }
})
.then(() => Xfinity.loadChannels())
.then(channels => {
  console.log(`Found ${channels.length} channels`);
  console.log(`Found ${channels.length * 2} programs`);
  console.log(JSON.stringify(channels, null, 2));
})
.finally(() => Cache.close())
