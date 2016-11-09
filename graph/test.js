'use strict';
const U = require('./Util');
const readline = require('./readline');
const print = console.log;
const printErr = console.error;

var inputs = readline().split(' ').map(Number);
var data = { // 1 num_nodes, 2 num_links, 3 num_exits
  links: Array(inputs[1]).fill().map(readline),
  exits: Array(inputs[2]).fill().map(readline),
};
data.links = data.links.map(v => v.split(' '));
// game loop
while ((data.read = readline())) {
  data.skynIDs = U.filter_for(data.links, data.read);
  data.exitIDs = U.filter_any(data.links, data.exits);
  data.bothIDs = U.intersects(data.skynIDs, data.exitIDs);
  let rez = data.bothIDs[0] || U.compress(data.skynIDs)[0];
  print(rez.join(' '));
}
