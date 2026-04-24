import { HeaderComponent } from "../../components/header/index.js";
import { ProductComponent } from "../../components/product/index.js";

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

    getData() {
        return this.app.getProductById(this.id);
    }

    getHTML() {
        return `
            <div id="header-root"></div>

            <main class="container py-4">
                <div id="product-page"></div>
            </main>

        `;
    }

    render() {
        this.parent.innerHTML = "";
        const html = this.getHTML();
        this.parent.insertAdjacentHTML("beforeend", html);

        const header = new HeaderComponent(this.headerRoot);
        header.render(this.app.openHome);

        const data = this.getData();

        if (!data) {
            this.pageRoot.insertAdjacentHTML(
                "beforeend",
                `
                    <div class="alert alert-danger" role="alert">
                        Карточка не найдена.
                    </div>
                `
            );
            return;
        }

        const product = new ProductComponent(this.pageRoot);
        product.render(data);
    }
}
