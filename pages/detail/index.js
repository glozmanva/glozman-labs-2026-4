import { HeaderComponent } from '../../components/header/index.js';
import { BackButtonComponent } from '../../components/back-button/index.js';
import { ajax } from '../../modules/ajax.js';
import { stockUrls } from '../../modules/stockUrls.js';

export class DetailPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    getHTML() {
        return `
            <main class="page">
                <section class="panel detail-panel">
                    <div id="detail-content" class="detail-content">
                        <p class="request-info">Загрузка карточки с API...</p>
                    </div>
                </section>
            </main>
        `;
    }

    render() {
        this.parent.innerHTML = '';

        const header = new HeaderComponent(this.parent);
        header.render();

        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const backButton = new BackButtonComponent(document.querySelector('.detail-panel'));
        backButton.render();

        this.getData();
    }

    getData() {
        const content = document.getElementById('detail-content');

        if (!this.id) {
            content.innerHTML = '<p class="error-block">Не передан id карточки.</p>';
            return;
        }

        const url = stockUrls.getStockById(this.id);

        ajax.get(url, (data, status) => {
            if (status === 0) {
                content.innerHTML = '<p class="error-block">Запрос заблокирован CORS или сервер ЛР4 не запущен.</p>';
                return;
            }

            if (status < 200 || status >= 300 || !data) {
                content.innerHTML = `<p class="error-block">Карточка не найдена. Код ответа: ${status}</p>`;
                return;
            }

            this.renderData(data, url);
        });
    }

    renderData(item, url) {
        const content = document.getElementById('detail-content');

        content.innerHTML = `
            <div class="detail-card">
                <img class="detail-card__image" src="${item.src}" alt="${item.title}" onerror="this.src='https://cdn-icons-png.flaticon.com/512/3212/3212567.png'">
                <div class="detail-card__info">
                    <p class="request-info">XHR GET: ${url}</p>
                    <p class="card__type">Научный прибор</p>
                    <h1 class="detail-card__title">${item.title}</h1>
                    <p class="detail-card__text">${item.text}</p>
                    <button class="button" id="edit-current" type="button">Редактировать карточку</button>
                </div>
            </div>
        `;

        document.getElementById('edit-current').addEventListener('click', () => {
            window.location.hash = `#edit?id=${item.id}`;
        });
    }
}
