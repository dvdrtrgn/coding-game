function findFlatNear(xpos) {
  var arr = []; // find flat areas
  POINTS.reduce(function (a, b, i) { // [xy] [xy] count
    if (a[1] === b[1]) arr.push([a[0], b[0]]); // Xs w/consecutive Ys
    return b;
  });
  if (xpos) arr = arr.reduce(function (a, b) {
    return (xpos < mid(a[1], b[0])) ? a : b; // get closest flat
  });
  return arr;
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


function getDistance(x, flat) {
  if (x < flat[0]) return flat[0] + 100;
  if (x > flat[1]) return flat[1] - 100;
  return x; // mid(flat[0], flat[1]);
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
  Landing = Landing || findFlatNear(X);
  Target = Target || getDistance(X);

  prerr(['Altitude', Altitude], ['Landing', Landing], ['Target', Target]);

  var pow = (vMps/-6) | 0;
  var rot = deterAng(Target, X, hMps);

  print(rot + ' ' + pow); // [[rotation] [power]]
}
