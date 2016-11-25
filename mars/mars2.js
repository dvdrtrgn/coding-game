var avgvel = 3.711 / 2 / 10;
var getDist = (time) => Math.pow(time, 2) * avgvel;
var getDiff = (t1, t2) => getDist(t2 || t1 + 1) - getDist(t1);

var mid = (n1, n2) => (n1 + n2) / 2;
var clip = (num, lo, hi) => Math.min(hi, Math.max(lo, num));
var dual = (num) => num > 0 ? [-num, num] : [num, -num];
var gate = (num, min) => (Math.abs(num) < min) ? 0 : num;
var bound = (num, abs) => (abs = dual(abs)) && clip(num, abs[0], abs[1]);
var round = (num) => Math.round(num);

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
  return clip(speed / -5, 0, 4) | 0;
}

// adjust angle according to how far from x1 and x2
function calcAngle(off, sp) {
  var abs = Math.abs(sp);
  var deg = bound(-off / abs, 45) | 0;
  var sos = bound(sp * abs, 15) | 0;
  var rot = deg ? deg + sp : sos;

  prerr(['off', off], ['deg', deg], ['sos', sos], ['rot', rot]);

  return bound(rot, 25) | 0;
}

function calcStop(sp) {
  var rot, pow = 4, mod;

    rot = bound(Math.pow(sp.x, 3), 30);
    mod = Math.log10(Math.pow(sp.y, 2));

    printErr(mod);
    if (mod > 1) rot /= mod;
    if (sp.y > 0) pow--;

  return round(rot)+ ' ' + round(pow);
}

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// game loop
var LZ;
var DISTS = makePoint(0, 0, 'Distance');
var GO_TO = makePoint(0, 0, 'Go to');
var SPEED = makePoint(0, 0, 'Speeds');

while (true) {
  var [X, Y, Xsp, Ysp, fuel, rotate, power] = RN();
  // H/V speed(±m/s) & fuel(liters) & rotation(±90°) & thrust(0–4 Lps)
  LZ = findNearZone(X, ZONES);

  GO_TO.updateTo(getDistance(X, LZ.range), LZ.alt);
  DISTS.updateTo(GO_TO.x - X, GO_TO.y - Y);
  SPEED.updateTo(Xsp, Ysp);

  prerr('XYs', GO_TO, SPEED, DISTS);

  var pow = calcThrust(Ysp);
  var rot = calcAngle(DISTS.x, Xsp);
  var rez = rot + ' ' + pow;

  rez = calcStop(SPEED);

  print(rez); // [[rotation] [power]]
}
