var [W, H] = readline().split(' '); // number of columns, rows.
printErr(W, H);

var LINES = [];
for (var i = 0; i < H; i++) {
  var LINE = readline().split(' ');
  LINES.push(LINE);
  printErr(i, LINE);
}
var EX = parseInt(readline());
// the coordinate along the X axis of the exit
// (not useful for this first mission, but must be read).
function transVect(vect, dir) {
  var Trans = {
    D: 'D',
    L: 'L',
    R: 'R',
  }
  vect.split('+').forEach(function (str) {
    var arr = str.split('');
    Trans[arr[0]] = arr[1];
  });
  return Trans[dir];
}
var DIR = 'D'; // assume gravity
var VECTS = ',LD+RD,,,DL+LD+RX,DR+RD+LX,DX,LD,LD+RD,RD,DL+RX,DR+LX,LD,RD'.split(',');
// game loop
while (true) {
  var inputs = readline().split(' ');
  printErr(inputs);
  var XI = parseInt(inputs[0]);
  var YI = parseInt(inputs[1]);
  var POS = inputs[2];

  var room = LINES[YI][XI];
  var vect = VECTS[room];
  DIR = transVect(vect, DIR);
  if (DIR === 'D') YI++;
  if (DIR === 'L') XI--;
  if (DIR === 'R') XI++;
  // One line predicting the X Y coordinates
  print([XI, YI].join(' '));
}
