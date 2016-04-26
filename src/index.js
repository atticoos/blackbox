'use strict';

import * as Xfinity from './xfinity';
import * as Cache from './cache';
import * as Navigator from './navigator';

const username = process.env.XFINITY_USERNAME;
const password = process.env.XFINITY_PASSWORD;

Navigator.openBrowser();
console.log('browser opened')
Navigator.login(username, password).then(() => {
  console.log('browser logged in');
  return loadChannels().then(channels => {
    return Navigator.loadChannel(channels[0].programs[0].link);
  })
});


function loadChannels () {
  return Xfinity.needsLogin().then(needsLogin => {
    if (needsLogin) {
      return Xfinity.login(username, password);
    }
  })
  .then(() => Xfinity.loadChannels())
  .then(channels => {
    console.log(`Found ${channels.length} channels`);
    console.log(`Found ${channels.length * 2} programs`);
    console.log(JSON.stringify(channels, null, 2));
    return channels;
  });
}
