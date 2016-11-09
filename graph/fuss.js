var agent, other, near;

var r = readline;
var [num_nodes, num_links, num_exits] = r().split(' ');
var all_nodes = []; // Nodes

while (num_nodes--) all_nodes.push([]); // Nodes Infos
while (num_links--) { // Nodes Infos Neighbors
  var [nL, nR] = r().split(' ');
  all_nodes[nL].push(nR);
  all_nodes[nR].push(nL);
}
while (num_exits--) all_nodes[r()].push('G'); // Nodes Infos Exits

while (agent = r()) { // agent node
  for (near in all_nodes[agent]) {
    other = all_nodes[agent][near];
    // each linked node to agent node
    if (~all_nodes[other].indexOf('G')) break;
  }
  print(agent + ' ' + other);
}
