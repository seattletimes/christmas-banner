// require("./lib/social");
// require("./lib/ads");
// var track = require("./lib/tracking");

require("component-responsive-frame/child");

var savage = require("savage-query");
var $ = require("./lib/qsa");

var container = document.querySelector(".svg-container");

var order = [
  "Both_cranes",
  "Water_line",
  "Mountain_Skyline",
  "Smith_Tower",
  "Merry",
  "Christmas",
  "_2016"
];

var each = function(a, fn, c) {
  var i = 0;
  var step = function() {
    if (i == a.length) return c();
    fn(a[i], function() {
      i++;
      step();
    });
  }

  step();
};

each(order, function(id, done) {

  var paths = $(`#${id} path, #${id} polyline, #${id} polygon, #${id} line`);

  each(paths, function(path, next) {
    var length = path.getTotalLength ? path.getTotalLength() : 10;
    var time = length;
    savage(path).draw(time);
    path.style.opacity = 1;
    setTimeout(next, time);
  }, done)

}, function() {
  container.classList.add("warm");
})