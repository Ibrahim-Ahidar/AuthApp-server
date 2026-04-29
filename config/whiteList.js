const normalizeOrigin = (value) => {
    if (!value) return null;
    const cleaned = String(value).trim().replace(/^['"]|['"]$/g, "");
    try {
        return new URL(cleaned).origin;
    } catch {
        return cleaned.replace(/\/+$/, "");
    }
};

const whitelist = [
    normalizeOrigin(process.env.CLIENT_ORIGIN),
    "https://auth-app-client-three.vercel.app",
    "http://127.0.0.1:5500",
    "http://localhost:3500",
    "http://localhost:5173"
].filter(Boolean);

module.exports = {whitelist};