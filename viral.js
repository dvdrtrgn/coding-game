//
function dump(root, meth) {
  var obj = (meth ? root[meth] : root);
  var fun = (typeof obj === 'function');
  console.info([meth, fun ? obj() : obj]);
}

function makeNode(name, parent) {
  var children = []
  var obj = {
    getId: () => name,
    getParent: () => parent,
    addChild: (node) => children.push(node),
    getChildren: () => children.slice(),
    listChildren: () => children.map(o => o.toString()),
    valueOf: () => ({
      [name]: obj
    }),
    toString: function () {
      var arr = [name, ' @', obj.getDepth(), '+[', obj.listChildren(), ']'];
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
  var c = makeNode('baz', a);
  return a;
}

var par = testParent();
dump(par);
dump(par, 'valueOf');
dump(par, 'toString');
dump(par, 'getId');
dump(par, 'getChildren');
dump(par, 'listChildren');
