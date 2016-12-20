// require("./lib/social");
// require("./lib/ads");
// var track = require("./lib/tracking");

require("component-responsive-frame/child");

var savage = require("savage-query");
var $ = require("./lib/qsa");

var container = document.querySelector(".svg-container");

/*
Start with cranes, mountain line, water line, boat and Smith Tower.
Then Merry Christmas draws in.
Glow turns on and 2016 pops in with glow.
Boat start its movement across the water.

Need polylines converted to paths
Star_6 is not named correctly
Christmas is out of order
*/

var order = [
  "Both_cranes",
  "Water_line",
  "Mountain_Skyline",
  "Smith_Tower",
  "Merry",
  "Christmas",
  "_2016"
];

var stage = 0;

var draw = function(done) {

  var step = function() {
    var id = order[stage];
    if (!id) return done();
    var paths = $(`#${id} path, #${id} polyline, #${id} polygon, #${id} line`);
    var i = 0;

    var next = function() {
      var path = paths[i];
      var length = path.getTotalLength ? path.getTotalLength() : 10;
      var time = length;
      savage(path).draw(time);
      path.style.opacity = 1;
      i++;
      if (i == paths.length) {
        i = 0;
        stage++;
        return setTimeout(step, time);
      }
      setTimeout(next, time);
    }

    next();
  };

  step();
};

draw(function() {
  container.classList.add("warm");
});