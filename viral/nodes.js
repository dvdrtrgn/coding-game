//
function dump(root, meth) {
  var obj = (meth ? root[meth] : root);
  var fun = (typeof obj === 'function');
  var out = (fun ? obj() : obj);
  console.info([root.getId(), meth, out, out + '']);
}

function makeNode(name, parent) {
  var children = []
  var obj = {
    name: name,
    getId: () => name,
    getParent: () => parent,
    setParent: (obj) => parent = obj,
    addChild: (node) => children.push(node),
    getChildren: () => children.slice(),
    getTop: (parent = obj) => {
      while (parent.getParent()) parent = parent.getParent();
      return parent;
    },
    listChildren: () => {
      var out = children.map(o => o.toString());
      return out.length ? `+[${out}]` : '';
    },
    valueOf: () => ({
      [name]: obj
    }),
    toString: function () {
      var arr = [name, ' @', obj.getDepth(), obj.listChildren()];
      return arr.join('');
    },
    getDepth: function (depth = 0, parent = obj) {
      while (parent = parent.getParent()) depth++;
      return depth;
    },
  };
  if (parent) {
    parent.addChild(obj);
  }
  return obj;
};

function testParent() {
  var a = makeNode('foo');
  var b = makeNode('bar', a);
  var c = makeNode('baz', b);
  dump(a);
  dump(a, 'getId');
  dump(a, 'valueOf');
  dump(a, 'toString');
  dump(a, 'getChildren');
  dump(b, 'listChildren');
  dump(c, 'getTop');
  return a;
}

var IDX;

function handlePair(par, kid) {
  par = IDX[par] = (IDX[par] || makeNode(par));
  kid = IDX[kid] = (IDX[kid] || makeNode(kid));
  par.addChild(kid);
  kid.setParent(par);
}

function testLoad(arr) {
  IDX = [];
  arr.forEach(function (str) {
    [par, kid] = str.split(' ');
    handlePair(par, kid);
  });

  return IDX;
}

// var par = testParent();
var x = testLoad(['1 2', '2 3', '3 4', '3 7', '4 5', '4 6', '7 8']);
