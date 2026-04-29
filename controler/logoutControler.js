const User = require("../model/User");


const handlelogout = async (req, res) => {
    //on client, also delete the accesstoken on client side 

    const cookies = req.cookies;
    const refreshToken = cookies?.jwt;
    const clearJwtCookie = () => {
        // Clear both common dev and prod variants so cookie is removed in Postman/browser.
        res.clearCookie("jwt", { httpOnly: true, path: "/" });
        res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true, path: "/" });
    };

    if (!refreshToken) {
        clearJwtCookie();
        return res.sendStatus(204);// seccessful there isnt cookies
    }

    const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();
    if (!foundUser) {
        clearJwtCookie();
        return res.sendStatus(204);
    }

    // delete  the refresh token in db  
    await User.updateOne(
        { _id: foundUser._id },
        { $unset: { refreshToken: "" } }
      );

    clearJwtCookie();
    res.sendStatus(204);
}
module.exports = { handlelogout };