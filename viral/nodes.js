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

var t1 = ['0 1', '1 2', '2 3', '2 4']; //2
var t2 = ['0 1', '1 2', '1 4', '2 3', '4 5', '4 6']; //2
var t3 = ['0 1', '0 8', '0 15', '1 2', '1 5', '2 3', '2 4', '5 6', '5 7', '8 9', '8 12', '9 10', '9 11',
'12 13', '12 14', '15 16', '15 19', '16 17', '16 18', '19 20', '19 21']; //3
var t4 = ['171 26', '187 151', '118 176', '53 52', '129 33', '34 86', '13 1', '186 46',
'30 62', '78 25', '177 146', '96 101', '155 71', '126 69', '152 127', '154 64', '13 190',
'134 4', '70 41', '106 180', '144 17', '105 37', '181 163', '65 89', '101 34', '187 90',
'16 177', '34 106', '152 59', '117 189', '85 2', '62 9', '12 93', '163 102', '158 191',
'70 98', '30 36', '36 167', '154 67', '4 50', '121 39', '125 111', '18 178', '117 169',
'96 42', '47 38', '62 28', '123 94', '123 153', '132 105', '39 115', '116 154', '44 54',
'36 100', '96 7', '15 120', '33 0', '132 158', '181 184', '84 181', '25 63', '62 83',
'109 125', '138 107', '55 73', '116 13', '23 137', '147 103', '183 23', '72 132', '75 57',
'182 79', '40 14', '116 138', '109 77', '55 56', '156 40', '42 183', '18 160', '70 157',
'71 113', '121 70', '136 142', '57 92', '77 60', '125 108', '33 122', '158 170', '84 129',
'155 136', '159 84', '12 179', '165 91', '136 3', '177 130', '183 15', '66 150', '47 27',
'15 8', '7 134', '181 126', '129 117', '7 116', '118 12', '182 35', '158 139', '63 124',
'72 156', '4 145', '84 30', '39 140', '48 123', '47 162', '176 45', '53 61', '187 58',
'109 188', '36 21', '48 152', '30 20', '159 72', '85 149', '65 31', '5 55', '156 85',
'177 175', '20 161', '188 148', '57 19', '77 110', '40 74', '118 187', '163 112', '101 16',
'176 166', '152 164', '7 121', '43 48', '63 109', '106 11', '125 22', '188 143', '34 18',
'188 114', '23 10', '75 186', '184 32', '171 51', '165 172', '16 171', '124 147', '43 75',
'66 135', '5 53', '126 185', '25 43', '176 141', '71 24', '66 68', '105 173', '42 155',
'129 47', '15 131', '124 44', '85 97', '71 29', '138 49', '78 159', '121 182', '126 80',
'75 144', '147 88', '134 165', '144 87', '186 6', '42 5', '86 133', '72 118', '44 95',
'16 66', '184 128', '40 174', '184 119', '156 65', '12 81', '136 82', '144 76', '186 168',
'86 99', '78 96', '20 104']; //5
var t10 = ['6 8', '15 1', '1 14', '0 3', '15 13', '9 15', '2 5', '14 10', '4 9', '7 2', '8 7', '3 4', '1 6']; //5

console.clear();
[t1, t2, t3].map(testLoad);
var x = testLoad(t10);



//



//



//
