var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

var iconDict = {
  "01d": "wi-day-sunny",
  "01n": "wi-night-clear",
  "02d": "wi-day-sunny-overcast",
  "02n": "wi-night-alt-partly-cloudy",
  "03d": "wi-day-cloudy-high",
  "03n": "wi-night-alt-cloudy-high",
  "04d": "wi-cloud",
  "04n": "wi-night-cloudy",
  "09d": "wi-day-showers",
  "09n": "wi-night-showers",
  "10d": "wi-day-rain",
  "10n": "wi-night-rain",
  "11d": "wi-day-thunderstorm",
  "11n": "wi-night-thunderstorm",
  "13d": "wi-day-snow",
  "13n": "wi-night-snow",
  "50d": "wi-day-fog",
  "50n": "wi-night-fog",
}

function success(pos) {
  var crd = pos.coords;
  var lat = crd.latitude;
  var lon = crd.longitude;

  $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=422631c64dd63017154549244d9f4100", function(json) {
    var cty = json.name;
    $("#location").text(cty);
    var tmpC = json.main.temp - 273.15;
    var tmp = $("#myonoffswitch").is(':checked') ? Math.floor(tmpC * 1.8 + 32) : Math.floor(tmpC);
    $("#temperature").text(tmp + "°" + '');
    var icon = json.weather[0].icon;
    $("#picture").html('<i class="wi ' + iconDict[icon] + '"></i>');
    var desc = json.weather[0].main;
    $("#description").text(desc);
  });
};

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};

function getWx() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error, options);
  };
};

function main() {
  getWx();

  $("#myonoffswitch").click(function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error, options);
    };
  })
};

$('document').ready(main);