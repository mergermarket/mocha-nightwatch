var nightwatch = require('nightwatch');
module.exports = Nightwatch;

function Nightwatch(runner, nwSettings) {
  this._instance = null;
  this._mocha = runner;
  this.test_settings = nwSettings;
}

Nightwatch.prototype.getClient = function() {
  if (this._instance) {
    return this._instance;
  }

  this.test_settings.output = false;
  this._instance = nightwatch.initClient(this.test_settings);

  this._instance.on('error', function(err) {
    this._mocha.failOnError(err);
  }.bind(this));

  return this._instance;
};
