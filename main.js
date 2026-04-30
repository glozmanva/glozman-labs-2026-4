import { MainPage } from "./pages/main/index.js";
import { ProductPage } from "./pages/product/index.js";
import { productsMock } from "./mock/products.js";
import {
    getAvailableInstrumentTitlesDiff,
    buildAvailableInstrumentsMessage,
    sortInstrumentDescriptionWords,
    buildSortedInstrumentDescriptionMessage,
    sumOfSquares,
    buildPowerSquaresMessage,
    getAverage,
    buildAveragePowerMessage
} from "./logic/space-tools.js";
import { renderInstrumentModel } from "./three/render-instrument-model.js";

const root = document.getElementById("root");

let products = productsMock.map((item) => ({ ...item }));
let selectedType = "all";
let analysisResult = {
    title: "Сервис готов к работе",
    text: "Выберите действие, чтобы получить результат анализа."
};

function getFilteredProducts() {
    if (selectedType === "all") {
        return products;
    }

    return products.filter((item) => item.type === selectedType);
}

function getProductById(id) {
    return products.find((item) => item.id === Number(id));
}

function renderApp() {
    const hash = window.location.hash || "#/";

    if (hash.startsWith("#/product/")) {
        const id = hash.split("/")[2];
        const productPage = new ProductPage(root, app, id);
        productPage.render();
        return;
    }

    const mainPage = new MainPage(root, app);
    mainPage.render();
}

const app = {
    getProducts: () => products,
    getFilteredProducts: () => getFilteredProducts(),
    getSelectedType: () => selectedType,
    getProductById: (id) => getProductById(id),
    getAnalysisResult: () => analysisResult,

    setFilter: (type) => {
        selectedType = type;
        renderApp();
    },

    addCard: () => {
        const template = productsMock[0];
        const nextId =
            products.length > 0
                ? Math.max(...products.map((item) => item.id)) + 1
                : 1;

        const newCard = {
            ...template,
            id: nextId,
            title: `${template.title} (копия)`,
        };

        products = [...products, newCard];
        renderApp();
    },

    deleteCard: (id) => {
        products = products.filter((item) => item.id !== Number(id));
        renderApp();
    },

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
    },

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
    },

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
    },

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
    },

    renderProduct3DModel: (containerId) => {
        renderInstrumentModel(containerId, "/models/space-instrument.glb");
    },

    openHome: () => {
        window.location.hash = "#/";
    },

    openProduct: (id) => {
        window.location.hash = `#/product/${id}`;
    },
};

window.addEventListener("hashchange", renderApp);

if (!window.location.hash) {
    window.location.hash = "#/";
} else {
    renderApp();
}
