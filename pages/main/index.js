import { HeaderComponent } from "../../components/header/index.js";
import { ControlsComponent } from "../../components/controls/index.js";
import { ProductCardComponent } from "../../components/product-card/index.js";
import { AnalysisToolsComponent } from "../../components/analysis-tools/index.js";

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

    get analysisRoot() {
        return document.getElementById("analysis-root");
    }

    get pageRoot() {
        return document.getElementById("main-page");
    }

    getHTML() {
        return `
            <div id="header-root"></div>

            <main class="container py-4 main-page-content">
                <div id="analysis-root"></div>

                <section class="mb-4">
                    <h1 class="page-title">Список приборов</h1>
                </section>

                <div id="controls-root"></div>
                <div id="main-page" class="cards-grid"></div>
            </main>
        `;
    }

    clickCard(e) {
        const cardId = e.target.dataset.id;
        this.app.openProduct(cardId);
    }

    clickDelete(e) {
        const cardId = e.target.dataset.id;
        this.app.deleteCard(cardId);
    }

    onFilterChange(e) {
        this.app.setFilter(e.target.value);
    }

    onAddClick() {
        this.app.addCard();
    }

    onShowAvailableInstruments() {
        this.app.runAvailableInstrumentsAnalysis();
    }

    onShowSortedDescription() {
        this.app.runSortedDescriptionAnalysis();
    }

    onShowPowerSquares() {
        this.app.runPowerLoadAnalysis();
    }

    onShowAveragePower() {
        this.app.runAveragePowerAnalysis();
    }

    renderCards() {
        const data = this.app.getFilteredProducts();

        if (data.length === 0) {
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

        data.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot);
            productCard.render(
                item,
                this.clickCard.bind(this),
                this.clickDelete.bind(this)
            );
        });
    }

    render() {
        this.parent.innerHTML = "";
        const html = this.getHTML();
        this.parent.insertAdjacentHTML("beforeend", html);

        const header = new HeaderComponent(this.headerRoot);
        header.render();

        const controls = new ControlsComponent(this.controlsRoot);
        controls.render(
            this.app.getSelectedType(),
            this.onFilterChange.bind(this),
            this.onAddClick.bind(this)
        );

        const analysisTools = new AnalysisToolsComponent(this.analysisRoot);
        analysisTools.render(
            this.app.getAnalysisResult().title,
            this.app.getAnalysisResult().text,
            this.onShowAvailableInstruments.bind(this),
            this.onShowSortedDescription.bind(this),
            this.onShowPowerSquares.bind(this),
            this.onShowAveragePower.bind(this)
        );

        this.renderCards();
    }
}
