var W = window;
var C = W.console;

$.fn.setCenter = function (x, y) {
  var me = $(this);
  me.css({
    left: x - me.width() / 2,
    top: y - me.height() / 2,
  });
  return this;
}

function makeCoord(x, y) {
  var obj, ele;

  function useEvt(evt) {
    ele = x.target;
    y = x.offsetY;
    x = x.offsetX;
  }
  if ('offsetX' in x) useEvt(x);
  obj = {
    x, y, ele
  };
  return obj;
}

function makeTimer(fn, ms) {
  var start = Date.now();
  var token;
  var Api = {
    read: () => Date.now() - start,
    set: function (fn, ms) {
      start = Date.now();
      window.clearInterval(token);
      token = window.setInterval(fn, ms);
    },
    clear: function () {
      window.clearInterval(token);
    },
  };
  if (fn && ms) Api.set(fn, ms);
  return Api;
}

var Craft = (function () {
  var box = $('#Space');
  var rok = $('#Craft');
  var clock = makeTimer();
  var height;
  var avgvel = 16;
  var times;
  var coord;
  var ground = box.height() - rok.height() / 2.5;

  var getDist = (t, av) => Math.pow(t, 2) * (av || avgvel);
  var getDiff = (t1, t2) => getDist(t2 || t1 + 1) - getDist(t1);

  function drop() {
    times++;
    rok.setCenter(coord.x, height).addClass('ani');
    height = Math.min(height + getDiff(times), ground);
    if (height >= ground) {
      clock.clear();
      rok.setCenter(coord.x, height);
    }
    C.log(clock.read(), height, times);
  }

  function thrust() {
    times -= 4;
  }
  box.on('click', function (evt) {
    if (evt.delegateTarget !== evt.target) return;
    coord = makeCoord(evt);
    rok.removeClass('ani').setCenter(coord.x, coord.y);
    height = coord.y;
    times = -1;
    clock.set(drop, 100);
  });

  $(W).on('keypress', thrust);

}());


/*
for each beat

gravity pulls it down by m p sps

angle determines x along with thrust

*/
