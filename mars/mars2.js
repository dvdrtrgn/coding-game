var avgvel = 3.711 / 2 / 10;
var getDist = (time) => Math.pow(time, 2) * avgvel;
var getDiff = (t1, t2) => getDist(t2 || t1 + 1) - getDist(t1);

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

function findZones(xys) {
  var arr = []; // find flat areas
  xys.reduce(function (xyA, xyB, i) {
    if (xyA[1] === xyB[1]) { // consecutive Ys
      arr.push([xyA[1], xyA[0], xyB[0]]);
    }
    return xyB;
  });
  return arr; // y x1 x2
}

// X/Y coordinates used to draw the surface
var POINTS = Array(RN().pop()).fill().map(RN);
var ZONES = findZones(POINTS);
printErr(POINTS, '\n zones ', ZONES);

function getDistance(x, flat) {
  if (x < flat[0]) return flat[0] + 100;
  if (x > flat[1]) return flat[1] - 100;
  return x; // mid(flat[0], flat[1]);
}

function findNearZone(xpos, zones) {
  var arr = zones.reduce(function (yxxA, yxxB) {
    return (xpos < mid(yxxA[2], yxxB[1])) ? yxxA : yxxB; // get closest flat
  }).concat();
  return {
    alt: arr.shift(),
    range: arr,
  };
}

// adjust angle according to how far from x1 and x2
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
var LZ;
var Altitude;
var Landing;
var Target;
var Offby;
var DISTS = [0, 0];

while (true) {
  var [X, Y, Xsp, Ysp, fuel, rotate, power] = RN();
  // H/V speed(±m/s) & fuel(liters) & rotation(±90°) & thrust(0–4 Lps)
  LZ = findNearZone(X, ZONES);
  Altitude = LZ.alt;
  Landing = LZ.range;
  Target = getDistance(X, Landing);
  Offby = Target - X;
  DISTS = [Offby, Altitude - Y];

  prerr(['Target X/Y', Target, Altitude], ['Dists', DISTS]);

  var pow = clip(Ysp / -5, 0, 4) | 0;
  var rot = deterAng(Offby, X, Xsp);

  print(rot + ' ' + pow); // [[rotation] [power]]
}
