import { HeaderComponent } from "../../components/header/index.js";
import { ProductFormComponent } from "../../components/product-form/index.js";
import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";

export class ProductFormPage {
    constructor(parent, app, id = null) {
        this.parent = parent;
        this.app = app;
        this.id = id;
    }

    get headerRoot() {
        return document.getElementById("header-root");
    }

    get pageRoot() {
        return document.getElementById("product-form-page");
    }

    getHTML() {
        return `
            <div id="header-root"></div>

            <main class="container py-4">
                <div id="product-form-page"></div>
            </main>

            <footer class="footer">
                ЛР выполнила: Глозман Варвара
            </footer>
        `;
    }

    getEmptyProduct() {
        return {
            type: "camera",
            src: "./images/camera.svg",
            title: "",
            text: "",
            description: "",
            mass: "",
            power: "",
            purpose: ""
        };
    }

    getData() {
        this.pageRoot.innerHTML = `
            <div class="alert alert-info" role="alert">
                Загружаем данные карточки для редактирования...
            </div>
        `;

        ajax.get(stockUrls.getStockById(this.id), (data, status) => {
            if (status === 0) {
                this.renderError(
                    "Запрос заблокирован или сервер недоступен. Проверьте backend ЛР4 и CORS Unblock."
                );
                return;
            }

            if (status === 404 || !data) {
                this.renderError("Карточка для редактирования не найдена.");
                return;
            }

            if (status < 200 || status >= 300) {
                this.renderError(`Ошибка загрузки карточки. Статус ответа: ${status}`);
                return;
            }

            this.renderForm(data, "edit");
        });
    }

    renderForm(data, mode) {
        const form = new ProductFormComponent(this.pageRoot);
        form.render(data, mode);
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

        if (this.id) {
            this.getData();
        } else {
            this.renderForm(this.getEmptyProduct(), "add");
        }
    }
}
