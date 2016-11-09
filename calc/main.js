function calc(str) {
  var o1, o2, op;
  //take string
  if (typeof str !== 'string') throw Error('string please');

  function $(sel) {
    return document.querySelectorAll(sel);
  }

  function io(str, op) {
    $('textarea')[0].value += (op ? ` ${str} ` : str);
  }
  // input operand 1
  // return output (o1)
  // input operator
  // return output (o1 op)
  // input operand 2
  // return output (o1 op o2)

  function bind(ele) {
    console.log(ele);
    ele.addEventListener('click', function (evt) {
      var op = (ele.classList.contains('op'));
      io(ele.innerText, op);
    });
  }
  $('.calc td').forEach(bind);
  io(str);
}
calc('run... ');



//
