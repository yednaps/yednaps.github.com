$("#slider").roundSlider({
  width: 22,
  radius: 100,
  min: 0,
  max: 45 * 60,
  step: 1,
  sliderType: "min-range",
  startAngle: 270,
  circleShape: "full",
  tooltipFormat: "changeTooltip",
  drag: "changeEvent",
  change: "changeEvent",
});

function changeTooltip(e) {
  var val = e.value;
  if (val == 0) return "<div>FIN</div>"
  else {
    var m = Math.floor(val / 60);
    var s = Math.floor(val % 60);
    m = (val / 60 <= 9) ? "0" + m : m;
    s = (val % 60 <= 9) ? "0" + s : s;
    return m + ":" + s
  }
}

function changeEvent(e) {
  maxt = $("#slider").roundSlider("option", "value");
  start();
}

var clsStopwatch = function() {
  // Private vars
  var startAt = 0; // Time of last start / resume. (0 if not running)
  var lapTime = 0; // Time on the clock when last stopped in milliseconds
  var maxt = 0;

  var now = function() {
    return (new Date()).getTime();
  };

  // Public methods
  // Start or resume
  this.start = function() {
    startAt = startAt ? startAt : now();
  };

  // Stop or pause
  this.stop = function() {
    // If running, update elapsed time otherwise keep it
    lapTime = startAt ? lapTime + now() - startAt : lapTime;
    startAt = 0; // Paused
  };

  // Reset
  this.reset = function() {
    lapTime = startAt = 0;
  };

  // Duration
  this.time = function() {
    return lapTime + (startAt ? now() - startAt : 0);
  };
};

var x = new clsStopwatch();
var $time;
var clocktimer;

function show() {
  update();
}

function update() {
  var t = x.time()
    //maxt = $("#slider").roundSlider("option", "max");
  remt = maxt - t / 1000
  $("#slider").roundSlider("option", "value", remt);
  if (remt <= 0) {
    x.stop();
    $('p').show();
  }
}

function start() {
  $('p').hide();
  clocktimer = setInterval("update()", 250);
  x.start();
}

function stop() {
  x.stop();
  clearInterval(clocktimer);
}

function reset() {
  stop();
  x.reset();
  update();
}