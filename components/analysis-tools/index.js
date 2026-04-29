export class AnalysisToolsComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(resultTitle, resultText) {
        return `
            <section class="analysis-section">
                <h2 class="analysis-title">Подбор и анализ приборов</h2>

                <div class="analysis-grid">
                    <div class="analysis-card">
                        <h3 class="analysis-card-title">Какие приборы еще можно добавить</h3>
                        <p class="analysis-card-text">
                            Показывает оборудование, которое еще не входит в текущий набор приборов для миссии.
                        </p>
                        <button id="show-available-instruments" class="custom-btn custom-btn--full" type="button">
                            Показать доступные приборы
                        </button>
                    </div>

                    <div class="analysis-card">
                        <h3 class="analysis-card-title">Преобразовать описание прибора</h3>
                        <p class="analysis-card-text">
                            Сортирует буквы в каждом слове по алфавиту, а затем сортирует сами слова.
                        </p>
                        <button id="show-sorted-description" class="custom-btn custom-btn--full" type="button">
                            Показать преобразованный текст
                        </button>
                    </div>
                </div>

                <div class="analysis-result">
                    <div class="analysis-result-title">${resultTitle}</div>
                    <div class="analysis-result-text">${resultText}</div>
                </div>
            </section>
        `;
    }

    addListeners(onShowAvailable, onShowSortedDescription) {
        document
            .getElementById("show-available-instruments")
            .addEventListener("click", onShowAvailable);

        document
            .getElementById("show-sorted-description")
            .addEventListener("click", onShowSortedDescription);
    }

    render(resultTitle, resultText, onShowAvailable, onShowSortedDescription) {
        const html = this.getHTML(resultTitle, resultText);
        this.parent.insertAdjacentHTML("beforeend", html);
        this.addListeners(onShowAvailable, onShowSortedDescription);
    }
}
