export default {
    server: {
        proxy: {
            "/stocks": {
                target: "http://localhost:3000",
                changeOrigin: true
            }
        }
    },
    build: {
        outDir: "./public",
        emptyOutDir: true
    }
};
