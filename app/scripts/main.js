'use strict';

var app = app || {};

(function($) {
  $(document).ready(function() {


    app.VideoApp = new app.App();

    app.VideoApp.initialize();

  });
})(jQuery);