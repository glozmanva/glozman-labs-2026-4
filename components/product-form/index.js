export class ProductFormComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data, mode) {
        const isEdit = mode === "edit";

        return `
            <div class="card form-card shadow-sm">
                <div class="card-body">
                    <h2 class="page-title mb-3">
                        ${isEdit ? "Редактирование карточки" : "Добавление карточки"}
                    </h2>

                    <p class="page-text mb-4">
                        Заполните данные прибора и сохраните карточку. В ЛР6 сохранение выполняется через fetch-запрос к API.
                    </p>

                    <form id="product-form">
                        <div class="row g-3">
                            <div class="col-md-6">
                                <label class="form-label" for="title-input">Название прибора</label>
                                <input
                                    id="title-input"
                                    class="form-control"
                                    type="text"
                                    value="${data.title || ""}"
                                    placeholder="Например: Оптическая камера WFV"
                                    required
                                >
                            </div>

                            <div class="col-md-6">
                                <label class="form-label" for="type-input">Тип прибора</label>
                                <select id="type-input" class="form-select">
                                    <option value="camera" ${data.type === "camera" ? "selected" : ""}>Камера</option>
                                    <option value="spectrometer" ${data.type === "spectrometer" ? "selected" : ""}>Спектрометр</option>
                                    <option value="radiometer" ${data.type === "radiometer" ? "selected" : ""}>Радиометр</option>
                                </select>
                            </div>

                            <div class="col-md-12">
                                <label class="form-label" for="src-input">Путь к изображению</label>
                                <input
                                    id="src-input"
                                    class="form-control"
                                    type="text"
                                    value="${data.src || "./images/camera.png"}"
                                    placeholder="./images/camera.png"
                                    required
                                >
                            </div>

                            <div class="col-md-12">
                                <label class="form-label" for="text-input">Краткое описание</label>
                                <textarea
                                    id="text-input"
                                    class="form-control"
                                    rows="2"
                                    placeholder="Краткий текст для карточки"
                                    required
                                >${data.text || ""}</textarea>
                            </div>

                            <div class="col-md-12">
                                <label class="form-label" for="description-input">Полное описание</label>
                                <textarea
                                    id="description-input"
                                    class="form-control"
                                    rows="4"
                                    placeholder="Полное описание прибора"
                                >${data.description || ""}</textarea>
                            </div>

                            <div class="col-md-4">
                                <label class="form-label" for="mass-input">Масса</label>
                                <input
                                    id="mass-input"
                                    class="form-control"
                                    type="text"
                                    value="${data.mass || ""}"
                                    placeholder="25 кг"
                                >
                            </div>

                            <div class="col-md-4">
                                <label class="form-label" for="power-input">Энергопотребление</label>
                                <input
                                    id="power-input"
                                    class="form-control"
                                    type="text"
                                    value="${data.power || ""}"
                                    placeholder="120 Вт"
                                >
                            </div>

                            <div class="col-md-4">
                                <label class="form-label" for="purpose-input">Научная задача</label>
                                <input
                                    id="purpose-input"
                                    class="form-control"
                                    type="text"
                                    value="${data.purpose || ""}"
                                    placeholder="Дистанционное зондирование"
                                >
                            </div>
                        </div>

                        <div class="d-flex gap-2 flex-wrap mt-4">
                            <button class="custom-btn" type="submit">
                                Сохранить
                            </button>

                            <button id="cancel-button" class="custom-btn" type="button">
                                Отмена
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }

    getFormData() {
        return {
            title: document.getElementById("title-input").value.trim(),
            type: document.getElementById("type-input").value,
            src: document.getElementById("src-input").value.trim(),
            text: document.getElementById("text-input").value.trim(),
            description: document.getElementById("description-input").value.trim(),
            mass: document.getElementById("mass-input").value.trim(),
            power: document.getElementById("power-input").value.trim(),
            purpose: document.getElementById("purpose-input").value.trim()
        };
    }

    addListeners(onSave, onCancel) {
        document.getElementById("product-form").addEventListener("submit", (event) => {
            event.preventDefault();
            onSave(this.getFormData());
        });

        document
            .getElementById("cancel-button")
            .addEventListener("click", onCancel);
    }

    render(data, mode, onSave, onCancel) {
        this.parent.innerHTML = "";
        const html = this.getHTML(data, mode);
        this.parent.insertAdjacentHTML("beforeend", html);
        this.addListeners(onSave, onCancel);
    }
}
