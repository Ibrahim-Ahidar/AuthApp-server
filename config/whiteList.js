const normalizeOrigin = (value) => {
    if (!value) return null;
    const cleaned = String(value).trim().replace(/^['"]|['"]$/g, "");
    try {
        return new URL(cleaned).origin;
    } catch {
        return cleaned.replace(/\/+$/, "");
    }
};

const envOrigins = (process.env.CLIENT_ORIGINS || process.env.CLIENT_ORIGIN || "")
    .split(",")
    .map(normalizeOrigin)
    .filter(Boolean);

const explicitOrigins = [
    "https://auth-app-client-three.vercel.app",
    "https://auth-app-client-git-master-ibrahim-ahidars-projects.vercel.app",
    "https://auth-app-client-b07ml50zh-ibrahim-ahidars-projects.vercel.app",
    "http://127.0.0.1:5500",
    "http://localhost:3500",
    "http://localhost:5173",
].map(normalizeOrigin);

const whitelist = [...new Set([...envOrigins, ...explicitOrigins].filter(Boolean))];

const isAllowedOrigin = (origin) => {
    const normalized = normalizeOrigin(origin);
    if (!normalized) return true; // non-browser or same-origin requests
    if (whitelist.includes(normalized)) return true;
    return /^https:\/\/auth-app-client(?:-[\w-]+)?\.vercel\.app$/.test(normalized);
};

module.exports = { whitelist, isAllowedOrigin };