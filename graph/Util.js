let entries = o => Object.keys(o).map(k => [k, o[k]]);

var U = {
  compress: (arr) => arr.filter(a => a),
  filter_for: function (arrs, val) {
    return arrs.map(arr => U.within(arr, val) ? arr : '');
  },
  filter_any: function (arrs, vals) {
    return arrs.map(arr => {
      return vals.some(val => U.within(arr, val)) ? arr : '';
    });
  },
  intersects: function (a1, a2) {
    return a1.filter((val, idx) => val && a2[idx] === val);
  },
  within: (arr, val, idx) => arr.includes(val, idx),
};

module.exports = U;
