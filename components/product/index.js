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

    getHTML(data) {
        return `
            <div class="card product-detail-card shadow-sm">
                <div class="row g-0">
                    <div class="col-md-5">
                        <div class="product-media-column">
                            <img src="${data.src}" class="img-fluid rounded-start product-detail-image" alt="${data.title}">
                            <div class="model-viewer-wrapper">
                                <div class="model-viewer-title">3D-модель спутника</div>
                                <div id="instrument-model-viewer" class="model-viewer"></div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-7">
                        <div class="card-body">
                            <div class="mb-2">
                                <span class="custom-badge">${this.getTypeLabel(data.type)}</span>
                            </div>

                            <h3 class="card-title mb-3">${data.title}</h3>
                            <p class="card-text">${data.description}</p>

                            <ul class="list-group list-group-flush mb-3">
                                <li class="list-group-item"><b>Научная задача:</b> ${data.purpose}</li>
                                <li class="list-group-item"><b>Масса:</b> ${data.mass}</li>
                                <li class="list-group-item"><b>Энергопотребление:</b> ${data.power}</li>
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
