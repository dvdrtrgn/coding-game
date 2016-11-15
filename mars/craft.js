var W = window;
var C = W.console;
var avgvel = 1.6;
var getDist = (t, av) => Math.pow(t, 2) * (av || avgvel);
var getDiff = (t1, t2) => getDist(t2 || t1 + 1) - getDist(t1);
var setDefer = (fn) => W.setTimeout(fn, 1);

$.fn.setCenter = function (x, y) {
  var me = $(this);
  me.css({
    left: x - me.width() / 2,
    top: y - me.height() / 2,
  });
  return this;
};
$.fn.setAnima = function (b) {
  var me = $(this);
  b = `${b ? 'add' : 'remove'}Class`;
  setDefer(() => me[b]('ani'));
  return this;
};

function makeCoord(x, y, ele) {
  if ('offsetX' in x) {
    ele = x.target;
    y = x.offsetY;
    x = x.offsetX;
  }
  let Api = {
    x, y, ele
  };
  return Api;
}

function makeTimer(cback, delay) {
  var start, token, tick;
  let Api = {
    tick: () => tick++,
    read: () => Date.now() - start,
    gain: () => delay,
    set: function (fn, ms) {
      this.clear();
      [cback, delay] = [fn || cback, ms || delay];
      start = Date.now();
      token = window.setInterval(cback, delay);
    },
    clear: function () {
      window.clearInterval(token);
      tick = 0;
    },
  };
  if (cback && delay) Api.set(cback, delay);
  return Api;
}

var Craft = (function () {
  var box = $('#Space');
  var rok = $('#Craft');
  var clock = makeTimer();
  var ground = box.height() - rok.height() / 2.5;
  var lower;
  var coord;

  function dropping() {
    if (ground <= lower) {
      clock.clear();
      rok.setCenter(coord.x, lower)
      return rok.setAnima(0);
    }
    rok.setCenter(coord.x, lower);
    lower += getDiff(clock.tick());
    lower = Math.min(lower, ground) | 0;
    C.log(clock.read(), lower, clock.gain());
  }

  function thrusting() {
    clock.set();
    lower -= Math.pow(avgvel, 2);
  }
  box.on('click', function (evt) {
    if (evt.delegateTarget !== evt.target) throw 'click!';
    coord = makeCoord(evt);
    lower = coord.y;
    clock.set(dropping, 100);
    rok.setCenter(coord.x, coord.y).setAnima(1);
  });

  $(W).on('keypress', thrusting);

}());


/*
for each beat

gravity pulls it down by m p sps

angle determines x along with thrust

*/
