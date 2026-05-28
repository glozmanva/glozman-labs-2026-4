export class HeaderComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
            <header class="oscar-header">
                <div class="header-title">
                    <a class="logo-link" href="#/" aria-label="Главная">
                        <img src="./images/home.png" alt="Главная">
                    </a>

                    <div class="logo">Оптимизация состава научной аппаратуры космического спутника</div>
                    <div class="subtitle">Выбор приборов при ограничениях по массе и энергопотреблению</div>
                </div>
            </header>
        `;
    }

    render() {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML("beforeend", html);
    }
}
