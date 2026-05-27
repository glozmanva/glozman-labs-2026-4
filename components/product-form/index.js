export class ProductFormComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data, mode) {
        const isEdit = mode === "edit";

        return `
            <section class="product-form-card">
                <h1 class="page-title">
                    ${isEdit ? "Редактирование карточки" : "Добавление карточки"}
                </h1>

                <form class="product-form">
                    <div class="product-form-grid">
                        <div class="product-form-field">
                            <label for="title-input">Название прибора</label>
                            <input
                                id="title-input"
                                type="text"
                                value="${data.title || ""}"
                                placeholder="Например: Оптическая камера WFV"
                            >
                        </div>

                        <div class="product-form-field">
                            <label for="type-input">Тип прибора</label>
                            <select id="type-input">
                                <option value="camera" ${data.type === "camera" ? "selected" : ""}>Камера</option>
                                <option value="spectrometer" ${data.type === "spectrometer" ? "selected" : ""}>Спектрометр</option>
                                <option value="radiometer" ${data.type === "radiometer" ? "selected" : ""}>Радиометр</option>
                            </select>
                        </div>

                        <div class="product-form-field product-form-field--full">
                            <label for="src-input">Путь к изображению</label>
                            <input
                                id="src-input"
                                type="text"
                                value="${data.src || "./images/camera.svg"}"
                                placeholder="./images/camera.svg"
                            >
                        </div>

                        <div class="product-form-field product-form-field--full">
                            <label for="text-input">Краткое описание</label>
                            <textarea
                                id="text-input"
                                rows="3"
                                placeholder="Краткое описание для карточки"
                            >${data.text || ""}</textarea>
                        </div>

                        <div class="product-form-field product-form-field--full">
                            <label for="description-input">Полное описание</label>
                            <textarea
                                id="description-input"
                                rows="5"
                                placeholder="Полное описание прибора"
                            >${data.description || ""}</textarea>
                        </div>

                        <div class="product-form-field">
                            <label for="mass-input">Масса</label>
                            <input
                                id="mass-input"
                                type="text"
                                value="${data.mass || ""}"
                                placeholder="25 кг"
                            >
                        </div>

                        <div class="product-form-field">
                            <label for="power-input">Энергопотребление</label>
                            <input
                                id="power-input"
                                type="text"
                                value="${data.power || ""}"
                                placeholder="120 Вт"
                            >
                        </div>

                        <div class="product-form-field">
                            <label for="purpose-input">Научная задача</label>
                            <input
                                id="purpose-input"
                                type="text"
                                value="${data.purpose || ""}"
                                placeholder="Дистанционное зондирование"
                            >
                        </div>
                    </div>
                </form>
            </section>
        `;
    }

    render(data, mode) {
        this.parent.innerHTML = "";
        const html = this.getHTML(data, mode);
        this.parent.insertAdjacentHTML("beforeend", html);
    }
}
