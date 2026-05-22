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
                        В ЛР5 эта страница только открывает форму и позволяет вводить данные.
                        Кнопка сохранения появится в ЛР6.
                    </p>

                    <form>
                        <div class="row g-3">
                            <div class="col-md-6">
                                <label class="form-label" for="title-input">Название прибора</label>
                                <input
                                    id="title-input"
                                    class="form-control"
                                    type="text"
                                    value="${data.title || ""}"
                                    placeholder="Например: Оптическая камера WFV"
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
                                    value="${data.src || "./images/camera.svg"}"
                                    placeholder="./images/camera.svg"
                                >
                            </div>

                            <div class="col-md-12">
                                <label class="form-label" for="text-input">Краткое описание</label>
                                <textarea
                                    id="text-input"
                                    class="form-control"
                                    rows="2"
                                    placeholder="Краткий текст для карточки"
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

                        <div class="alert alert-warning mt-4 mb-0" role="alert">
                            Кнопки «Сохранить» здесь специально нет: по условию ЛР5 сохранение появится только в ЛР6.
                        </div>
                    </form>
                </div>
            </div>
        `;
    }

    render(data, mode) {
        this.parent.innerHTML = "";
        const html = this.getHTML(data, mode);
        this.parent.insertAdjacentHTML("beforeend", html);
    }
}
