export class HeaderComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
            <header class="oscar-header">
                <div class="header-title">
                    <a class="logo-link" href="#/" aria-label="Главная">
                        <img src="home.png" alt="Главная">
                    </a>

                    <div class="logo">Оптимизация состава научной аппаратуры космического спутника</div>
                    <div class="subtitle">Выбор приборов при ограничениях по массе и энергопотреблению</div>

                    <button id="home-button" class="custom-btn custom-btn--header" type="button">Домой</button>
                </div>
            </header>
        `;
    }

    addListeners(listener) {
        document
            .getElementById("home-button")
            .addEventListener("click", listener);
    }

    render(listener) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML("beforeend", html);
        this.addListeners(listener);
    }
}
