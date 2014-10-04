/* global sudoku, Matrix*/
(function (window) {
  'use strict';

  // [Integer] difficulty = number of hints
  function Game(difficulty) {
    this.difficulty = difficulty;
    this.preset = sudoku.generate(this.difficulty);
    this.board = new Matrix(9,9);
    this.updateBoard(this.preset);
  }

  Game.prototype.updateBoard = function(game) {
    var originalBoard = sudoku.board_string_to_grid(this.preset);
    var generatedBoard = sudoku.board_string_to_grid(game);

    var i, j, value, hint;

    for (i = 0; i < generatedBoard.length; i++) {
      for (j = 0; j < generatedBoard[i].length; j++) {
        value = generatedBoard[i][j] != '.' ? generatedBoard[i][j] : '';
        hint = value && value == originalBoard[i][j];

        this.board[i][j] = {
          value: value,
          hint: hint
        };
      }
    }
  };

  Game.prototype.solve = function() {
    this.updateBoard(sudoku.solve(this.preset));
  };

  window.Game = Game;
}(window));