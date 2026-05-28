const express = require('express');
const path = require('path');
const fs = require('fs');

const stocksRouter = require('./routes/stocks');
const stocksService = require('./services/stocksService');

const app = express();
const PORT = 3000;

const DATA_FILE_PATH = path.join(__dirname, 'data', 'stocks.json');
const PUBLIC_PATH = path.join(__dirname, '..', 'public');
const INDEX_HTML_PATH = path.join(PUBLIC_PATH, 'index.html');

stocksService.init(DATA_FILE_PATH);

app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

console.log('PUBLIC_PATH:', PUBLIC_PATH);
console.log('INDEX_HTML_EXISTS:', fs.existsSync(INDEX_HTML_PATH));

// API из ЛР4
app.use('/stocks', stocksRouter);

// Раздача bundle из папки public
app.use(express.static(PUBLIC_PATH));

// Главная страница фронтенда
app.get('/', (req, res) => {
    if (!fs.existsSync(INDEX_HTML_PATH)) {
        return res.status(500).send(`
            <h1>Bundle не найден</h1>
            <p>Backend ищет файл здесь:</p>
            <pre>${INDEX_HTML_PATH}</pre>
            <p>Нужно, чтобы в ветке express была папка public с файлом index.html.</p>
        `);
    }

    res.sendFile(INDEX_HTML_PATH);
});

// Все неизвестные маршруты
app.use((req, res) => {
    res.status(404).json({ error: 'Маршрут не найден' });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен по адресу http://localhost:${PORT}`);
});
