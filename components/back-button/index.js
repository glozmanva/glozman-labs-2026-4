export class BackButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    render() {
        const html = `
            <button class="button button_secondary" id="back-button" type="button">
                ← Назад к списку
            </button>
        `;

        this.parent.insertAdjacentHTML('beforeend', html);

        document.getElementById('back-button').addEventListener('click', () => {
            window.location.hash = '#main';
        });
    }
}
