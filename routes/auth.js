const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../Models/user');
const e = require('express');
const auth = require('../Middleware/auth');

const authRouter = express.Router();


// Sign up user
authRouter.post("/api/signup", async (req, res) => {
    try {
        const { name, email, password, mobileNumber } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ msg: "User with same email already exist" });
        }

        const hashedPassword = await bcrypt.hash(password, 8);
        let user = new User({ email, password: hashedPassword, name, mobileNumber });
        user = await user.save();
        res.json(user);
        
    } catch (e) {
        res.status(500).json({ error: e.message });
    }

});

// Sign in user
authRouter.post("/api/signin", async (req, res) => {
    try {
        const {email, mobileNumber, password} = req.body;

        const user = await User.findOne({ email, mobileNumber });
        if (!user) {
            return res.status(400).json({msg: "User with this credential does not exist!"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({msg: "Incorrect password"});
        }
        const token = jwt.sign({id: user._id}, "passwordKey");
        res.json({token, ...user._doc}); // object desctructuring
    } catch (error) {
        res.status(500).json({ error: e.message});
    }
});

//validate token
authRouter.post('/tokenIsValid', async (req, res) => {
    try {
        const token = req.header('x-auth-token');
        if(!token) return res.json(false);

        const verified = jwt.verify(token, 'passwordKey');
        if(!verified) return res.json(false);

        const user = await User.findById(verified.id);
        if(!user) return res.json(false);
        res.json(true);
    } catch (e) {
        res.status(500).json({error: e.message});
    }
});

//get user data
authRouter.get('/', auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({...user._doc, token: req.token});
})


module.exports = authRouter;