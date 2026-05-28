# ЛР 2. Calculator. JavaScript
**Глозман Варвара ИУ5-44Б**

---

## Содержание

* [Цель работы](#цель-работы)
* [Тема](#тема)
* [Сайт для вдохновения](#сайт-для-вдохновения)
* [Структура проекта](#структура-проекта)
* [Файлы проекта](#файлы-проекта)
* [Задание](#задание)
* [Дополнительные задания](#дополнительные-задания)

  * [Функция diff](#функция-diff)
  * [Функция sort](#функция-sort)
  * [Функция sumOfSquares](#функция-sumofsquares)
  * [Среднее арифметическое](#среднее-арифметическое)
  * [3D модель на странице Подробнее](#3d-модель-на-странице-подробнее)
* [Порядок показа](#порядок-показа)

---

## Цель работы

Знакомство с `Node.js`, `npm`, подключением библиотек и разработкой web-приложения с компонентной структурой.

В работе реализовано приложение с карточками приборов спутника, фильтрацией, добавлением и удалением карточек, страницей подробной информации и дополнительными функциями анализа данных.

---

## Тема

Оптимизация состава научной аппаратуры космического спутника.

---

## Сайт для вдохновения

[OSCAR Space](https://space.oscar.wmo.int/instruments/view/wfv)

---

## Структура проекта

```text
project/
├── index.html
├── main.js
├── style.css
├── package.json
├── package-lock.json
├── README.md
├── home.png
├── mock/
│   └── products.js
├── logic/
│   └── space-tools.js
├── three/
│   └── render-instrument-model.js
├── pages/
│   ├── main/
│   │   └── index.js
│   └── product/
│       └── index.js
├── components/
│   ├── header/
│   │   └── index.js
│   ├── controls/
│   │   └── index.js
│   ├── product-card/
│   │   └── index.js
│   ├── product/
│   │   └── index.js
│   └── analysis-tools/
│       └── index.js
├── images/
└── models/
    └── space-instrument.glb
```

---

## Файлы проекта

`index.html` — главная HTML-страница приложения.
`main.js` — основной JavaScript-файл, который управляет данными, фильтрацией, переходами между страницами и запуском функций анализа.
`style.css` — файл стилей проекта.
`mock/products.js` — mock-данные приборов спутника.
`logic/space-tools.js` — функции для дополнительных заданий.
`three/render-instrument-model.js` — отображение 3D-модели через `three.js`.

`pages/main/index.js` — главная страница со списком карточек.
`pages/product/index.js` — страница Подробнее.

`components/header/index.js` — шапка сайта.
`components/controls/index.js` — фильтр и кнопка добавления карточки.
`components/product-card/index.js` — карточка прибора на главной странице.
`components/product/index.js` — карточка подробной информации.
`components/analysis-tools/index.js` — блок “Подбор и анализ приборов”.

---

## Задание

Знакомство с `Node.js` и `npm`. Верстка интерфейса с карточками: страница списка с фильтрацией и страница Подробнее. Данные получаются через mock-объекты.

В проекте реализовано:

* список карточек приборов;
* фильтрация по типу прибора;
* добавление карточки;
* удаление карточки;
* страница Подробнее;
* переход на главную страницу по логотипу;
* блок “Подбор и анализ приборов”.

---

## Дополнительные задания

### Функция diff

Напишите функцию `diff`, которая возвращает массив, содержащий все элементы первого, которые не находятся во втором.

В проекте эта функция используется для определения приборов, которые еще не были добавлены в текущий набор оборудования спутника.

```js
export function getAvailableInstrumentTitlesDiff(allInstrumentTitles, selectedInstrumentTitles) {
    const selectedTitleSet = new Set(selectedInstrumentTitles);

    return allInstrumentTitles.filter((instrumentTitle) => {
        return !selectedTitleSet.has(instrumentTitle);
    });
}

export function buildAvailableInstrumentsMessage(instrumentTitles) {
    if (instrumentTitles.length === 0) {
        return "Все основные приборы уже добавлены в текущий набор оборудования.";
    }

    return `Для добавления доступны: ${instrumentTitles.join(", ")}.`;
}
```

Пример использования:

```js
runAvailableInstrumentsAnalysis: () => {
    const allInstrumentTitles = products.map((item) => item.title);

    const selectedInstrumentTitles = [
        "Оптическая камера WFV",
        "Инфракрасный спектрометр IRS"
    ];

    const availableInstrumentTitles = getAvailableInstrumentTitlesDiff(
        allInstrumentTitles,
        selectedInstrumentTitles
    );

    analysisResult = {
        title: "Результат подбора",
        text: buildAvailableInstrumentsMessage(availableInstrumentTitles)
    };

    renderApp();
}
```

---

### Функция sort

Напишите функцию `sort`, которая будет сортировать буквы в словах по алфавиту, а потом получившиеся слова в предложении — тоже. Первую букву каждого слова она сделает прописной, остальные — строчными.

В проекте эта функция используется для преобразования описания прибора.

```js
export function sortInstrumentDescriptionWords(instrumentDescription) {
    const cleanedWords = instrumentDescription
        .replace(/[.,:;!?]/g, "")
        .split(/\s+/)
        .filter(Boolean);

    const sortedWords = cleanedWords.map((word) => {
        const sortedLetters = word
            .toLowerCase()
            .split("")
            .sort((a, b) => a.localeCompare(b, "ru"))
            .join("");

        return sortedLetters.charAt(0).toUpperCase() + sortedLetters.slice(1);
    });

    sortedWords.sort((a, b) => a.localeCompare(b, "ru"));

    return sortedWords.join(" ");
}

export function buildSortedInstrumentDescriptionMessage(originalDescription, sortedDescription) {
    return `Исходный текст: ${originalDescription} Отсортированный текст: ${sortedDescription}.`;
}
```

Пример использования:

```js
runSortedDescriptionAnalysis: () => {
    const baseInstrument = products[0];

    const originalDescription = baseInstrument.description;
    const sortedDescription = sortInstrumentDescriptionWords(originalDescription);

    analysisResult = {
        title: "Преобразованное описание",
        text: buildSortedInstrumentDescriptionMessage(
            originalDescription,
            sortedDescription
        )
    };

    renderApp();
}
```

---

### Функция sumOfSquares

Напишите функцию `sumOfSquares(arr)`, которая возвращает сумму квадратов значений массива.

В проекте эта функция используется для расчета суммарной нагрузки приборов по значениям энергопотребления.

```js
export function sumOfSquares(arr) {
    let sum = 0;

    for (const value of arr) {
        sum += value * value;
    }

    return sum;
}

export function buildPowerSquaresMessage(instrumentPowerValues, totalPowerSquares) {
    return `Для значений энергопотребления ${instrumentPowerValues.join(", ")} сумма квадратов равна ${totalPowerSquares}.`;
}
```

Пример использования:

```js
runPowerLoadAnalysis: () => {
    const instrumentPowerValues = products.map((item) => {
        return Number.parseInt(item.power, 10);
    });

    const totalPowerSquares = sumOfSquares(instrumentPowerValues);

    analysisResult = {
        title: "Расчет суммарной нагрузки",
        text: buildPowerSquaresMessage(instrumentPowerValues, totalPowerSquares)
    };

    renderApp();
}
```

---

### Среднее арифметическое

Вычислить среднее арифметическое элементов массива и вернуть его.

В проекте эта функция используется для определения среднего значения энергопотребления приборов.

```js
export function getAverage(arr) {
    if (arr.length === 0) {
        return 0;
    }

    let sum = 0;

    for (const value of arr) {
        sum += value;
    }

    return sum / arr.length;
}

export function buildAveragePowerMessage(instrumentPowerValues, averagePowerValue) {
    return `Для значений энергопотребления ${instrumentPowerValues.join(", ")} среднее арифметическое равно ${averagePowerValue}.`;
}
```

Пример использования:

```js
runAveragePowerAnalysis: () => {
    const instrumentPowerValues = products.map((item) => {
        return Number.parseInt(item.power, 10);
    });

    const averagePowerValue = getAverage(instrumentPowerValues);

    analysisResult = {
        title: "Среднее энергопотребление",
        text: buildAveragePowerMessage(instrumentPowerValues, averagePowerValue)
    };

    renderApp();
}
```

---

### 3D модель на странице Подробнее

На странице Подробнее вместе с картинкой выводится 3D-модель прибора.

```js
renderProduct3DModel: (containerId) => {
    renderInstrumentModel(containerId, "/models/space-instrument.glb");
},
```

Контейнер для 3D-модели:

```js
<div class="model-viewer-wrapper">
    <div class="model-viewer-title">3D-модель прибора</div>
    <div id="instrument-model-viewer" class="model-viewer"></div>
</div>
```

Загрузка 3D-модели:

```js
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export function renderInstrumentModel(containerId, modelPath) {
    const container = document.getElementById(containerId);

    if (!container) {
        return;
    }

    container.innerHTML = "";

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf4f8fb);

    const camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );
    camera.position.set(2.5, 2, 4);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(0, 0.8, 0);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(4, 6, 5);
    scene.add(directionalLight);

    const loader = new GLTFLoader();

    loader.load(
        modelPath,
        (gltf) => {
            const model = gltf.scene;
            scene.add(model);

            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());

            model.position.x -= center.x;
            model.position.y -= box.min.y;
            model.position.z -= center.z;

            const maxSide = Math.max(size.x, size.y, size.z);
            if (maxSide > 0) {
                const scale = 2 / maxSide;
                model.scale.setScalar(scale);
            }

            animate();
        },
        undefined,
        () => {
            container.innerHTML = `
                <div class="model-viewer-fallback">
                    Не удалось загрузить 3D-модель. Проверьте, что файл .glb лежит в папке models.
                </div>
            `;
        }
    );

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
}
```

---

## Порядок показа

1. Открыть главную страницу.
2. Показать список карточек приборов.
3. Показать фильтрацию по типу прибора.
4. Добавить карточку.
5. Удалить карточку.
6. Открыть страницу Подробнее.
7. Показать изображение и 3D-модель прибора.
8. Показать блок “Подбор и анализ приборов”.
9. Нажать кнопки:

   * Показать доступные приборы;
   * Показать преобразованный текст;
   * Рассчитать показатель;
   * Показать среднее значение.
10. Объяснить реализацию функций и использование `three.js`.
