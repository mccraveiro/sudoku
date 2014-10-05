(function () {
  'use strict';

  function Dropdown () {
    // left blank on purpose
  }

  Dropdown.prototype.init = function() {
    var _ = this;

    window.onload = function () {
      var elements = document.querySelectorAll('.btn-dropdown .btn');
      for (var i = 0; i < elements.length; i++) {
        _.addEvents(elements[i]);
      }
    };
  };

  Dropdown.prototype.addEvents = function(element) {
    element.addEventListener('click', function () {
      this.classList.toggle('open');
    });
    element.addEventListener('blur', function () {
      this.classList.remove('open');
    });
  };

  window.Dropdown = Dropdown;

}());