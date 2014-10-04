/* global angular, Analytics, Game*/
(function () {
  'use strict';

  var app, _analytics;

  function mainController($scope) {

    _analytics = new Analytics();

    $scope.inputChange = inputChange;
    $scope.newGame = newGame.bind(null, $scope);
    $scope.solve = solve.bind(null, $scope);

    $scope.difficulties = [
      {
        name: 'Beginner',
        hints: 40
      },
      {
        name: 'Easy',
        hints: 30
      },
      {
        name: 'Medium',
        hints: 25
      },
      {
        name: 'Hard',
        hints: 20
      },
      {
        name: 'Expert',
        hints: 15
      }
    ];
    $scope.selectedDifficulty = $scope.difficulties[2];

    $scope.currentColumn = null;
    $scope.setCurrentColumn = setCurrentColumn.bind(null, $scope);

    newGame($scope);
  }

  function inputChange (cell) {
    // Validation
    if (!cell.value.match(/[0-9]/)) {
      cell.value = '';
    }
  }

  function newGame($scope) {
    $scope.game = new Game($scope.selectedDifficulty.hints);
    _analytics.tracker.sendEvent('New Game', $scope.selectedDifficulty.name);
  }

  function solve($scope) {
    $scope.game.solve();
    _analytics.tracker.sendEvent('Solve');
  }

  function setCurrentColumn($scope, $index) {
    $scope.currentColumn = $index;
  }

  app = angular.module('sudokuApp', []);
  app.controller('MainController', ['$scope', mainController]);

  angular.element(document).ready(function () {
    angular.bootstrap(document, ['sudokuApp']);
  });
}());