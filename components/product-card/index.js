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
                <img src="${data.src}" class="card-img-top product-card-image" alt="${data.title}">
                <div class="card-body product-card-body">
                    <div class="product-card-top">
                        <div class="mb-2">
                            <span class="custom-badge">${this.getTypeLabel(data.type)}</span>
                        </div>

                        <h5 class="card-title product-card-title">${data.title}</h5>
                        <p class="card-text product-card-text">${data.text}</p>
                    </div>

                    <div class="product-card-bottom">
                        <ul class="list-group list-group-flush mb-3">
                            <li class="list-group-item"><b>Масса:</b> ${data.mass}</li>
                            <li class="list-group-item"><b>Энергопотребление:</b> ${data.power}</li>
                        </ul>

                        <div class="d-flex gap-2">
                            <button class="custom-btn custom-btn--small flex-fill" id="detail-card-${data.id}" data-id="${data.id}">
                                Подробнее
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

    addListeners(data, onOpen, onDelete) {
        document
            .getElementById(`detail-card-${data.id}`)
            .addEventListener("click", onOpen);

        document
            .getElementById(`delete-card-${data.id}`)
            .addEventListener("click", onDelete);
    }

    render(data, onOpen, onDelete) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML("beforeend", html);
        this.addListeners(data, onOpen, onDelete);
    }
}
