var inputs = readline().split(' ');
var W = parseInt(inputs[0]); // width of the building.
var H = parseInt(inputs[1]); // height of the building.
var N = parseInt(readline()); // maximum number of turns before game over.
var inputs = readline().split(' ');
var X0 = parseInt(inputs[0]);
var Y0 = parseInt(inputs[1]);
printErr(W, H, N, X0, X0);
var bombDir;
var magX = W - 1;
var magY = H - 1;
var dirX = 1;
var dirY = 1;

function maxmin(n, max) {
  n = Math.max(0, n);
  n = Math.min(n, max);
  return n;
}

function parseDir(str) {
  dirY = dirX = 0;
  str.match('U') && (dirY = -1);
  str.match('D') && (dirY = +1);
  str.match('L') && (dirX = -1);
  str.match('R') && (dirX = +1);
  printErr('dir', dirX, dirY);
}

function calcJump(str) {
  parseDir(str);
  magX = (Math.round(magX / 2)) || 1;
  magY = (Math.round(magY / 2)) || 1;
  X0 = X0 + (dirX * magX);
  Y0 = Y0 + (dirY * magY);
  return [maxmin(X0, W - 1), maxmin(Y0, H - 1)];
}

// game loop
while ((bombDir = readline())) {
  // from current location (U, UR, R, DR, D, DL, L or UL)
  var dir = calcJump(bombDir);
  printErr(bombDir, dir);
  // the location of the next window Batman should jump to.
  print(dir.join(' '));
}
