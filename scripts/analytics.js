/* global chrome */
(function (window) {
  'use strict';

  function Analytics() {
    var _ = this;

    _.service = window.analytics.getService('sudoku');
    _.tracker = _.service.getTracker('UA-55395503-1');

    _.restoreAnalyticsSettings();

    chrome.contextMenus.onClicked.addListener(function (info) {
      if (info.menuItemId === 'disableAnalytics') {
        _.toggleAnalytics(info.checked);
      }
    });
  }

  Analytics.prototype.restoreAnalyticsSettings = function () {
    this.service.getConfig().addCallback(function (config) {
      chrome.contextMenus.update('disableAnalytics', {
        checked: !config.isTrackingPermitted()
      });
    });
  };

  Analytics.prototype.toggleAnalytics = function (permission) {
    this.service.getConfig().addCallback(function (config) {
      config.setTrackingPermitted(!permission);
    });
  };

  window.Analytics = Analytics;
}(window));