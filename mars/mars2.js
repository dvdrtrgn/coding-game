var avgvel = 3.711 / 2 / 10;
var getDist = (time) => Math.pow(time, 2) * avgvel;
var getDiff = (t1, t2) => getDist(t2 || t1 + 1) - getDist(t1);

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

function deterAng(off, pos, sp) {
  var abs = Math.abs(sp);
  var deg = clip(-off / abs, -45, 45) | 0;
  var sos = clip(sp * abs, -45, 45) | 0;
  var rot = deg ? deg + sp : sos;

  prerr(['off', off], ['deg', deg], ['sos', sos], ['rot', rot]);

  return clip(rot, -45, 45) | 0;
}

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// game loop
var Altitude;
var Landing;
var Target;
var Offby;

while (true) {
  var [X, Y, hMps, vMps, fuel, rotate, power] = RN();
  // H/V speed(±m/s) & fuel(liters) & rotation(±90°) & thrust(0–4 Lps)

  Altitude = Altitude || x2alt(X);
  Landing = Landing || findFlatNear(X);
  Target = getDistance(X, Landing);
  Offby = Target - X;

  prerr(['Alt', Altitude], ['Flat', Landing], ['Targ', Target], ['Off', Offby]);

  var pow = clip(vMps / -5, 0, 4) | 0;
  var rot = deterAng(Offby, X, hMps);

  print(rot + ' ' + pow); // [[rotation] [power]]
}
