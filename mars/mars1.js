function sp2pow(speed, dist, adj = 9.6) {
  var kms = dist / 1000;
  var mag = Math.round((kms * adj + speed) / -adj);
  var pow = Math.min(Math.max(mag, 0), 4);
  //prerr('sp2pow', [speed, dist], [mag, pow]);
  return pow;
}

function prerr(...arr) {
  printErr(arr.map(a => a.join && a.join(':') || a).join(' | '));
}

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// init vars
var R = () => readline().split(' ');
var RN = () => R().map(Number);

// X/Y coordinates used to draw the surface
var POINTS = Array(RN().pop()).fill().map(RN);
var x2alt = x => POINTS.reduce((a, b) => (x > a[0]) ? a : b)[1];

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// game loop
var Altitude;

while (true) {
  var [X, Y, hMps, vMps, fuel, rotate, power] = RN();
  prerr(['xy', X, Y], [hMps, vMps], ['gas', fuel], [rotate, power]);
  // H/V speed(±m/s) & fuel(liters) & rotation(±90°) & thrust(0–4 Lps)

  Altitude = Altitude || x2alt(X);

  var pow = sp2pow(vMps, (Y - Altitude));
  var rot = '0';

  print(rot + ' ' + pow); // [[rotation] [power]]
  //print('0 ' + (vMps < -39 ? '4' : '0'));
}
/*

















 */
