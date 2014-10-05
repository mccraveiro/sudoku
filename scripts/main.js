/* global angular, Analytics, Game, Dropdown*/
(function () {
  'use strict';

  var app, _analytics;

  function mainController($scope) {

    _analytics = new Analytics();

    $scope.inputChange = inputChange.bind(null, $scope);
    $scope.selectDifficulty = selectDifficulty.bind(null, $scope);
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

    $scope.currentRow = null;
    $scope.currentColumn = null;
    $scope.onCellOver = onCellOver.bind(null, $scope);

    newGame($scope);
    _analytics.tracker.sendAppView('MainView');
  }

  function inputChange ($scope, cell) {
    // Validation
    if (cell.value !== '' && !cell.value.match(/[1-9]/)) {
      cell.value = '';
    }

    $scope.game.validateBoard();
  }

  function selectDifficulty($scope, difficulty) {
    $scope.selectedDifficulty = difficulty;
  }

  function newGame($scope) {
    $scope.game = new Game($scope.selectedDifficulty.hints);
    _analytics.tracker.sendEvent('New Game', $scope.selectedDifficulty.name);
  }

  function solve($scope) {
    $scope.game.solve();
    _analytics.tracker.sendEvent('Solve');
  }

  function onCellOver($scope, row, column) {
    $scope.currentRow = row;
    $scope.currentColumn = column;
  }

  app = angular.module('sudokuApp', []);
  app.controller('MainController', ['$scope', mainController]);

  angular.element(document).ready(function () {
    angular.bootstrap(document, ['sudokuApp']);

    var dp = new Dropdown();
    dp.init();
  });
}());