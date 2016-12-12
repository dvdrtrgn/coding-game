var Reach = (function () {
  var Api, DATA, LIST, MAX;
  var XSR = [];

  function makeXsr(num) {
    if (XSR[num]) return XSR[num];
    XSR[num] = {
      nom: num,
      get: () => LIST[num] = (LIST[num] || 1),
      set: (val) => LIST[num] = val,
    };
    console.log(num, XSR[num]);
    return XSR[num];
  }

  function process(par, kid) {
    [par, kid] = [makeXsr(par), makeXsr(kid)];

    var depth = par.get() + 1;
    updateMax(kid.set(depth));
    return depth;
  }

  const parsi = parseInt;
  const processString = (str) => process.apply(0, str.split(' '));
  const sort = (arr) => arr.slice().sort((a, b) => parsi(a) - parsi(b));
  const updateMax = (num) => MAX.set(Math.max(MAX.get(), num || 1));

  function init(data) {
    DATA = data ? sort(data) : (DATA || []); // copy data
    LIST = [];
    MAX = makeXsr('_max_');
    DATA.map(processString);
    return Api;
  }

  Api = {
    'API': 'Reach',
    readData: () => DATA,
    readDepths: () => LIST,
    init: init,
    get length() {
      return DATA.length;
    },
    get depth() {
      return (updateMax()) | 0;
    },
  };

  return Api;
}());

/*

var N = parseInt(readline()); // the number of adjacency relations
var DAT = [];
for (var i = 0; i < N; i++) {
  DAT.push(readline());
}

Reach.init(DAT);
printErr('Nums', N);
printErr(Reach.readData());
print(Reach.depth); // minimum steps to propagate the ad

/*/

function test(data) {
  Reach.init(data);
  console.info(Reach);
  return ['Depth ' + Reach.depth, 'Length ' + Reach.length].join(' / ');
}

var D = require('./_data');

console.clear && console.clear();
//var z = [D.t0, D.t1, D.t2, D.t3, D.t4, D.t10].map(test);
var z = test(D.t10);
console.log(z);


//



//



//
