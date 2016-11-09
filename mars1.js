var error = function (...arr) {
  printErr(arr.map(a => a.join && a.join(':') || a).join(' | '));
};
var R = () => readline().split(' ');
var RN = () => R().map(Number);

var POINTS = RN(); // points used to draw the surface
for (var i = 0; i < POINTS; i++) {
  var [landX, landY] = RN();
  error(['xy', landX, landY]); // X/Y coordinates each point
}
var V = -1;
// game loop
while (true) {
  var [X, Y, hMps, vMps, fuel, rotate, power] = RN();
  // H/V speed(±m/s) & fuel(liters) & rotation(±90°) & thrust(0–4 Lps)

  var rez = Math.min(((V += 0.24) | 0), 4);
  error(['xy', X, Y], [hMps, vMps], ['gas', fuel], [rotate, power]);
  print('0 ' + rez); // [[rotation] [power]]
}
