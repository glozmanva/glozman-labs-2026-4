class Ajax {
    get(url) {
        return this._send("GET", url);
    }

    post(url, data) {
        return this._send("POST", url, data);
    }

    patch(url, data) {
        return this._send("PATCH", url, data);
    }

    put(url, data) {
        return this._send("PUT", url, data);
    }

    delete(url) {
        return this._send("DELETE", url);
    }

    async _send(method, url, data = null) {
        const options = {
            method,
            headers: {}
        };

        if (data) {
            options.headers["Content-Type"] = "application/json;charset=utf-8";
            options.body = JSON.stringify(data);
        }

        const response = await fetch(url, options);
        const responseText = await response.text();
        const responseData = responseText ? JSON.parse(responseText) : null;

        if (!response.ok) {
            const error = new Error(responseData?.error || `Ошибка запроса. Статус: ${response.status}`);
            error.status = response.status;
            error.data = responseData;
            throw error;
        }

        return responseData;
    }
}

export const ajax = new Ajax();
