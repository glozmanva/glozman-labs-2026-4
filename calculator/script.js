window.onload = function () {
  let a = '';
  let b = '';
  let expressionResult = '';
  let selectedOperation = null;

  const outputElement = document.getElementById("result");
  const digitButtons = document.querySelectorAll('[id^="btn_digit_"]');

  function show(value) {
    outputElement.textContent = value === '' ? '0' : value;
  }

  function onDigitButtonClicked(digit) {
    if (!selectedOperation) {
      if ((digit !== '.') || (digit === '.' && !a.includes('.'))) {
        a += digit;
      }
      show(a);
    } else {
      if ((digit !== '.') || (digit === '.' && !b.includes('.'))) {
        b += digit;
      }
      show(b);
    }
  }

  digitButtons.forEach(button => {
    button.onclick = function () {
      const digitValue = button.textContent.trim();
      onDigitButtonClicked(digitValue);
    };
  });

  document.getElementById("btn_op_mult").onclick = function () {
    if (a === '') return;
    selectedOperation = 'x';
  };

  document.getElementById("btn_op_plus").onclick = function () {
    if (a === '') return;
    selectedOperation = '+';
  };

  document.getElementById("btn_op_minus").onclick = function () {
    if (a === '') return;
    selectedOperation = '-';
  };

  document.getElementById("btn_op_div").onclick = function () {
    if (a === '') return;
    selectedOperation = '/';
  };

  document.getElementById("btn_op_clear").onclick = function () {
    a = '';
    b = '';
    selectedOperation = null;
    expressionResult = '';
    show('0');
  };

  document.getElementById("btn_op_equal").onclick = function () {
    if (a === '' || b === '' || !selectedOperation) return;

    const x = Number(a);
    const y = Number(b);

    if (selectedOperation === '/' && y === 0) {
      a = '';
      b = '';
      selectedOperation = null;
      expressionResult = '';
      show('Error');
      return;
    }

    switch (selectedOperation) {
      case 'x':
        expressionResult = x * y;
        break;
      case '+':
        expressionResult = x + y;
        break;
      case '-':
        expressionResult = x - y;
        break;
      case '/':
        expressionResult = x / y;
        break;
      default:
        return;
    }

    a = expressionResult.toString();
    b = '';
    selectedOperation = null;
    show(a);
  };

  document.getElementById("btn_op_sign").onclick = function () {
    if (!selectedOperation) {
      if (a === '' || a === '-') {
        a = (a === '-') ? '' : '-';
        show(a);
        return;
      }
      const n = Number(a);
      if (Number.isNaN(n)) return;
      a = (-n).toString();
      show(a);
    } else {
      if (b === '' || b === '-') {
        b = (b === '-') ? '' : '-';
        show(b);
        return;
      }
      const n = Number(b);
      if (Number.isNaN(n)) return;
      b = (-n).toString();
      show(b);
    }
  };

  document.getElementById("btn_op_percent").onclick = function () {
    if (!selectedOperation) {
      if (a === '' || a === '-') return;
      const n = Number(a);
      if (Number.isNaN(n)) return;
      a = (n / 100).toString();
      show(a);
    } else {
      if (b === '' || b === '-') return;
      const n = Number(b);
      if (Number.isNaN(n)) return;
      b = (n / 100).toString();
      show(b);
    }
  };

    document.getElementById("btn_op_backspace").onclick = function () {
    if (!selectedOperation) {
      if (a === '' || a === '0') {
        show('0');
        return;
      }
      a = a.slice(0, -1);
      if (a === '' || a === '-') {
        a = '';
        show('0');
        return;
      }
      show(a);
    } else {
      if (b === '' || b === '0') {
        show(a === '' ? '0' : a);
        return;
      }
      b = b.slice(0, -1);
      if (b === '' || b === '-') {
        b = '';
        show('0');
        return;
      }
      show(b);
    }
  };
  const themeBtn = document.getElementById('btn_theme');
  if (themeBtn) {
    themeBtn.onclick = function () {
        document.body.classList.toggle('theme-alt');
    };
}
function parseLimit() {
  const val = selectedOperation ? b : a;
  if (val === '' || val === '-') return null;
  const num = Number(val);
  if (!Number.isFinite(num) || num < 0) return null;
  return num;
}

function applyBudget(avgCost) {
  const limit = parseLimit();
  if (limit === null) {
    show('Введите лимит');
    return;
  }
  const count = Math.floor(limit / avgCost);
  a = count.toString();
  b = '';
  selectedOperation = null;
  expressionResult = '';
  show(a);
}

document.getElementById("btn_op_cam").onclick = function () {
  applyBudget(25);
};
document.getElementById("btn_op_spec").onclick = function () {
  applyBudget(45);
};
document.getElementById("btn_op_rad").onclick = function () {
  applyBudget(30);
};

document.addEventListener('keydown', function (e) {
  const key = e.key;

  if ((key >= '0' && key <= '9') || key === '.') {
    e.preventDefault();
    onDigitButtonClicked(key);
    return;
  }

  if (key === '+') {
    e.preventDefault();
    document.getElementById("btn_op_plus").click();
    return;
  }
  if (key === '-') {
    e.preventDefault();
    if (!selectedOperation && a === '') {
      document.getElementById("btn_op_sign").click();
      return;
    }
    if (selectedOperation && b === '') {
      document.getElementById("btn_op_sign").click();
      return;
    }
    document.getElementById("btn_op_minus").click();
    return;
  }
  if (key === '/' ) {
    e.preventDefault();
    document.getElementById("btn_op_div").click();
    return;
  }
  if (key === '*') {
    e.preventDefault();
    document.getElementById("btn_op_mult").click();
    return;
  }
  if (key === 'Enter' || key === '=') {
    e.preventDefault();
    document.getElementById("btn_op_equal").click();
    return;
  }
  if (key === 'Backspace') {
    e.preventDefault();
    document.getElementById("btn_op_backspace").click();
    return;
  }

  if (key === 'Escape') {
    e.preventDefault();
    document.getElementById("btn_op_clear").click();
    return;
  }

  if (key === '%') {
    e.preventDefault();
    document.getElementById("btn_op_percent").click();
    return;
  }
});
  show('0');
};
