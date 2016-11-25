var avgvel = 3.711 / 2 / 10;
var getDist = (time) => Math.pow(time, 2) * avgvel;
var getDiff = (t1, t2) => getDist(t2 || t1 + 1) - getDist(t1);

var mid = (n1, n2) => (n1 + n2) / 2;
var clip = (num, lo, hi) => Math.min(hi, Math.max(lo, num));
var dual = (num) => num > 0 ? [-num, num] : [num, -num];
var gate = (num, min) => (Math.abs(num) < min) ? 0 : num;
var bound = (num, abs) => (abs = dual(abs)) && clip(num, abs[0], abs[1]);
var round = (num) => Math.round(num);
var signify = (num, fact) => Math.sign(num) * (fact || 1);

function prerr(...arr) {
  printErr(arr.map(a => a.join && a.join(':') || a).join(' | '));
}

function makePoint(x, y, nom) {
  var obj = {
    x, y
  };
  obj.toString = () => `${nom||''}: [${obj.x}, ${obj.y}]`;
  obj.updateTo = (a, b) => (obj.x = a, obj.y = b, obj);
  return obj;
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
prerr(POINTS, '\nzones', ZONES);

function getDistance(x, flat) {
  var margin = 100;
  if (x < flat[0]) return flat[0] + margin;
  if (x > flat[1]) return flat[1] - margin;
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

function calcThrust(speed) {
  return clip(speed / -9, 0, 4) | 0;
}

function calcStop(sp, msp) {
  var mod, rot, pow = 4;

  rot = bound(Math.pow(msp.x, 3), 30);
  mod = Math.log10(Math.pow(msp.y, 2));

  if (mod > 1) rot /= mod;
  if (msp.y > 10) pow--;
  if (sp.x * sp.x < 10) pow = calcThrust(sp.y);

  return round(rot) + ' ' + round(pow);
}

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// game loop
var LZ;
var DISTS = makePoint(0, 0, 'Distance');
var GO_TO = makePoint(0, 0, 'Go to');
var SPEED = makePoint(0, 0, 'Speeds');
var MODSP = makePoint(0, 0, 'Modify');
var ALTER = makePoint(0, 0, 'Alter');

while (true) {
  var [X, Y, Xsp, Ysp, fuel, rotate, power] = RN();
  // H/V speed(±m/s) & fuel(liters) & rotation(±90°) & thrust(0–4 Lps)
  LZ = findNearZone(X, ZONES);

  GO_TO.updateTo(getDistance(X, LZ.range), LZ.alt);
  DISTS.updateTo(GO_TO.x - X, GO_TO.y - Y);
  SPEED.updateTo(Xsp, Ysp);
  MODSP.updateTo(signify(DISTS.x, 30), signify(DISTS.y, 10));
  ALTER.updateTo(SPEED.x - MODSP.x, SPEED.y - MODSP.y);

  prerr('XYs', GO_TO, DISTS, SPEED, ALTER);

  print(calcStop(SPEED, ALTER)); // [[rotation] [power]]
}
