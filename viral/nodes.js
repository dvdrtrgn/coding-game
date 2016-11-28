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

var par = testParent();
