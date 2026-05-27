class StockUrls {
    constructor() {
        this.baseUrl = "";
    }

    getStocks(title = "") {
        const params = new URLSearchParams();

        if (title) {
            params.append("title", title);
        }

        const queryString = params.toString();

        return queryString
            ? `${this.baseUrl}/stocks?${queryString}`
            : `${this.baseUrl}/stocks`;
    }

    getStockById(id) {
        return `${this.baseUrl}/stocks/${id}`;
    }

    createStock() {
        return `${this.baseUrl}/stocks`;
    }

    removeStockById(id) {
        return `${this.baseUrl}/stocks/${id}`;
    }

    updateStockById(id) {
        return `${this.baseUrl}/stocks/${id}`;
    }
}

export const stockUrls = new StockUrls();
