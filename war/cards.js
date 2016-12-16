'use strict';
const print = console.log;
const printErr = console.error;

var data = {
  a1: '5C,3D,2C,7D,8C,7S,5D,5H,6D,5S,4D,6H,6S,3C,3S,7C,4S,4H,7H,4C,2H,6C,8D,3H,2D,2S'.split(','),
  a2: 'AC,9H,KH,KC,KD,KS,10S,10D,9S,QD,JS,10H,8S,QH,JD,AD,JC,AS,QS,AH,JH,10C,9C,8H,QC,9D'.split(','),
};
function cval(str) {
  str = str.slice(0, -1);
  return '2345678910JQKA'.indexOf(str);
}
function pstr(val) {
  if (!val) return 'Draw!';
  return `Player ${val<0?1:2} wins`;
}
function battle(c1, c2) {
  var [x, y] = [cval(c1), cval(c2)];
  var z = pstr(Math.sign(y - x));
  console.log('battle', {
    c1, c2, z
  });
}
function marry(a1, a2) {
  return a1.map((x, i) => [x, a2[i]]);
}
marry(data.a1, data.a2).forEach(a => battle.apply(0, a));

var p1cards = Array(+readline()).fill().map(readline); // cards of player 1
var p2cards = Array(+readline()).fill().map(readline); // cards of player 2

printErr('p1', p1cards)
printErr('p2', p2cards)

print('PAT');
