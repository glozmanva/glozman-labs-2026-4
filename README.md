
# ЛР 2. Calculator. JavaScript

**Глозман Варвара ИУ5-44Б**

## Содержание

- [Цель работы](#цель-работы)
- [Тема](#тема)
- [Сайт для вдохновения](#сайт-для-вдохновения)

- [План работы](#план-работы)
- [Задание](#задание)
- [Дополнительные задания](#дополнительные-задания)


## Цель работы

Цель данной лабораторной работы — знакомство с инструментами построения пользовательских интерфейсов web-сайтов: **HTML, CSS, JavaScript**.

В ходе выполнения работы был реализован простой калькулятор, добавлены стандартные операции и индивидуальная операция по теме проекта.

## Тема

**Оптимизация состава научной аппаратуры космического спутника**.


## Сайт для вдохновения

[OSCAR Space](https://space.oscar.wmo.int/instruments/view/wfv)

## Файлы проекта

- `homepage.html` — главная страница сайта.
- `firstpage.html` — страница с информацией об авторе.
- `calculator.html` — страница калькулятора.
- `script.js` — логика работы калькулятора на JavaScript.
- `style.css` — оформление страниц и калькулятора.
- `home.png` — иконка для перехода на главную страницу.

## План работы

1. Создание HTML-страницы калькулятора.
2. Подключение CSS-стилей.
3. Подключение JavaScript-файла.
4. Получение доступа к кнопкам калькулятора через `document.getElementById` и `querySelectorAll`.
5. Программирование цифровых кнопок.
6. Программирование основных операций: `+`, `-`, `x`, `/`.
7. Программирование кнопки `=`.
8. Добавление дополнительных операций.
9. Добавление индивидуальной операции по теме проекта.
10. Запуск проекта через Live Server.

## Задание

**Задание:** создание калькулятора. Функции на JavaScript. Реализовать в калькуляторе индивидуальную операцию по своей теме. Операция должна быть встроена в логику калькулятора без дополнительных окон и `alert`.

В моей лабораторной работе индивидуальная операция связана с расчетом количества научных приборов, которые можно выбрать при заданном лимите.

Кнопки индивидуальной операции:

- `CAM` — расчет для камеры;
- `SPEC` — расчет для спектрометра;
- `RAD` — расчет для радиометра.

Пример проверки:

- ввести `100`;
- нажать `CAM`;
- результат: `4`, потому что `100 / 25 = 4`.

## Подключение JavaScript

В файле `calculator.html` JavaScript подключается как внешний файл:

```html
<script defer src="script.js"></script>
```

А CSS подключается так:

```html
<link rel="stylesheet" href="style.css">
```

## Основная логика калькулятора

В файле `script.js` используются переменные:

```javascript
let a = '';
let b = '';
let expressionResult = '';
let selectedOperation = null;
```

Что они хранят:

- `a` — первое число;
- `b` — второе число;
- `expressionResult` — результат вычисления;
- `selectedOperation` — выбранная операция.

Доступ к экрану калькулятора и кнопкам:

```javascript
const outputElement = document.getElementById("result");
const digitButtons = document.querySelectorAll('[id^="btn_digit_"]');
```

Функция вывода результата на экран:

```javascript
function show(value) {
  outputElement.textContent = value === '' ? '0' : value;
}
```

## Работа цифровых кнопок

Цифровые кнопки находятся через селектор `[id^="btn_digit_"]`, то есть выбираются все элементы, у которых `id` начинается с `btn_digit_`.

```javascript
digitButtons.forEach(button => {
  button.onclick = function () {
    const digitValue = button.textContent.trim();
    onDigitButtonClicked(digitValue);
  };
});
```

Функция формирует число по цифрам:

```javascript
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
```

Если операция еще не выбрана, цифры записываются в `a`. После выбора операции цифры записываются в `b`.

## Кнопка равно

В HTML кнопка `=` имеет id:

```html
<button id="btn_op_equal" class="my-btn primary execute">=</button>
```

В JavaScript к этой кнопке привязан обработчик:

```javascript
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
```

## Как происходит сложение двух чисел

1. Пользователь нажимает первую цифру.
2. Цифра записывается в переменную `a`.
3. Пользователь нажимает `+`.
4. В переменную `selectedOperation` записывается значение `+`.
5. Пользователь нажимает вторую цифру.
6. Цифра записывается в переменную `b`.
7. Пользователь нажимает `=`.
8. Код переводит строки `a` и `b` в числа через `Number()`.
9. В `switch` выбирается операция `+`.
10. Результат записывается в `expressionResult`.
11. Результат выводится на экран через функцию `show()`.

Код сложения:

```javascript
case '+':
  expressionResult = x + y;
  break;
```

## Дополнительные задания

### 1. Проверка деления на ноль

В калькуляторе добавлена проверка деления на ноль. Если пользователь делит на `0`, на экране появляется `Error`.

```javascript
if (selectedOperation === '/' && y === 0) {
  a = '';
  b = '';
  selectedOperation = null;
  expressionResult = '';
  show('Error');
  return;
}
```

### 2. Смена знака

Кнопка `+/-` меняет знак текущего числа.

```javascript
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
```

### 3. Процент

Кнопка `%` делит текущее число на `100`.

```javascript
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
```

### 4. Backspace

Кнопка `Backspace` удаляет последний введенный символ.

```javascript
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
```

### 5. Смена темы

Кнопка `Сменить тему` добавляет или убирает класс `theme-alt` у `body`.

```javascript
const themeBtn = document.getElementById('btn_theme');
if (themeBtn) {
  themeBtn.onclick = function () {
    document.body.classList.toggle('theme-alt');
  };
}
```

В CSS для альтернативной темы используются отдельные стили:

```css
body.theme-alt .header-title{
  background: linear-gradient(#063a63, #021f36);
}

body.theme-alt .result{
  background: #021f36;
}
```

### 6. Переход на главную страницу по иконке

В шапке сайта есть иконка, по которой можно перейти на главную страницу.

```html
<a class="logo-link" href="homepage.html" aria-label="Главная">
  <img src="home.png" alt="">
</a>
```

### 7. Индивидуальная операция по теме проекта

Индивидуальная операция рассчитывает количество приборов, которые можно выбрать при заданном лимите.

```javascript
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
```

Расшифровка кнопок:

- `CAM` — камера, расчет по значению `25`;
- `SPEC` — спектрометр, расчет по значению `45`;
- `RAD` — радиометр, расчет по значению `30`.

Для расчета используется `Math.floor()`, чтобы получить целое количество приборов.

## Оформление результата

Экран калькулятора оформлен через класс `.result`.

```css
.result{
  background: var(--screen);
  color: var(--screen-text);
  border-radius: 14px;
  font-weight: 800;
  height: 70px;
  font-size: 28px;
  width: 254px;
  margin: 0 auto 12px auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 12px;
}
```

Цифры расположены по центру по вертикали и справа по горизонтали, как в обычном калькуляторе.
