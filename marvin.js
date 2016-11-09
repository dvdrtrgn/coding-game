var inputs = readline().split(' ');
var width = parseInt(inputs[1]); //       width of the area
var numFloors = parseInt(inputs[0]); //   number of floors
var numRounds = parseInt(inputs[2]); //   maximum number of rounds
var exitFloor = parseInt(inputs[3]); //   floor on which the exit is found
var exitPos = parseInt(inputs[4]); //     position of the exit on its floor
var totalClones = parseInt(inputs[5]); // number of generated clones
var totalElevs = parseInt(inputs[7]); //  number of elevators
var extraElevs = parseInt(inputs[6]); //  ignore (always zero)
var gameInfo = {
  width, exitPos, exitFloor, numFloors, totalElevs
};
var floorsInfo = [];
for (var i = 0; i < totalElevs; i++) {
  var inputs = readline().split(' ');
  var elevFloor = parseInt(inputs[0]); // floor on which this elevator is found
  var elevPos = parseInt(inputs[1]); //   position of the elevator on its floor
  floorsInfo[elevFloor] = elevPos;
}
floorsInfo[exitFloor] = exitPos;
printErr('\ngame loop');
while ((inputs = readline())) {
  inputs = inputs.split(' ');
  var clonePos = parseInt(inputs[1]); // position of the leading clone on its floor
  var direction = inputs[2]; // direction of the leading clone: LEFT or RIGHT
  var cloneFloor = parseInt(inputs[0]); // floor of the leading clone
  var exit = floorsInfo[cloneFloor];
  if (exit < clonePos && direction === 'RIGHT') {
    print('BLOCK');
  } else if (exit > clonePos && direction === 'LEFT') {
    print('BLOCK');
  } else {
    print('WAIT'); // action: WAIT or BLOCK
  }
}
