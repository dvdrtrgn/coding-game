function BFS(Graph, links, root) {

  var Api, G = {};
  let reset = (x) => (x.dist = null, x.stat = '');
  let resName = (x) => x.length ? x : x.id;
  let setRoot = (x) => (root = resName(x), Api);

  Graph.map((e, i, a) => {
    var node = { // node
      id: e,
      stat: '', // '' or found or mapped
      hood: [], /// scan links
      dist: null,
      prev: null,
    };
    G[e] = a[i] = node; // save to Object and Array
  });

  function distFrom(me) {
    var Q = [me = G[me || root]];

    Graph.map(reset);
    me.dist = 0;

    while (Q.length) {
      var home = Q.shift();
      home.hood.map(bro => {
        if (bro.dist === null) {
          bro.dist = home.dist + 1;
          bro.prev = home;
          Q.push(bro);
        }
      });
    }
  }
  Api = {
    data: G,
    from: setRoot,
    calc: distFrom,
  };

  if (root) distFrom();
  return Api;
}
