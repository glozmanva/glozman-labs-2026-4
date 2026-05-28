(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function e(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(s){if(s.ep)return;s.ep=!0;const o=e(s);fetch(s.href,o)}})();class p{constructor(t){this.parent=t}getHTML(){return`
            <header class="oscar-header">
                <div class="header-title">
                    <a class="logo-link" href="#/" aria-label="Главная">
                        <img src="home.png" alt="Главная">
                    </a>

                    <div class="logo">Оптимизация состава научной аппаратуры космического спутника</div>
                    <div class="subtitle">Выбор приборов при ограничениях по массе и энергопотреблению</div>
                </div>
            </header>
        `}render(){const t=this.getHTML();this.parent.insertAdjacentHTML("beforeend",t)}}class m{constructor(t){this.parent=t}getHTML(t){return`
            <section class="controls-panel mb-4">
                <div class="row g-3 align-items-end">
                    <div class="col-md-5">
                        <label for="title-filter" class="form-label">Фильтр по названию прибора</label>
                        <input
                            id="title-filter"
                            class="form-control"
                            type="text"
                            placeholder="Например: камера"
                            value="${t}"
                        >
                    </div>

                    <div class="col-md-2">
                        <button id="filter-button" class="custom-btn custom-btn--full" type="button">
                            Найти
                        </button>
                    </div>

                    <div class="col-md-2">
                        <button id="reset-filter-button" class="custom-btn custom-btn--full" type="button">
                            Сбросить
                        </button>
                    </div>

                    <div class="col-md-3">
                        <button id="add-card-button" class="custom-btn custom-btn--full" type="button">
                            Добавить карточку
                        </button>
                    </div>
                </div>
            </section>
        `}addListeners(t,e,r){const s=document.getElementById("title-filter");document.getElementById("filter-button").addEventListener("click",t),document.getElementById("reset-filter-button").addEventListener("click",e),document.getElementById("add-card-button").addEventListener("click",r),s.addEventListener("keydown",o=>{o.key==="Enter"&&t()})}render(t,e,r,s){const o=this.getHTML(t);this.parent.insertAdjacentHTML("beforeend",o),this.addListeners(e,r,s)}}class h{constructor(t){this.parent=t}getImageByType(t){return t==="camera"?"./images/camera.png":t==="spectrometer"?"./images/spectrometer.jpg":t==="radiometer"?"./images/radiometer.jpg":"./images/camera.png"}getHTML(t){return`
            <div class="card product-card shadow-sm">
                <img
                    src="${t.src||this.getImageByType(t.type)}"
                    class="card-img-top product-card-image"
                    alt="${t.title||"Прибор"}"
                >

                <div class="card-body product-card-body">
                    <div class="product-card-top">
                        <h5 class="card-title product-card-title">${t.title||"Без названия"}</h5>
                        <p class="card-text product-card-text">${t.text||"Описание не указано."}</p>
                    </div>

                    <div class="product-card-bottom">
                        <ul class="list-group list-group-flush mb-3">
                            <li class="list-group-item"><b>Масса:</b> ${t.mass||"не указано"}</li>
                            <li class="list-group-item"><b>Энергопотребление:</b> ${t.power||"не указано"}</li>
                        </ul>

                        <div class="d-flex gap-2 flex-wrap">
                            <button class="custom-btn custom-btn--small flex-fill" id="detail-card-${t.id}" data-id="${t.id}">
                                Подробнее
                            </button>

                            <button class="custom-btn custom-btn--small flex-fill" id="edit-card-${t.id}" data-id="${t.id}">
                                Редактировать
                            </button>

                            <button class="custom-btn custom-btn--small flex-fill" id="delete-card-${t.id}" data-id="${t.id}">
                                Удалить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `}addListeners(t,e,r,s){document.getElementById(`detail-card-${t.id}`).addEventListener("click",e),document.getElementById(`edit-card-${t.id}`).addEventListener("click",r),document.getElementById(`delete-card-${t.id}`).addEventListener("click",s)}render(t,e,r,s){const o=this.getHTML(t);this.parent.insertAdjacentHTML("beforeend",o),this.addListeners(t,e,r,s)}}class g{get(t){return this._send("GET",t)}post(t,e){return this._send("POST",t,e)}patch(t,e){return this._send("PATCH",t,e)}put(t,e){return this._send("PUT",t,e)}delete(t){return this._send("DELETE",t)}async _send(t,e,r=null){const s={method:t,headers:{}};r&&(s.headers["Content-Type"]="application/json;charset=utf-8",s.body=JSON.stringify(r));const o=await fetch(e,s),n=await o.text(),d=n?JSON.parse(n):null;if(!o.ok){const l=new Error((d==null?void 0:d.error)||`Ошибка запроса. Статус: ${o.status}`);throw l.status=o.status,l.data=d,l}return d}}const a=new g;class f{constructor(){this.baseUrl=""}getStocks(t=""){const e=new URLSearchParams;t&&e.append("title",t);const r=e.toString();return r?`${this.baseUrl}/stocks?${r}`:`${this.baseUrl}/stocks`}getStockById(t){return`${this.baseUrl}/stocks/${t}`}createStock(){return`${this.baseUrl}/stocks`}removeStockById(t){return`${this.baseUrl}/stocks/${t}`}updateStockById(t){return`${this.baseUrl}/stocks/${t}`}}const c=new f;class b{constructor(t,e){this.parent=t,this.app=e}get headerRoot(){return document.getElementById("header-root")}get controlsRoot(){return document.getElementById("controls-root")}get pageRoot(){return document.getElementById("main-page")}getHTML(){return`
            <div id="header-root"></div>

            <main class="container py-4">
                <section class="mb-4">
                    <h1 class="page-title">Список приборов</h1>
                    <p class="page-text">
                        Карточки научной аппаратуры загружаются с API-сервера через fetch.
                        Для проверки откройте DevTools → Network → Fetch/XHR.
                    </p>
                </section>

                <div id="controls-root"></div>
                <div id="main-page" class="cards-grid"></div>
            </main>

            <footer class="footer">
                ЛР выполнила: Глозман Варвара
            </footer>
        `}async getData(){this.pageRoot.innerHTML=`
            <div class="alert alert-info" role="alert">
                Загружаем данные с API через fetch...
            </div>
        `;try{const t=await a.get(c.getStocks(this.app.getTitleFilter()));this.renderData(t)}catch(t){console.error(t),this.renderError(t.status?`Ошибка загрузки данных. Статус ответа: ${t.status}`:"Запрос не выполнен. Проверьте, что backend ЛР4 запущен.")}}renderData(t){if(this.pageRoot.innerHTML="",!t||t.length===0){this.pageRoot.insertAdjacentHTML("beforeend",`
                    <div class="alert alert-secondary" role="alert">
                        По выбранному фильтру карточки не найдены.
                    </div>
                `);return}t.forEach(e=>{new h(this.pageRoot).render(e,this.clickCard.bind(this),this.clickEdit.bind(this),this.clickDelete.bind(this))})}renderError(t){this.pageRoot.innerHTML=`
            <div class="alert alert-danger" role="alert">
                ${t}
            </div>
        `}clickCard(t){const e=t.target.dataset.id;this.app.openProduct(e)}clickEdit(t){const e=t.target.dataset.id;this.app.openProductForm(e)}clickDelete(t){const e=t.target.dataset.id;this.app.deleteCard(e)}onFilterClick(){const t=document.getElementById("title-filter").value.trim();this.app.setTitleFilter(t)}onResetClick(){this.app.setTitleFilter("")}onAddClick(){this.app.openProductForm()}render(){this.parent.innerHTML="";const t=this.getHTML();this.parent.insertAdjacentHTML("beforeend",t),new p(this.headerRoot).render(this.app.openHome),new m(this.controlsRoot).render(this.app.getTitleFilter(),this.onFilterClick.bind(this),this.onResetClick.bind(this),this.onAddClick.bind(this)),this.getData()}}class v{constructor(t){this.parent=t}getTypeLabel(t){return t==="camera"?"Камера":t==="spectrometer"?"Спектрометр":t==="radiometer"?"Радиометр":"Прибор"}getImageByType(t){return t==="camera"?"./images/camera.png":t==="spectrometer"?"./images/spectrometer.jpg":t==="radiometer"?"./images/radiometer.jpg":"./images/camera.png"}getHTML(t){return`
            <div class="card product-detail-card shadow-sm">
                <div class="row g-0">
                    <div class="col-md-5">
                        <img
                            src="${t.src||this.getImageByType(t.type)}"
                            class="img-fluid rounded-start product-detail-image"
                            alt="${t.title||"Прибор"}"
                        >
                    </div>

                    <div class="col-md-7">
                        <div class="card-body">
                            <div class="mb-2">
                                <span class="badge text-bg-primary">${this.getTypeLabel(t.type)}</span>
                            </div>

                            <h3 class="card-title mb-3">${t.title||"Без названия"}</h3>
                            <p class="card-text">${t.description||t.text||"Описание не указано."}</p>

                            <ul class="list-group list-group-flush mb-3">
                                <li class="list-group-item"><b>Научная задача:</b> ${t.purpose||"не указано"}</li>
                                <li class="list-group-item"><b>Масса:</b> ${t.mass||"не указано"}</li>
                                <li class="list-group-item"><b>Энергопотребление:</b> ${t.power||"не указано"}</li>
                            </ul>

                            <div class="alert alert-info mb-0" role="alert">
                                Данные этой карточки получены с API через fetch.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `}render(t){const e=this.getHTML(t);this.parent.insertAdjacentHTML("beforeend",e)}}class y{constructor(t,e,r){this.parent=t,this.app=e,this.id=r}get headerRoot(){return document.getElementById("header-root")}get pageRoot(){return document.getElementById("product-page")}getHTML(){return`
            <div id="header-root"></div>

            <main class="container py-4">
                <div id="product-page"></div>
            </main>

            <footer class="footer">
                ЛР выполнила: Глозман Варвара
            </footer>
        `}async getData(){this.pageRoot.innerHTML=`
            <div class="alert alert-info" role="alert">
                Загружаем карточку с API через fetch...
            </div>
        `;try{const t=await a.get(c.getStockById(this.id));this.renderData(t)}catch(t){console.error(t),this.renderError(t.status===404?"Карточка не найдена.":t.status?`Ошибка загрузки карточки. Статус ответа: ${t.status}`:"Запрос не выполнен. Проверьте, что backend ЛР4 запущен.")}}renderData(t){this.pageRoot.innerHTML="",new v(this.pageRoot).render(t)}renderError(t){this.pageRoot.innerHTML=`
            <div class="alert alert-danger" role="alert">
                ${t}
            </div>
        `}render(){this.parent.innerHTML="";const t=this.getHTML();this.parent.insertAdjacentHTML("beforeend",t),new p(this.headerRoot).render(this.app.openHome),this.getData()}}class L{constructor(t){this.parent=t}getHTML(t,e){return`
            <div class="card form-card shadow-sm">
                <div class="card-body">
                    <h2 class="page-title mb-3">
                        ${e==="edit"?"Редактирование карточки":"Добавление карточки"}
                    </h2>

                    <p class="page-text mb-4">
                        Заполните данные прибора и сохраните карточку. В ЛР6 сохранение выполняется через fetch-запрос к API.
                    </p>

                    <form id="product-form">
                        <div class="row g-3">
                            <div class="col-md-6">
                                <label class="form-label" for="title-input">Название прибора</label>
                                <input
                                    id="title-input"
                                    class="form-control"
                                    type="text"
                                    value="${t.title||""}"
                                    placeholder="Например: Оптическая камера WFV"
                                    required
                                >
                            </div>

                            <div class="col-md-6">
                                <label class="form-label" for="type-input">Тип прибора</label>
                                <select id="type-input" class="form-select">
                                    <option value="camera" ${t.type==="camera"?"selected":""}>Камера</option>
                                    <option value="spectrometer" ${t.type==="spectrometer"?"selected":""}>Спектрометр</option>
                                    <option value="radiometer" ${t.type==="radiometer"?"selected":""}>Радиометр</option>
                                </select>
                            </div>

                            <div class="col-md-12">
                                <label class="form-label" for="src-input">Путь к изображению</label>
                                <input
                                    id="src-input"
                                    class="form-control"
                                    type="text"
                                    value="${t.src||"./images/camera.png"}"
                                    placeholder="./images/camera.png"
                                    required
                                >
                            </div>

                            <div class="col-md-12">
                                <label class="form-label" for="text-input">Краткое описание</label>
                                <textarea
                                    id="text-input"
                                    class="form-control"
                                    rows="2"
                                    placeholder="Краткий текст для карточки"
                                    required
                                >${t.text||""}</textarea>
                            </div>

                            <div class="col-md-12">
                                <label class="form-label" for="description-input">Полное описание</label>
                                <textarea
                                    id="description-input"
                                    class="form-control"
                                    rows="4"
                                    placeholder="Полное описание прибора"
                                >${t.description||""}</textarea>
                            </div>

                            <div class="col-md-4">
                                <label class="form-label" for="mass-input">Масса</label>
                                <input
                                    id="mass-input"
                                    class="form-control"
                                    type="text"
                                    value="${t.mass||""}"
                                    placeholder="25 кг"
                                >
                            </div>

                            <div class="col-md-4">
                                <label class="form-label" for="power-input">Энергопотребление</label>
                                <input
                                    id="power-input"
                                    class="form-control"
                                    type="text"
                                    value="${t.power||""}"
                                    placeholder="120 Вт"
                                >
                            </div>

                            <div class="col-md-4">
                                <label class="form-label" for="purpose-input">Научная задача</label>
                                <input
                                    id="purpose-input"
                                    class="form-control"
                                    type="text"
                                    value="${t.purpose||""}"
                                    placeholder="Дистанционное зондирование"
                                >
                            </div>
                        </div>

                        <div class="d-flex gap-2 flex-wrap mt-4">
                            <button class="custom-btn" type="submit">
                                Сохранить
                            </button>

                            <button id="cancel-button" class="custom-btn" type="button">
                                Отмена
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `}getFormData(){return{title:document.getElementById("title-input").value.trim(),type:document.getElementById("type-input").value,src:document.getElementById("src-input").value.trim(),text:document.getElementById("text-input").value.trim(),description:document.getElementById("description-input").value.trim(),mass:document.getElementById("mass-input").value.trim(),power:document.getElementById("power-input").value.trim(),purpose:document.getElementById("purpose-input").value.trim()}}addListeners(t,e){document.getElementById("product-form").addEventListener("submit",r=>{r.preventDefault(),t(this.getFormData())}),document.getElementById("cancel-button").addEventListener("click",e)}render(t,e,r,s){this.parent.innerHTML="";const o=this.getHTML(t,e);this.parent.insertAdjacentHTML("beforeend",o),this.addListeners(r,s)}}class u{constructor(t,e,r=null){this.parent=t,this.app=e,this.id=r}get headerRoot(){return document.getElementById("header-root")}get pageRoot(){return document.getElementById("product-form-page")}getHTML(){return`
            <div id="header-root"></div>

            <main class="container py-4">
                <div id="product-form-page"></div>
            </main>

            <footer class="footer">
                ЛР выполнила: Глозман Варвара
            </footer>
        `}getEmptyProduct(){return{type:"camera",src:"./images/camera.png",title:"",text:"",description:"",mass:"",power:"",purpose:""}}async getData(){this.pageRoot.innerHTML=`
            <div class="alert alert-info" role="alert">
                Загружаем данные карточки для редактирования через fetch...
            </div>
        `;try{const t=await a.get(c.getStockById(this.id));this.renderForm(t,"edit")}catch(t){console.error(t),this.renderError(t.status===404?"Карточка для редактирования не найдена.":t.status?`Ошибка загрузки карточки. Статус ответа: ${t.status}`:"Запрос не выполнен. Проверьте, что backend ЛР4 запущен.")}}async saveProduct(t){try{this.id?await a.patch(c.updateStockById(this.id),t):await a.post(c.createStock(),t),alert("Карточка сохранена через fetch-запрос к API."),this.app.setTitleFilter("")}catch(e){console.error(e),this.renderError(e.status?`Не удалось сохранить карточку. Статус ответа: ${e.status}`:"Запрос не выполнен. Проверьте, что backend ЛР4 запущен.")}}renderForm(t,e){new L(this.pageRoot).render(t,e,this.saveProduct.bind(this),this.app.openHome)}renderError(t){this.pageRoot.innerHTML=`
            <div class="alert alert-danger" role="alert">
                ${t}
            </div>
        `}render(){this.parent.innerHTML="";const t=this.getHTML();this.parent.insertAdjacentHTML("beforeend",t),new p(this.headerRoot).render(this.app.openHome),this.id?this.getData():this.renderForm(this.getEmptyProduct(),"add")}}class T{constructor(t){this.parent=t,this.titleFilter="",this.openHome=this.openHome.bind(this),window.addEventListener("hashchange",()=>{this.renderRoute()})}getTitleFilter(){return this.titleFilter}setTitleFilter(t){this.titleFilter=t,this.openHome()}openHome(){window.location.hash="#/",this.renderRoute()}openProduct(t){window.location.hash=`#/product/${t}`}openProductForm(t=null){t?window.location.hash=`#/product-form/${t}`:window.location.hash="#/product-form"}async deleteCard(t){if(confirm("Удалить карточку?"))try{await a.delete(c.removeStockById(t)),this.setTitleFilter("")}catch(r){console.error(r),alert(r.status?`Не удалось удалить карточку. Статус ответа: ${r.status}`:"Запрос не выполнен. Проверьте, что backend ЛР4 запущен.")}}renderRoute(){const t=window.location.hash.replace("#","")||"/";if(t.startsWith("/product-form/")){const r=t.split("/product-form/")[1];new u(this.parent,this,r).render();return}if(t==="/product-form"){new u(this.parent,this).render();return}if(t.startsWith("/product/")){const r=t.split("/product/")[1];new y(this.parent,this,r).render();return}new b(this.parent,this).render()}}const w=document.getElementById("root"),E=new T(w);E.renderRoute();
