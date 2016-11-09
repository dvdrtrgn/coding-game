var prerr = function (...arr) {
  printErr(arr.map(a => a.join && a.join(':') || a).join(' | '));
};
var R = () => readline().split(' ');
var RN = () => R().map(Number);

// X/Y coordinates used to draw the surface
var POINTS = RN();
for (var i = 0; i < POINTS; i++) {
  var [landX, landY] = RN();
  prerr('xy', [landX, landY]);
}

function sp2pow(sp, adj = 1) {
  sp = sp / (-10 * adj);
  sp = Math.min(Math.max(sp, 0), 4);
  return Math.round(sp);
}

// game loop
while (true) {
  var [X, Y, hMps, vMps, fuel, rotate, power] = RN();
  // H/V speed(±m/s) & fuel(liters) & rotation(±90°) & thrust(0–4 Lps)
  prerr(['xy', X, Y], [hMps, vMps], ['gas', fuel], [rotate, power]);

  var rez = 0;
  print('0 ' + sp2pow(vMps)); // [[rotation] [power]]
}
