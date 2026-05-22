class Ajax {
    get(url, callback) {
        this._send("GET", url, null, callback);
    }

    post(url, data, callback) {
        this._send("POST", url, data, callback);
    }

    patch(url, data, callback) {
        this._send("PATCH", url, data, callback);
    }

    delete(url, callback) {
        this._send("DELETE", url, null, callback);
    }

    _send(method, url, data, callback) {
        const xhr = new XMLHttpRequest();

        xhr.open(method, url);

        if (data) {
            xhr.setRequestHeader("Content-Type", "application/json");
        }

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                this._handleResponse(xhr, callback);
            }
        };

        xhr.onerror = () => {
            callback(null, 0);
        };

        if (data) {
            xhr.send(JSON.stringify(data));
        } else {
            xhr.send();
        }
    }

    _handleResponse(xhr, callback) {
        try {
            const data = xhr.responseText ? JSON.parse(xhr.responseText) : null;
            callback(data, xhr.status);
        } catch (error) {
            console.error("Ошибка парсинга JSON:", error);
            callback(null, xhr.status);
        }
    }
}

export const ajax = new Ajax();
