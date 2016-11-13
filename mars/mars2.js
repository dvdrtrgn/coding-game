function findFlats(where) {
  var arr = []; // find flat areas
  POINTS.reduce(function (a, b, i) {
    if (a[1] === b[1]) arr.push([a[0], b[0]]);
    return b; // seek consecutive Xs with same Y
  });
  if (where) arr = arr.reduce(function (a, b) {
    return (where < mid(a[1], b[0])) ? a : b;
  }); // get closest flat
  return arr;
}

function sp2pow(sp, dist, adj = 0.1) {
  var kms = dist / 1000;
  var mag = Math.round((kms * adj + sp) / -adj);
  var pow = Math.min(Math.max(mag, 0), 4);
  //prerr('sp2pow', [sp, dist], [mag, pow]);
  return pow;
}

var mid = (a, b) => (a + b) / 2;
var clip = (n, a, z) => Math.min(z, Math.max(a, n));
var blot = (n, m) => (Math.abs(n) < m) ? 0 : n;

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


function getDistance(x) {
  if (x < Landing[0]) return Landing[0] + 100;
  if (x > Landing[1]) return Landing[1] - 100;
  return x; // mid(Landing[0], Landing[1]);
}
// adjust angle according to how far from x1 and x2

var DIST = 0;

function deterAng(goal, pos, sp) {
  DIST = DIST || goal - pos;
  var sig = DIST < 0 ? -1 : 1;
  var mid = DIST / (2 - Math.abs(sp / 123)) | 0;
  var ang;
  var off = goal - pos;

  if (off * sig > mid * sig) {
    ang = -30 * sig;
    printErr('not yet');
  } else {
    ang = sp;
  }
  ang = clip(ang, -45, 45);
  prerr(['DIST', DIST], ['off', off], ['mid', mid], ['sig', sig]);
  return blot(ang, 2);
}

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// game loop
var Altitude;
var Landing;
var Target;

while (true) {
  var [X, Y, hMps, vMps, fuel, rotate, power] = RN();
  // H/V speed(±m/s) & fuel(liters) & rotation(±90°) & thrust(0–4 Lps)

  Altitude = Altitude || x2alt(X);
  Landing = Landing || findFlats(X);
  Target = Target || getDistance(X);

  prerr(['Altitude', Altitude], ['Landing', Landing], ['Target', Target]);

  var pow = sp2pow(vMps, (Y - Altitude));
  var rot = deterAng(Target, X, hMps);

  print(rot + ' ' + pow); // [[rotation] [power]]
}
