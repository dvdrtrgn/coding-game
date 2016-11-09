const C = console;
const Combo = (function () {
  // n = choices / r = places
  const F = (n) => n > 0 ? n * F(n - 1) : 1; // Factorial
  const P = (n, r) => F(n) / F(n - r); // Permute
  const C = (n, r) => F(n) / (F(r) * F(n - r)); // Choose
  return {
    permuRepeat: (n, r) => Math.pow(n, r),
    permuUnique: (n, r) => P(n, r),
    comboRepeat: (n, r) => C(n + r - 1, r),
    comboUnique: (n, r) => C(n, r) | 0,
    arrayOfEach: function (n, r) {
      return [
        'Prep:' + this.permuRepeat(n, r),
        'Puni:' + this.permuUnique(n, r),
        'Crep:' + this.comboRepeat(n, r),
        'Cuni:' + this.comboUnique(n, r),
      ];
    },
  };
}());

function makeCombo(list, digits) {
  list = list.map ? list : list.split('');
  digits = digits > 0 ? digits : 1;
  console.log(Combo.arrayOfEach(list.length, digits));

  let [all, dig, val] = [[]];
  const makeDigit = function (arr, cb) {
    let [i, l] = [0, arr.length];
    return {
      val: () => arr[i %= l],
      inc: () => (++i == l) && cb(),
      cb: (fn) => cb = fn,
    };
  };

  while (digits--) {
    let carry = dig ? dig.inc : () => all = false;
    all.push(dig = makeDigit(list, carry));
  }
  return {
    val: () => val && val.join(''),
    inc: function () {
      if (all) {
        val = all.map(e => e.val());
        dig.inc();
      } else val = undefined;
      return Boolean(val);
    }
  };
}

function permAlone(str) {
  let R = str.split('').sort();
  let N = R.filter((e,i,a) => !~a.indexOf(e, i+1)); // dedupe
  let [n, r] = [N.length, R.length];
  let Z = Combo.permuUnique(n, r);

  makeCombo(N.join(''), r);
  console.log([n, r], N, R, Z);
}
permAlone('abcdefa');
permAlone('abfdefa');
permAlone('aaabb');

//var x = makeCombo('abcdef', 7);
//while (x.inc()) C.log(x.val());

// [ 6, 7 ] diff 1 [ 'a', 'b', 'c', 'd', 'e', 'f' ] [ 'a', 'a', 'b', 'c', 'd', 'e', 'f' ] 720 // should return 3600 (*5)
// [ 5, 7 ] diff 2 [ 'a', 'b', 'd', 'e', 'f' ] [ 'a', 'a', 'b', 'd', 'e', 'f', 'f' ] 120 // should return 2640 (*22)
// [ 2, 5 ] diff 3 [ 'a', 'b' ] [ 'a', 'a', 'a', 'b', 'b' ] 2 // should return 12 (*6)

//
