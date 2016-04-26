'use strict';

import Promise from 'bluebird';
import Redis from 'redis';
import pkg from '../package.json';

Promise.promisifyAll(Redis.RedisClient.prototype);

const client = Redis.createClient(6379, '127.0.0.1');
const PREFIX = pkg.name;
const prefixKey = key => `${PREFIX}/key`;

client.on('error', error => console.error('redis error', error));

export function get (key) {
  return client.getAsync(prefixKey(key)).then(value => {
    if (!value) {
      throw new Error(`No value found for key ${key}`);
    }
    return value;
  });
}

export function getJSON (key) {
  return get(key).then(JSON.parse);
}

export function set (key, value, ttl) {
  if (ttl) {
    return client.setexAsync(prefixKey(key), ttl, value);
  }
  return client.setAsync(prefixKey(key), value);
}

export function setJSON(key, value, ttl) {
  return set(key, JSON.stringify(value), ttl);
}

export function close () {
  return client.quit(); 
}
