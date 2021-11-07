const router = require('express').Router();
const cryptoJs = require('crypto-js')
const jwt = require('jsonwebtoken')
const User = require("../modals/user")
module.exports = router;

router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: cryptoJs.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),

    });
    try {
        const savedUsr = await newUser.save();
        console.log('->>> user' + savedUsr);
        res.status(200).json(savedUsr);

    } catch (error) {
        console.log(error);
        res.status(400).json(error);

    }
});

router.post("/login", async (req, res) => {

    try {
        const user = await User.findOne({
            username: req.body.username

        });
        !user && res.status(400).json("invalid Credential");
        const hashedPassword = cryptoJs.AES.decrypt(user.password, process.env.PASS_SEC);
        const Main_password = hashedPassword.toString(cryptoJs.enc.Utf8);
        Main_password != req.body.password && res.status(400).json("invalid Credential");


        const accessToken = jwt.sign({
            _id: user._id,
            isAdmin: user.isAdmin,
        }, process.env.JWT_sec, {
            expiresIn: "3d"
        });


        const {
            password,
            ...others
        } = user._doc;
        res.status(200).json({
            ...others,
            accessToken
        });

    } catch (error) {
        console.log(error);
        res.status(400).json(error);

    }
});