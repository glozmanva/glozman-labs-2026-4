import { MainPage } from "./pages/main/index.js";
import { ProductPage } from "./pages/product/index.js";
import { ProductFormPage } from "./pages/product-form/index.js";
import { ajax } from "./modules/ajax.js";
import { stockUrls } from "./modules/stockUrls.js";

class App {
    constructor(parent) {
        this.parent = parent;
        this.titleFilter = "";

        this.openHome = this.openHome.bind(this);

        window.addEventListener("hashchange", () => {
            this.renderRoute();
        });
    }

    getTitleFilter() {
        return this.titleFilter;
    }

    setTitleFilter(value) {
        this.titleFilter = value;
        this.openHome();
    }

    openHome() {
        window.location.hash = "#/";
        this.renderRoute();
    }

    openProduct(id) {
        window.location.hash = `#/product/${id}`;
    }

    openProductForm(id = null) {
        if (id) {
            window.location.hash = `#/product-form/${id}`;
        } else {
            window.location.hash = "#/product-form";
        }
    }

    async deleteCard(id) {
        const isConfirmed = confirm("Удалить карточку?");

        if (!isConfirmed) {
            return;
        }

        try {
            await ajax.delete(stockUrls.removeStockById(id));
            this.setTitleFilter("");
        } catch (error) {
            console.error(error);
            alert(error.status
                ? `Не удалось удалить карточку. Статус ответа: ${error.status}`
                : "Запрос не выполнен. Проверьте, что backend ЛР4 запущен."
            );
        }
    }

    renderRoute() {
        const route = window.location.hash.replace("#", "") || "/";

        if (route.startsWith("/product-form/")) {
            const id = route.split("/product-form/")[1];
            const page = new ProductFormPage(this.parent, this, id);
            page.render();
            return;
        }

        if (route === "/product-form") {
            const page = new ProductFormPage(this.parent, this);
            page.render();
            return;
        }

        if (route.startsWith("/product/")) {
            const id = route.split("/product/")[1];
            const page = new ProductPage(this.parent, this, id);
            page.render();
            return;
        }

        const page = new MainPage(this.parent, this);
        page.render();
    }
}

const root = document.getElementById("root");
const app = new App(root);

app.renderRoute();
