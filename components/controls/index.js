export class ControlsComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(selectedType) {
        return `
            <section class="controls-panel mb-4">
                <div class="row g-3 align-items-end">
                    <div class="col-md-6">
                        <label for="type-filter" class="form-label">Фильтр по типу прибора</label>
                        <select id="type-filter" class="form-select">
                            <option value="all" ${selectedType === "all" ? "selected" : ""}>Все приборы</option>
                            <option value="camera" ${selectedType === "camera" ? "selected" : ""}>Камеры</option>
                            <option value="spectrometer" ${selectedType === "spectrometer" ? "selected" : ""}>Спектрометры</option>
                            <option value="radiometer" ${selectedType === "radiometer" ? "selected" : ""}>Радиометры</option>
                        </select>
                    </div>

                    <div class="col-md-6">
                        <button id="add-card-button" class="custom-btn custom-btn--full" type="button">
                            Добавить карточку
                        </button>
                    </div>
                </div>
            </section>
        `;
    }

    addListeners(onFilterChange, onAddClick) {
        document
            .getElementById("type-filter")
            .addEventListener("change", onFilterChange);

        document
            .getElementById("add-card-button")
            .addEventListener("click", onAddClick);
    }

    render(selectedType, onFilterChange, onAddClick) {
        const html = this.getHTML(selectedType);
        this.parent.insertAdjacentHTML("beforeend", html);
        this.addListeners(onFilterChange, onAddClick);
    }
}
