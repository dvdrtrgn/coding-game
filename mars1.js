var prerr = function (...arr) {
  printErr(arr.map(a => a.join && a.join(':') || a).join(' | '));
};
var R = () => readline().split(' ');
var RN = () => R().map(Number);

// X/Y coordinates used to draw the surface
var POINTS = Array(RN().pop()).fill().map(RN);

function x2alt(x) {
  var rez = POINTS.reduce((a, b) => (x > a[0]) ? a : b);
  return rez[1];
}

function sp2pow(speed, dist, adj = 8.8) {
  var km = Math.round(dist / 1000);
  var kx = speed + km * adj;
  var sq = Math.round(kx / -adj);
  var sp = Math.min(Math.max(sq, 0), 4);
  prerr('sp2pow', [speed, dist], [km, kx, sq]);
  return sp;
}

// game loop
landY = '';

while (true) {
  var [X, Y, hMps, vMps, fuel, rotate, power] = RN();
  // H/V speed(±m/s) & fuel(liters) & rotation(±90°) & thrust(0–4 Lps)
  prerr(['xy', X, Y], [hMps, vMps], ['gas', fuel], [rotate, power]);
  landY = landY || x2alt(X);

  var dist = (Y - landY);
  print('0 ' + sp2pow(vMps, dist)); // [[rotation] [power]]
}
