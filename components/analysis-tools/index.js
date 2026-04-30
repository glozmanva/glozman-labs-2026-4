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

                    <div class="analysis-card">
                        <h3 class="analysis-card-title">Оценить суммарную нагрузку приборов</h3>
                        <p class="analysis-card-text">
                            Вычисляет сумму квадратов значений энергопотребления для текущего списка приборов.
                        </p>
                        <button id="show-power-squares" class="custom-btn custom-btn--full" type="button">
                            Рассчитать показатель
                        </button>
                    </div>

                    <div class="analysis-card">
                        <h3 class="analysis-card-title">Определить среднее энергопотребление</h3>
                        <p class="analysis-card-text">
                            Вычисляет среднее арифметическое значений энергопотребления всех приборов.
                        </p>
                        <button id="show-average-power" class="custom-btn custom-btn--full" type="button">
                            Показать среднее значение
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

    addListeners(onShowAvailable, onShowSortedDescription, onShowPowerSquares, onShowAveragePower) {
        document
            .getElementById("show-available-instruments")
            .addEventListener("click", onShowAvailable);

        document
            .getElementById("show-sorted-description")
            .addEventListener("click", onShowSortedDescription);

        document
            .getElementById("show-power-squares")
            .addEventListener("click", onShowPowerSquares);

        document
            .getElementById("show-average-power")
            .addEventListener("click", onShowAveragePower);
    }

    render(resultTitle, resultText, onShowAvailable, onShowSortedDescription, onShowPowerSquares, onShowAveragePower) {
        const html = this.getHTML(resultTitle, resultText);
        this.parent.insertAdjacentHTML("beforeend", html);
        this.addListeners(onShowAvailable, onShowSortedDescription, onShowPowerSquares, onShowAveragePower);
    }
}
