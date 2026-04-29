const User = require("../model/User");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");


const handelogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': "username and password are required" });

    const foundUser = await User.findOne({ username: user }).exec();
    if (!foundUser) {
        return res.sendStatus(401); // unauth
    }
    //evaluate
    const match = await bcrypt.compare(pwd, foundUser.password);
    
    if (match) {
        const rolesObject = typeof foundUser.roles?.toObject === "function"
            ? foundUser.roles.toObject()
            : (foundUser.roles || {});
        const roles = [
            rolesObject.User,
            rolesObject.Editor,
            rolesObject.Admin,
        ].filter(role => typeof role === "number");
        //creat jwt
        const accessToken = jwt.sign(
            {
                'UserInfo': {
                    "username": foundUser.username,
                    "roles": roles
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        )
        //saving the token with the user
        await User.updateOne(
            { username: user },
            { $set: { refreshToken: refreshToken } }
          );

        const isProduction = process.env.NODE_ENV === "production";
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            sameSite: isProduction ? "none" : "lax",
            secure: isProduction,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accessToken })

    } else {
        res.sendStatus(401);
    }
}
module.exports = { handelogin };