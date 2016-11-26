//
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
      var arr = [name, '@', this.getDepth()];
      return arr.join(' ');
    },
    getDepth: function () {
      var depth = 0,
        parent = this;
      while (parent && (parent = parent.getParent())) depth++;
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
console.log(par);
console.log(par.valueOf());
console.log(par.toString());
console.log(par.getId());
console.log(par.getChildren());
console.log(par.listChildren());
