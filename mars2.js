function findFlats(where) {
  var arr = []; // find flat areas
  POINTS.reduce(function (a, b, i) {
    if (a[1] === b[1]) arr.push([a[0], b[0]]);
    return b; // seek consecutive Xs with same Y
  });
  if (where) arr = arr.reduce(function (a, b) {
    return (where < ((a[1] + b[0]) / 2)) ? a : b;
  }); // get closest flat
  return arr;
}

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


function seekFlat(x) {
  // adjust angle according to how far from x1 and x2
  if (x > LANDING[0] && x < LANDING[1]) 'all good';
}

function determAng(x) {
  var z = x - 4440;
  return Math.min(3, Math.round(z / 150));
}

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// game loop
var Altitude;
var Landing;
var V = 2.1;

while (true) {
  var [X, Y, hMps, vMps, fuel, rotate, power] = RN();
  prerr(['xy', X, Y], [hMps, vMps], ['gas', fuel], [rotate, power]);
  // H/V speed(±m/s) & fuel(liters) & rotation(±90°) & thrust(0–4 Lps)

  Altitude = Altitude || x2alt(X);
  Landing = Landing || findFlats(X);

  var pow = sp2pow(vMps, (Y - Altitude));
  var rot = determAng(X);

  print(rot + ' ' + pow); // [[rotation] [power]]
}
/*















 */
