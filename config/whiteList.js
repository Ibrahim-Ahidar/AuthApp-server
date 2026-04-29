const whitelist = [
    process.env.CLIENT_ORIGIN,
    "http://127.0.0.1:5500",
    "http://localhost:3500",
    "http://localhost:5173"
].filter(Boolean);

module.exports = {whitelist};