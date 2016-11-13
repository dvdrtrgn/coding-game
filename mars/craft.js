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

var Craft = (function () {
  var W = window;
  var C = W.console;
  var box = $('#Space');
  var rok = $('#Craft');
  var timer;
  var height;
  var motion;
  var coord;
  var start;
  var ground = box.height() - rok.height() / 2.5;

  function drop() {
    C.log(Date.now() - start, height);
    rok.setCenter(coord.x, height).addClass('ani');
    motion += 3;
    height = Math.min(height + motion, ground);
    if (height >= ground) {
      W.clearInterval(timer);
      rok.setCenter(coord.x, height);
    }
  }
  function thrust() {
    motion -= 4;
  }
  box.on('click', function (evt) {
    clearInterval(timer);
    coord = makeCoord(evt);
    rok.removeClass('ani').setCenter(coord.x, coord.y);
    height = coord.y;
    motion = 0;
    start = Date.now();
    timer = W.setInterval(drop, 100);
  });

  $(W).on('keypress', thrust);

}());


/*
for each beat

gravity pulls it down by m p sps

angle determines x along with thrust

*/
