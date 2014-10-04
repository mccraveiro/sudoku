(function (window) {
  'use strict';

  function Analytics() {
    this.service = window.analytics.getService('sudoku');
    this.tracker = this.service.getTracker('UA-55395503-1');

    this.restoreAnalyticsSettings();

    chrome.contextMenus.onClicked.addListener(function (info) {
      if (info.menuItemId === 'disableAnalytics') {
        this.toggleAnalytics(info.checked);
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