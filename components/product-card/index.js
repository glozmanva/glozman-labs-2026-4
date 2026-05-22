export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getTypeLabel(type) {
        if (type === "camera") return "Камера";
        if (type === "spectrometer") return "Спектрометр";
        if (type === "radiometer") return "Радиометр";
        return "Прибор";
    }

    getHTML(data) {
        return `
            <div class="card product-card shadow-sm">
                <img
                    src="${data.src || "./images/camera.svg"}"
                    class="card-img-top product-card-image"
                    alt="${data.title || "Прибор"}"
                >

                <div class="card-body product-card-body">
                    <div class="product-card-top">
                        <div class="mb-2">
                            <span class="badge text-bg-primary">${this.getTypeLabel(data.type)}</span>
                        </div>

                        <h5 class="card-title product-card-title">${data.title || "Без названия"}</h5>
                        <p class="card-text product-card-text">${data.text || "Описание не указано."}</p>
                    </div>

                    <div class="product-card-bottom">
                        <ul class="list-group list-group-flush mb-3">
                            <li class="list-group-item"><b>Масса:</b> ${data.mass || "не указано"}</li>
                            <li class="list-group-item"><b>Энергопотребление:</b> ${data.power || "не указано"}</li>
                        </ul>

                        <div class="d-flex gap-2 flex-wrap">
                            <button class="custom-btn custom-btn--small flex-fill" id="detail-card-${data.id}" data-id="${data.id}">
                                Подробнее
                            </button>

                            <button class="custom-btn custom-btn--small flex-fill" id="edit-card-${data.id}" data-id="${data.id}">
                                Редактировать
                            </button>

                            <button class="custom-btn custom-btn--small flex-fill" id="delete-card-${data.id}" data-id="${data.id}">
                                Удалить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    addListeners(data, onOpen, onEdit, onDelete) {
        document
            .getElementById(`detail-card-${data.id}`)
            .addEventListener("click", onOpen);

        document
            .getElementById(`edit-card-${data.id}`)
            .addEventListener("click", onEdit);

        document
            .getElementById(`delete-card-${data.id}`)
            .addEventListener("click", onDelete);
    }

    render(data, onOpen, onEdit, onDelete) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML("beforeend", html);
        this.addListeners(data, onOpen, onEdit, onDelete);
    }
}
