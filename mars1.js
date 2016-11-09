var surfaceN = parseInt(readline()); // points used to draw the surface of Mars.

for (var i = 0; i < surfaceN; i++) {
  var [landX, landY] = readline().split(' ').map(parseInt);
  // X coordinate of a surface point. (0 to 6999)
  // Y coordinate of a surface point.
  // By linking all the points together in a sequential fashion, you form the surface
}
var v = -1;
// game loop
while (true) {
  var [X, Y, hSpeed, vSpeed, fuel, rotate, power] = readline().split(' ').map(parseInt);
  // H/V speed (±m/s) & fuel in liters & rotation(±90°) & thrust (0 to 4)

  // 2 integers: "rotate power".
  // rotate is the desired rotation angle (should be 0 for level 1),
  // power is the desired thrust power (0 to 4).
  print('0 ' + Math.min(((v += 0.24) | 0), 4));
}
