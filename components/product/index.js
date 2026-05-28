export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getTypeLabel(type) {
        if (type === "camera") return "Камера";
        if (type === "spectrometer") return "Спектрометр";
        if (type === "radiometer") return "Радиометр";
        return "Прибор";
    }

    getImageByType(type) {
        if (type === "camera") return "./images/camera.png";
        if (type === "spectrometer") return "./images/spectrometer.jpg";
        if (type === "radiometer") return "./images/radiometer.jpg";

        return "./images/camera.png";
    }

    getHTML(data) {
        return `
            <div class="card product-detail-card shadow-sm">
                <div class="row g-0">
                    <div class="col-md-5">
                        <img
                            src="${data.src || this.getImageByType(data.type)}"
                            class="img-fluid rounded-start product-detail-image"
                            alt="${data.title || "Прибор"}"
                        >
                    </div>

                    <div class="col-md-7">
                        <div class="card-body">
                            <div class="mb-2">
                                <span class="badge text-bg-primary">${this.getTypeLabel(data.type)}</span>
                            </div>

                            <h3 class="card-title mb-3">${data.title || "Без названия"}</h3>
                            <p class="card-text">${data.description || data.text || "Описание не указано."}</p>

                            <ul class="list-group list-group-flush mb-3">
                                <li class="list-group-item"><b>Научная задача:</b> ${data.purpose || "не указано"}</li>
                                <li class="list-group-item"><b>Масса:</b> ${data.mass || "не указано"}</li>
                                <li class="list-group-item"><b>Энергопотребление:</b> ${data.power || "не указано"}</li>
                            </ul>

                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML("beforeend", html);
    }
}
