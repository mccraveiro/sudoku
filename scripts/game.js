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
          row: i,
          column: j,
          value: value,
          hint: hint,
          error: false
        };
      }
    }
  };

  Game.prototype.getCurrentState = function() {
    var state, i, j;

    state = new Matrix(9,9);
    for (i = 0; i < this.board.length; i++) {
      for (j = 0; j < this.board[i].length; j++) {
        state[i][j] = this.board[i][j].value === '' ? '.' : this.board[i][j].value;
      }
    }

    return state;
  };

  Game.prototype.solve = function() {
    this.updateBoard(sudoku.solve(this.preset));
  };

  Game.prototype.cleanErrors = function() {
    var i, j;

    for (i = 0; i < this.board.length; i++) {
      for (j = 0; j < this.board[i].length; j++) {
        this.board[i][j].error = false;
      }
    }
  };

  Game.prototype.validateBoard = function() {
    var i, j;

    this.cleanErrors();

    // validate each cell
    for (i = 0; i < this.board.length; i++) {
      for (j = 0; j < this.board[i].length; j++) {
        this._partialCellValidation(i, j);
      }
    }
  };

  Game.prototype._partialCellValidation = function (row, column) {
    var i, j, cell = this.board[row][column], error = cell.error;

    if (cell.value === '') {
      cell.error = false;
      return;
    }

    // search on the row
    for (i = column + 1; i < this.board.length; i++) {
      if (this.board[row][i].value === cell.value) {
        // error found
        this.board[row][i].error = error = true;
      }
    }

    // search on the column
    for (i = row + 1; i < this.board.length; i++) {
      if (this.board[i][column].value === cell.value) {
        // error found
        this.board[i][column].error = error = true;
      }
    }

    // search on the area
    var areaInitRow = 3 * Math.floor(row / 3);
    var areaInitColumn = 3 * Math.floor(column / 3);
    for (i = areaInitRow; i < (areaInitRow + 3); i++) {
      for (j = areaInitColumn; j < (areaInitColumn + 3); j++) {
        if (this.board[i][j] !== cell && this.board[i][j].value === cell.value) {
          // error found
          this.board[i][j].error = error = true;
        }
      }
    }

    // set current cell
    cell.error = error;
  };

  Game.prototype.isInvalidMove = function() {
    return !this.getPossibilities();
  };

  Game.prototype.getPossibilities = function() {
    var currentState = sudoku.board_grid_to_string(this.getCurrentState());
    return sudoku.get_candidates(currentState);
  };

  window.Game = Game;
}(window));