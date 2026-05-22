import { HeaderComponent } from '../../components/header/index.js';
import { BackButtonComponent } from '../../components/back-button/index.js';
import { ajax } from '../../modules/ajax.js';
import { stockUrls } from '../../modules/stockUrls.js';

export class EditPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
        this.isEditMode = Boolean(id);
    }

    getHTML() {
        const title = this.isEditMode ? 'Редактирование карточки' : 'Добавление карточки';
        const subtitle = this.isEditMode
            ? 'Поля заполняются данными существующей карточки через XHR-запрос.'
            : 'Поля уже можно заполнять вручную, но сохранение появится только в ЛР6.';

        return `
            <main class="page">
                <section class="panel form-panel">
                    <div class="form-header">
                        <div>
                            <p class="hero__label">Страница добавления/редактирования</p>
                            <h1 class="section-title">${title}</h1>
                            <p class="section-subtitle">${subtitle}</p>
                        </div>
                    </div>

                    <p class="request-info" id="edit-request-info"></p>

                    <form class="edit-form" id="edit-form">
                        <label class="form-field">
                            <span>ID</span>
                            <input id="stock-id" type="text" placeholder="Будет выдан сервером" disabled>
                        </label>

                        <label class="form-field">
                            <span>Название прибора</span>
                            <input id="stock-title" type="text" placeholder="Например: Камера">
                        </label>

                        <label class="form-field">
                            <span>Ссылка на изображение</span>
                            <input id="stock-src" type="text" placeholder="https://...">
                        </label>

                        <label class="form-field form-field_full">
                            <span>Описание</span>
                            <textarea id="stock-text" rows="5" placeholder="Краткое описание научного прибора"></textarea>
                        </label>
                    </form>

                    <div class="note">
                        <b>Важно:</b> кнопки «Сохранить» здесь нет специально. По заданию ЛР5 страница и поля уже есть, но сохранение данных будет добавлено в ЛР6.
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

        const backButton = new BackButtonComponent(document.querySelector('.form-panel'));
        backButton.render();

        if (this.isEditMode) {
            this.getData();
        } else {
            document.getElementById('edit-request-info').textContent = 'Режим добавления: XHR-запрос не нужен, поля пустые.';
        }
    }

    getData() {
        const info = document.getElementById('edit-request-info');
        const url = stockUrls.getStockById(this.id);

        info.textContent = 'Загрузка данных карточки...';

        ajax.get(url, (data, status) => {
            if (status === 0) {
                info.textContent = 'Запрос заблокирован CORS или сервер ЛР4 не запущен.';
                return;
            }

            if (status < 200 || status >= 300 || !data) {
                info.textContent = `Карточка не найдена. Код ответа: ${status}`;
                return;
            }

            this.fillForm(data, url);
        });
    }

    fillForm(item, url) {
        document.getElementById('edit-request-info').textContent = `XHR GET: ${url}`;
        document.getElementById('stock-id').value = item.id ?? '';
        document.getElementById('stock-title').value = item.title ?? '';
        document.getElementById('stock-src').value = item.src ?? '';
        document.getElementById('stock-text').value = item.text ?? '';
    }
}
