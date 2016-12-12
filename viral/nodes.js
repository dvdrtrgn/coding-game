//
function dump(root, meth) {
  var node = (meth ? root[meth] : root);
  var fun = (typeof node === 'function');
  var out = (fun ? node() : node);
  console.info([root.getId(), meth, out, out + '']);
}

function makeNode(name, parent, children = []) {
  const TAB = '\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t';
  var Index;
  var self = {
    name: name,
    get _array() {
      return [name].concat(children.map((obj) => obj._array));
    },
    get _children() {
      return self.getChildren();
    },
    get _parent() {
      return parent;
    },
    get _string() {
      return self.toString();
    },
    add: function (kid) {
      self.addChild(kid);
      kid.setParent(self);
    },
    getId: () => self.name = name,
    getParent: () => parent,
    setParent: (obj) => (obj !== self) && (parent = obj),
    addChild: (obj) => children.push(obj),
    getChildren: () => children.slice(),
    getTop: (parent = self) => {
      while (parent.getParent()) parent = parent.getParent();
      return parent;
    },
    listChildren: () => {
      var out = children.map(o => o.toString());
      return out.length ? `${out.join('')}` : '';
    },
    valueOf: () => ({
      [name]: self,
    }),
    toString: function () {
      var indent = TAB.slice(0, 1 + self.getDepth());
      return `${indent}${name}${self.listChildren()}`;
    },
    getDepth: function (depth = 0, parent = self) {
      while (parent = parent.getParent()) depth++;
      return depth;
    },
    report: function (arr = []) {
      Index = arr;
      Index.push(self);
      children.forEach(node => node.report(Index));
    },
    regenIndex: function () {
      self.getTop().report();
      Index.byId = function () {
        var arr = [];
        Index.forEach(o => arr[o.getId()] = o);
        return arr;
      };
      return Index;
    },
  };
  if (parent) {
    parent.addChild(self);
  }
  return self;
};

function testLoad(arr) {
  var par, kid, IDX = [];

  let pad = (str) => str.replace(' ', '.000000000000'.slice(0, 12 - str.length));
  let sort = (arr) => arr.sort((a, b) => {
    return parseFloat(pad(a)) - parseFloat(pad(b));
  });

  sort(arr).forEach(function (str) {
    [par, kid] = str.split(' ');
    par = IDX[par] = (IDX[par] || makeNode(par));
    kid = IDX[kid] = (IDX[kid] || makeNode(kid));
    par.add(kid);
  });
  var rez = par.getTop();
  console.log(IDX.map(o => o.name));
  console.log(rez._string);
  return rez;
}

var D = require('./_data');

console.clear && console.clear();
[D.t1, D.t2, D.t3].map(testLoad);
var x = testLoad(D.t10);



//



//



//
