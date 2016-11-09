var prerr = function (...arr) {
  printErr(arr.map(a => a.join && a.join(':') || a).join(' | '));
};
var R = () => readline().split(' ');
var RN = () => R().map(Number);

// X/Y coordinates used to draw the surface
var POINTS = RN();
for (var i = 0; i < POINTS; i++) {
  var [landX, landY] = RN();
  prerr('xy', [landX, landY]);
}
var V = -1;
// game loop
while (true) {
  var [X, Y, hMps, vMps, fuel, rotate, power] = RN();
  // H/V speed(±m/s) & fuel(liters) & rotation(±90°) & thrust(0–4 Lps)

  var rez = Math.min(((V += 0.24) | 0), 4);
  prerr(['xy', X, Y], [hMps, vMps], ['gas', fuel], [rotate, power]);
  print('0 ' + rez); // [[rotation] [power]]
}
