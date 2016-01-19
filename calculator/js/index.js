var main = function() {
  var total = 0;
  var op = "";
  var inp = 0;
  var dec = 0;

  function update(val) {
    $('#result').text(val);
    console.log("update: " + val);
  }

  function numeric(inVal) {
    //total = ((total + '').length > 14) ? "ERR" : total * 10 + inVal;
    if (dec == 0) {
      inp = inp * 10 + inVal;
    } else {
      inp = inp + Math.pow(10, dec) * inVal;
      dec--;
    }
    update(inp);
    console.log("numeric: " + op + ", inp: " + inp + ", total: " + total);
  }

  function operator(inVal) {
    if (op)
      equals();
    else {
      total = inp;
      inp = 0;
      dec = 0;
    }
    op = inVal;
    //update(inp);
    //return op;
    console.log("operator: " + op + ", inp: " + inp + ", total: " + total);
  }

  function equals() {
    switch (op) {
      case "/":
        total = total / inp;
        console.log("quotient");
        break;
      case "*":
        total = total * inp;
        console.log("product");
        break;
      case "-":
        total = total - inp;
        console.log("difference");
        break;
      case "+":
        total = total + inp;
        console.log("sum");
        break;
      default:
        update("ERR");
        cls;
    }
    update(total);
    op = '';
    inp = 0;
    dec = 0;
    console.log("equals: " + op + ", inp: " + inp + ", total: " + total);
  }

  function cls() {
    total = 0;
    op = "";
    inp = 0;
    dec = 0;
    update(total);
  }

  $('#b0').click(function() {
    numeric(0)
  });
  $('#b1').click(function() {
    numeric(1)
  });
  $('#b2').click(function() {
    numeric(2)
  });
  $('#b3').click(function() {
    numeric(3)
  });
  $('#b4').click(function() {
    numeric(4)
  });
  $('#b5').click(function() {
    numeric(5)
  });
  $('#b6').click(function() {
    numeric(6)
  });
  $('#b7').click(function() {
    numeric(7)
  });
  $('#b8').click(function() {
    numeric(8)
  });
  $('#b9').click(function() {
    numeric(9)
  });
  $('#bd').click(function() {
    operator('/')
  });
  $('#bt').click(function() {
    operator('*')
  });
  $('#bm').click(function() {
    operator('-')
  });
  $('#bp').click(function() {
    operator('+')
  });
  $('#be').click(function() {
    equals()
  });
  $('#bc').click(function() {
    cls()
  });
  $('#bdec').click(function() {
    if (dec == 0) dec--;
    update(inp+'.');
  });
  update(total);
}

$(document).ready(main);