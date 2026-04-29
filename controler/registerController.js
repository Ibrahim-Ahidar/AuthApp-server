const User = require("../model/User");
const bcrypt = require("bcrypt");


const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ "message": "username and password are required" });
    // Check if username already exists.

    const duplicate = await User.findOne({ username: user }).exec();
    if (duplicate) {
        return res.sendStatus(409); //conflict
    }

    try {
        // Encrypt password before storing.
        const hashedPwd = await bcrypt.hash(pwd, 10);
        // Create and store new user.
        const result = await User.create({ username: user, password: hashedPwd });
        console.log(result);

        res.status(201).json({ "success": `New user ${user} created` });

    } catch (err) {
        res.status(400).json({ "message": err.message });
    }
}

module.exports = { handleNewUser };