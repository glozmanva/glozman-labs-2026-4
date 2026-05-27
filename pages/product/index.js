import { HeaderComponent } from "../../components/header/index.js";
import { ProductComponent } from "../../components/product/index.js";
import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";

export class ProductPage {
    constructor(parent, app, id) {
        this.parent = parent;
        this.app = app;
        this.id = id;
    }

    get headerRoot() {
        return document.getElementById("header-root");
    }

    get pageRoot() {
        return document.getElementById("product-page");
    }

    getHTML() {
        return `
            <div id="header-root"></div>

            <main class="container py-4">
                <div id="product-page"></div>
            </main>

            <footer class="footer">
                ЛР выполнила: Глозман Варвара
            </footer>
        `;
    }

    async getData() {
        this.pageRoot.innerHTML = `
            <div class="alert alert-info" role="alert">
                Загружаем карточку с API через fetch...
            </div>
        `;

        try {
            const data = await ajax.get(stockUrls.getStockById(this.id));
            this.renderData(data);
        } catch (error) {
            console.error(error);
            this.renderError(error.status === 404
                ? "Карточка не найдена."
                : error.status
                    ? `Ошибка загрузки карточки. Статус ответа: ${error.status}`
                    : "Запрос не выполнен. Проверьте, что backend ЛР4 запущен."
            );
        }
    }

    renderData(item) {
        this.pageRoot.innerHTML = "";

        const product = new ProductComponent(this.pageRoot);
        product.render(item);
    }

    renderError(message) {
        this.pageRoot.innerHTML = `
            <div class="alert alert-danger" role="alert">
                ${message}
            </div>
        `;
    }

    render() {
        this.parent.innerHTML = "";

        const html = this.getHTML();
        this.parent.insertAdjacentHTML("beforeend", html);

        const header = new HeaderComponent(this.headerRoot);
        header.render(this.app.openHome);

        this.getData();
    }
}
