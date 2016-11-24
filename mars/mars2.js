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

function deterAng(goal, pos, sp) {
  var off = goal - pos;
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

while (true) {
  var [X, Y, hMps, vMps, fuel, rotate, power] = RN();
  // H/V speed(±m/s) & fuel(liters) & rotation(±90°) & thrust(0–4 Lps)

  Altitude = Altitude || x2alt(X);
  Landing = Landing || findFlatNear(X);
  Target = getDistance(X, Landing);

  prerr(['Altitude', Altitude], ['Landing', Landing], ['Target', Target]);

  var pow = clip(vMps / -5, 0, 4) | 0;
  var rot = deterAng(Target, X, hMps);

  print(rot + ' ' + pow); // [[rotation] [power]]
}


/*



first get to the proper x (unless the target is simple)
maintain y (more for the higher)
make it easy to coast to, center
calculate y loss from angle
get up to speed and coast (do not rush to stop)
fire retro in advance
plan for initial speeds take speed from moment to moment
  ask, am i going in the right direction
  calculate time to stop like gravity in reverse
  equate thrust to inertia and time
  thrust is acceleration
  the time curve should be comparable
  run thru curve normalizer forward and reverse
