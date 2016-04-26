'use strict';

import restify from 'restify';
import * as Xfinity from './xfinity';
import * as Navigator from './navigator';

var server = restify.createServer({
  name: 'rPi BlackBox',
  version: '1.0.0'
});

const username = process.env.XFINITY_USERNAME;
const password = process.env.XFINITY_PASSWORD;

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/channels', (req, res, next) => {
  Xfinity.needsLogin().then(needsLogin => {
    if (needsLogin) {
      return Xfinity.login(username, password);
    }
  }).then(() => Xfinity.loadChannels())
  .then(channels => {
    res.send(channels);
  })
});

server.post('/watch', (req, res, next) => {
  var {link} = req.body.programs[0];
  Navigator.loadChannel(link);
  res.send({ok: true});
})

Navigator.openBrowser();
Navigator.login(username, password);

server.listen(8080, () => console.log('listening on 8080'));
