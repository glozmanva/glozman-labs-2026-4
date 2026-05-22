export class ControlsComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(titleFilter) {
        return `
            <section class="controls-panel mb-4">
                <div class="row g-3 align-items-end">
                    <div class="col-md-5">
                        <label for="title-filter" class="form-label">Фильтр по названию прибора</label>
                        <input
                            id="title-filter"
                            class="form-control"
                            type="text"
                            placeholder="Например: камера"
                            value="${titleFilter}"
                        >
                    </div>

                    <div class="col-md-2">
                        <button id="filter-button" class="custom-btn custom-btn--full" type="button">
                            Найти
                        </button>
                    </div>

                    <div class="col-md-2">
                        <button id="reset-filter-button" class="custom-btn custom-btn--full" type="button">
                            Сбросить
                        </button>
                    </div>

                    <div class="col-md-3">
                        <button id="add-card-button" class="custom-btn custom-btn--full" type="button">
                            Добавить карточку
                        </button>
                    </div>
                </div>
            </section>
        `;
    }

    addListeners(onFilterClick, onResetClick, onAddClick) {
        const titleInput = document.getElementById("title-filter");

        document
            .getElementById("filter-button")
            .addEventListener("click", onFilterClick);

        document
            .getElementById("reset-filter-button")
            .addEventListener("click", onResetClick);

        document
            .getElementById("add-card-button")
            .addEventListener("click", onAddClick);

        titleInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                onFilterClick();
            }
        });
    }

    render(titleFilter, onFilterClick, onResetClick, onAddClick) {
        const html = this.getHTML(titleFilter);
        this.parent.insertAdjacentHTML("beforeend", html);
        this.addListeners(onFilterClick, onResetClick, onAddClick);
    }
}
