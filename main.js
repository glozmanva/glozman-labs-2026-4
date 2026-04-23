import { MainPage } from "./pages/main/index.js";
import { ProductPage } from "./pages/product/index.js";
import { productsMock } from "./mock/products.js";

const root = document.getElementById("root");

let products = productsMock.map((item) => ({ ...item }));
let selectedType = "all";

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
