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
            src: "./images/camera.png",
            title: "",
            text: "",
            description: "",
            mass: "",
            power: "",
            purpose: ""
        };
    }

    async getData() {
        this.pageRoot.innerHTML = `
            <div class="alert alert-info" role="alert">
                Загружаем данные карточки для редактирования через fetch...
            </div>
        `;

        try {
            const data = await ajax.get(stockUrls.getStockById(this.id));
            this.renderForm(data, "edit");
        } catch (error) {
            console.error(error);
            this.renderError(error.status === 404
                ? "Карточка для редактирования не найдена."
                : error.status
                    ? `Ошибка загрузки карточки. Статус ответа: ${error.status}`
                    : "Запрос не выполнен. Проверьте, что backend ЛР4 запущен."
            );
        }
    }

    async saveProduct(formData) {
        try {
            if (this.id) {
                await ajax.patch(stockUrls.updateStockById(this.id), formData);
            } else {
                await ajax.post(stockUrls.createStock(), formData);
            }

            alert("Карточка сохранена через fetch-запрос к API.");
            this.app.setTitleFilter("");
        } catch (error) {
            console.error(error);
            this.renderError(error.status
                ? `Не удалось сохранить карточку. Статус ответа: ${error.status}`
                : "Запрос не выполнен. Проверьте, что backend ЛР4 запущен."
            );
        }
    }

    renderForm(data, mode) {
        const form = new ProductFormComponent(this.pageRoot);
        form.render(
            data,
            mode,
            this.saveProduct.bind(this),
            this.app.openHome
        );
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
