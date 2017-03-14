"use strict";

require("./helpers/setup");

var wd = require("wd"),
    _ = require('underscore'),
    serverConfigs = require('./helpers/appium-servers');

describe("android webview", function () {
  this.timeout(1000000);
  var driver;
  var allPassed = true;

  before(function () {
    console.log('process.env.LOCAL', process.env.LOCAL);
    var serverConfig = process.env.npm_package_config_sauce ?
      serverConfigs.sauce : serverConfigs.local;
    driver = wd.promiseChainRemote(serverConfig);
    require("./helpers/logging").configure(driver);

    var desired = process.env.npm_package_config_sauce ?
      _.clone(require("./helpers/caps").android18) :
      _.clone(require("./helpers/caps").android19);
    desired.app = require("./helpers/apps").androidApp;
    desired.appPackage = require("./helpers/apps").appPackage;
    desired.appActivity = require("./helpers/apps").appActivity;

    desired.fullReset = false
    desired.noReset = true
    if (process.env.npm_package_config_sauce) {
      desired.name = 'android';
      desired.tags = ['sample'];
    }
    return driver
      .init(desired)
      .setImplicitWaitTimeout(3000);
  });

  after(function () {
    return driver
      .quit()
      .finally(function () {
        if (process.env.npm_package_config_sauce) {
          return driver.sauceJobStatus(allPassed);
        }
      });
  });

  afterEach(function () {
    allPassed = allPassed && this.currentTest.state === 'passed';
  });

  it("should switch to webview", function () {
    return driver
      .waitForElementByXPath("//android.widget.TextView[@text='Discover']", 80000)
      .click(function(){
        console.log('Discover is clicked');
      })
      .waitForElementByXPath("//android.widget.TextView[@text='Mini Program']", 80000)
      .click(function() {
        console.log('Mini Program is clicked');
      })
      .waitForElementByXPath("//android.widget.TextView[@text='小程序示例']", 80000)
      .click(function() {
        console.log('小程序示例 is clicked');
      })
      .sleep(5000)
  });
});
