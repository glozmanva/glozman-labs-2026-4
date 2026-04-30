# Домашнее задание
**Глозман Варвара ИУ5-44Б**

---

## Содержание
- [Цель домашнего задания](#цель-домашнего-задания)
- [Тема](#тема)
- [Сайт для вдохновения](#сайт-для-вдохновения)
- [Дополнительные задания](#дополнительные-задания)
  - [Функция diff](#функция-diff)
  - [Функция sort](#функция-sort)
  - [Функция sumOfSquares](#функция-sumofsquares)
  - [Среднее арифметическое](#среднее-арифметическое)
  - [3D модель на странице Подробнее](#3d-модель-на-странице-подробнее)
- [Порядок показа](#порядок-показа)

---

## Цель домашнего задания
Работа с коллекциями, функциями, классами.

---

## Тема
Оптимизация состава научной аппаратуры космического спутника.

---
## Сайт для вдохновения
[OSCAR Space](https://space.oscar.wmo.int/instruments/view/wfv)

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
Необходимо на странице Подробнее выводить вместе с картинкой 3D модель прибора.

```js
renderProduct3DModel: (containerId) => {
    renderInstrumentModel(containerId, "/models/space-instrument.glb");
},
```

```js
getHTML(data) {
    return `
        <div class="card product-detail-card shadow-sm">
            <div class="row g-0">
                <div class="col-md-5">
                    <div class="product-media-column">
                        <img src="${data.src}" class="img-fluid rounded-start product-detail-image" alt="${data.title}">
                        <div class="model-viewer-wrapper">
                            <div class="model-viewer-title">3D-модель прибора</div>
                            <div id="instrument-model-viewer" class="model-viewer"></div>
                        </div>
                    </div>
                </div>

                <div class="col-md-7">
                    <div class="card-body">
                        <div class="mb-2">
                            <span class="custom-badge">${this.getTypeLabel(data.type)}</span>
                        </div>

                        <h3 class="card-title mb-3">${data.title}</h3>
                        <p class="card-text">${data.description}</p>

                        <ul class="list-group list-group-flush mb-3">
                            <li class="list-group-item"><b>Научная задача:</b> ${data.purpose}</li>
                            <li class="list-group-item"><b>Масса:</b> ${data.mass}</li>
                            <li class="list-group-item"><b>Энергопотребление:</b> ${data.power}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
}
```

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
Объяснить реализацию требуемых функций, объяснить использование `three.js`.



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

Напишите функцию sort, которая будет сортировать буквы в словах по алфавиту, а потом получившиеся слова в предложении - тоже. Первую букву каждого слова она сделает прописной, остальные - строчными.

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

### 3D модель на странице Подробнее
Необходимо на странице Подробнее выводить вместе с картинкой 3D модель прибора.

```js
renderProduct3DModel: (containerId) => {
    renderInstrumentModel(containerId, "/models/space-instrument.glb");
},
```

```js
getHTML(data) {
    return `
        <div class="card product-detail-card shadow-sm">
            <div class="row g-0">
                <div class="col-md-5">
                    <div class="product-media-column">
                        <img src="${data.src}" class="img-fluid rounded-start product-detail-image" alt="${data.title}">
                        <div class="model-viewer-wrapper">
                            <div class="model-viewer-title">3D-модель прибора</div>
                            <div id="instrument-model-viewer" class="model-viewer"></div>
                        </div>
                    </div>
                </div>

                <div class="col-md-7">
                    <div class="card-body">
                        <div class="mb-2">
                            <span class="custom-badge">${this.getTypeLabel(data.type)}</span>
                        </div>

                        <h3 class="card-title mb-3">${data.title}</h3>
                        <p class="card-text">${data.description}</p>

                        <ul class="list-group list-group-flush mb-3">
                            <li class="list-group-item"><b>Научная задача:</b> ${data.purpose}</li>
                            <li class="list-group-item"><b>Масса:</b> ${data.mass}</li>
                            <li class="list-group-item"><b>Энергопотребление:</b> ${data.power}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
}
```

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
Объяснить реализацию требуемых функций, объяснить использование `three.js`.
