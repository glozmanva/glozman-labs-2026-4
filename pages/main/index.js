import { HeaderComponent } from "../../components/header/index.js";
import { ControlsComponent } from "../../components/controls/index.js";
import { ProductCardComponent } from "../../components/product-card/index.js";
import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";

export class MainPage {
    constructor(parent, app) {
        this.parent = parent;
        this.app = app;
    }

    get headerRoot() {
        return document.getElementById("header-root");
    }

    get controlsRoot() {
        return document.getElementById("controls-root");
    }

    get pageRoot() {
        return document.getElementById("main-page");
    }

    getHTML() {
        return `
            <div id="header-root"></div>

            <main class="container py-4">
                <section class="mb-4">
                    <h1 class="page-title">Список приборов</h1>
                </section>

                <div id="controls-root"></div>
                <div id="main-page" class="cards-grid"></div>
            </main>

            <footer class="footer">
                ЛР выполнила: Глозман Варвара
            </footer>
        `;
    }

    getData() {
        this.pageRoot.innerHTML = `
            <div class="alert alert-info" role="alert">
                Загружаем данные с API...
            </div>
        `;

        ajax.get(stockUrls.getStocks(this.app.getTitleFilter()), (data, status) => {
            if (status === 0) {
                this.renderError(
                    "Запрос заблокирован или сервер недоступен. Проверьте, что backend ЛР4 запущен, а CORS Unblock включен."
                );
                return;
            }

            if (status < 200 || status >= 300) {
                this.renderError(`Ошибка загрузки данных. Статус ответа: ${status}`);
                return;
            }

            this.renderData(data);
        });
    }

    renderData(items) {
        this.pageRoot.innerHTML = "";

        if (!items || items.length === 0) {
            this.pageRoot.insertAdjacentHTML(
                "beforeend",
                `
                    <div class="alert alert-secondary" role="alert">
                        По выбранному фильтру карточки не найдены.
                    </div>
                `
            );
            return;
        }

        items.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot);

            productCard.render(
                item,
                this.clickCard.bind(this),
                this.clickEdit.bind(this),
                this.clickDelete.bind(this)
            );
        });
    }

    renderError(message) {
        this.pageRoot.innerHTML = `
            <div class="alert alert-danger" role="alert">
                ${message}
            </div>
        `;
    }

    clickCard(event) {
        const cardId = event.target.dataset.id;
        this.app.openProduct(cardId);
    }

    clickEdit(event) {
        const cardId = event.target.dataset.id;
        this.app.openProductForm(cardId);
    }

    clickDelete(event) {
        const cardId = event.target.dataset.id;
        this.app.deleteCard(cardId);
    }

    onFilterClick() {
        const title = document.getElementById("title-filter").value.trim();
        this.app.setTitleFilter(title);
    }

    onResetClick() {
        this.app.setTitleFilter("");
    }

    onAddClick() {
        this.app.openProductForm();
    }

    render() {
        this.parent.innerHTML = "";

        const html = this.getHTML();
        this.parent.insertAdjacentHTML("beforeend", html);

        const header = new HeaderComponent(this.headerRoot);
        header.render(this.app.openHome);

        const controls = new ControlsComponent(this.controlsRoot);
        controls.render(
            this.app.getTitleFilter(),
            this.onFilterClick.bind(this),
            this.onResetClick.bind(this),
            this.onAddClick.bind(this)
        );

        this.getData();
    }
}
