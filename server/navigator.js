'use strict';

import webdriver, {By, until} from 'selenium-webdriver';

var driver;

export function openBrowser () {
  if (!driver) {
    driver = new webdriver.Builder()
      .forBrowser('firefox')
      .build();
  }
}

export function login (username, password) {
  return driver.get('https://login.comcast.net/login')
    .then(() => driver.findElement(By.id('user')).sendKeys(username))
    .then(() => driver.findElement(By.id('passwd')).sendKeys(password))
    .then(() => driver.findElement(By.id('sign_in')).click());
    /*
  driver.get('https://login.comcast.net/login');
  driver.findElement(By.id('user')).sendKeys(username);
  driver.findElement(By.id('passwd')).sendKeys(password);
  driver.findElement(By.id('sign_in')).click();
  */
}

export function loadChannel (channel) {
  return driver.get('https://xfinitytv.comcast.net' + channel);
}
