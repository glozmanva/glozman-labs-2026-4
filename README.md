# ЛР 1. Calculator. HTML/CSS

**Глозман Варвара ИУ5-44Б**

## Содержание

- [Цель работы](#цель-работы)
- [Тема](#тема)
- [Сайт для вдохновения](#сайт-для-вдохновения)
- [План работы](#план-работы)
- [Задание](#задание)
- [HTML-разметка калькулятора](#html-разметка-калькулятора)
- [Подключение CSS](#подключение-css)
- [Цветовая палитра](#цветовая-палитра)
- [Стилизация калькулятора](#стилизация-калькулятора)
- [Hover-эффекты](#hover-эффекты)
- [Дополнительные элементы оформления](#дополнительные-элементы-оформления)
- [Порядок показа](#порядок-показа)
- [Контрольные вопросы](#контрольные-вопросы)
- [Что сказать на защите](#что-сказать-на-защите)

## Цель работы

Цель данной лабораторной работы — знакомство с инструментами построения пользовательских интерфейсов web-сайтов: **HTML** и **CSS**.

В ходе выполнения работы была реализована статическая верстка простого калькулятора. В лабораторной работе сделаны HTML-разметка страницы, подключение CSS-файла, оформление калькулятора, стилизация кнопок, поля результата, шапки сайта, карточек и hover-эффектов.

## Тема

**Оптимизация состава научной аппаратуры космического спутника.**

Калькулятор оформлен в стилистике сайта, связанного с космическими спутниками и научной аппаратурой.

## Сайт для вдохновения

[OSCAR Space](https://space.oscar.wmo.int/)

## План работы

1. Создать HTML-файл `calculator.html`.
2. Добавить базовую структуру HTML-документа.
3. Сверстать шапку сайта.
4. Добавить навигацию между страницами.
5. Сверстать карточку калькулятора.
6. Добавить экран результата.
7. Добавить кнопки калькулятора.
8. Создать файл `style.css`.
9. Подключить CSS к HTML.
10. Описать цветовую палитру через CSS-переменные.
11. Настроить стили кнопок, карточек, шапки и фона.
12. Добавить hover-эффекты.
13. Запустить проект через Live Server.

## Задание

**Задание:** создание калькулятора. Верстка на **HTML** и **CSS**.

Необходимо скопировать 3–5 основных цветов кодами с сайта по выбранной теме: хедер, фон, карточки, кнопки, hover. Также нужно использовать дополнительные CSS-свойства: `padding`, `border-radius`, `box-shadow`, `display`, `gap`, `margin`, `background`, `font-family`.

## HTML-разметка калькулятора

В файле `calculator.html` создана стандартная структура HTML-документа.

```html
<!DOCTYPE html>
<html lang="ru">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ЛР 1. Calculator. HTML/CSS</title>
  <link rel="stylesheet" href="style.css">
</head>
```
Основной блок калькулятора находится внутри `section` с классом `card card--calc`.

```html
<section class="card card--calc">
  <div class="calc">
    <div id="result" class="result">0</div>

    <div class="keys">
      <div class="row">
        <button id="btn_op_clear" class="my-btn secondary" type="button">C</button>
        <button id="btn_op_sign" class="my-btn secondary" type="button">+/-</button>
        <button id="btn_op_percent" class="my-btn secondary" type="button">%</button>
        <button id="btn_op_div" class="my-btn primary" type="button">/</button>
      </div>
```
Пример кнопки калькулятора:

```html
<button id="btn_digit_7" class="my-btn" type="button">7</button>
```

Кнопка имеет:

- `id="btn_digit_7"` — уникальное имя кнопки;
- `class="my-btn"` — общий стиль кнопки;
- текст `7` — то, что пользователь видит на экране.

## Подключение CSS

CSS подключается в файле `calculator.html` в секции `<head>`:

```html
<link rel="stylesheet" href="style.css">
```

## Цветовая палитра

Основные цвета вынесены в CSS-переменные в блоке `:root`.

```css
:root{
  --brand-dark-1: #0b5f8f;
  --brand-dark-2: #053a63;
  --nav-blue-1: #8fc0e8;
  --nav-blue-2: #5fa5d6;
  --text: #003366;
  --page-bg: #f4f8fb;
  --card-bg: #ffffff;
  --btn-bg: #f8fafc;
  --btn-hover: #dbeafe;
  --screen: #003366;
  --screen-text: #e5e7eb;
}
```

## Стилизация калькулятора

Карточка калькулятора оформлена через класс `.calc`.

```css
.calc{
  width: 310px;
  padding: 24px;
  border-radius: 22px;
  background: linear-gradient(180deg, #ffffff 0%, #eaf4fb 100%);
  border: 1px solid var(--border);
}
```

Экран результата оформлен через класс `.result`.

```css
.result{
  width: 254px;
  height: 70px;
  margin: 0 auto 12px auto;
  padding: 0 14px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background: var(--screen);
  color: var(--screen-text);
  border-radius: 14px;
  font-size: 28px;
  font-weight: 800;
}
```

Основной стиль кнопки задается классом `.my-btn`.

```css
.my-btn{
  width: 56px;
  height: 56px;
  border-radius: 10px;
  border: 1px solid rgba(0,0,0,0.10);
  background: var(--btn-bg);
  color: var(--btn-text);
  font-size: 18px;
  font-weight: 800;
  cursor: pointer;
  user-select: none;
  transition: 0.2s;
}
```

## Hover-эффекты

Для обычных кнопок используется такой hover:

```css
.my-btn:hover{
  background: var(--btn-hover);
  transform: translateY(-1px);
}
```

Для кнопок основных операций используется отдельный стиль:

```css
.my-btn.primary{
  color: #ffffff;
  background: linear-gradient(var(--brand-dark-1), var(--brand-dark-2));
}

.my-btn.primary:hover{
  background: linear-gradient(#1477ae, #064a7d);
}
```

Кнопки основных операций выделены темно-синим цветом, чтобы пользователь видел главные действия калькулятора.

## Дополнительные элементы оформления

### Шапка сайта

В проекте сделана шапка в стиле выбранного сайта.

```css
.header-title{
  min-height: 112px;
  padding: 24px 16px 22px 104px;
  position: relative;
  background: linear-gradient(var(--brand-dark-1), var(--brand-dark-2));
}
```

### Переход на главную страницу по иконке

В шапке есть иконка, по которой можно перейти на главную страницу.

```html
<a class="logo-link" href="index.html" aria-label="Главная">
  <img src="assets/home.png" alt="Логотип главной страницы">
</a>
```
### Фоновое изображение

Фон страницы добавлен через псевдоэлемент `body::before`.

```css
body::before{
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;
  background:
    linear-gradient(rgba(244, 248, 251, 0.88), rgba(244, 248, 251, 0.92)),
    url("assets/wallpaper.jpeg") center/cover no-repeat;
}
```

Так фон находится за основным содержимым страницы и не мешает читать текст.

### Подпись автора

Внизу страницы добавлена подпись:

```html
<footer class="footer">ЛР выполнила: Глозман Варвара, ИУ5-44Б</footer>
```

Стили подписи:

```css
.footer{
  margin: 12px 0 0 0;
  font-size: 13px;
  color: rgba(0,0,0,0.62);
  text-align: center;
}
```
