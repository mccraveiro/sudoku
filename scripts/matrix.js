(function (window) {
  'use strict';

  function Matrix(width, height) {
    var matrix, i, j;

    matrix = [];
    for (i = 0; i < height; i++) {
      matrix[i] = [];
      for (j = 0; j < width; j++) {
        matrix[i][j] = null;
      }
    }

    return matrix;
  }

  window.Matrix = Matrix;
}(window));