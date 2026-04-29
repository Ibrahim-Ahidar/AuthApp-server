const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.roles) return res.sendStatus(401);
        const rolesArray = [...allowedRoles];
        const normalizedUserRoles = req.roles.map(role => Number(role));
        const result = normalizedUserRoles.some(role => rolesArray.includes(role));
        if (!result) return res.sendStatus(403);
        next();
    }
}
module.exports = verifyRoles;