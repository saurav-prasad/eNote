const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const JWT_SECRET = 'thisissecret';

// Route 1: creating a user using : POST '/api/auth/createuser'. Doesn't require login
router.post('/createuser', [
    body('email', 'Enter a valid email').isEmail(),
    body('name').isLength({ min: 3 }),
    body('password').isLength({ min: 5 })],

    async (req, res) => {
        let success;
        // Checks if there are any errors, return bad requests
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            success = false;
            return res.status(400).json({ success: success, message: "Bad request", errors: errors.array() });
        }

        try {

            // Check if the user with the same email adderess already exists
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                success = false;
                return res.status(400).json({ success: success, emailExist: "User with this email already exists" })
            }
            // hashing password
            const salt = await bcrypt.genSalt(10);
            const securePassword = await bcrypt.hash(req.body.password, salt);
            // creating user
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: securePassword,
                phone: req.body.phone,
            })
            const data = {
                user: {
                    id: user.id
                }
            }
            // generate token
            success = true;
            const token = await jwt.sign(data, JWT_SECRET);
            console.log(token)
            // res.send({ "userdetails": user, message: "User created" })
            res.send({ success: success, "token": token, userName: user.email, message: "User created" })
        }
        catch (err) {
            console.error(err)
            res.status(500).send("Internal server error occured!")
        }
    })


// Route 2: Authenticate a user using : POST '/api/auth/login'. no require login
router.post('/loginuser', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password required').exists()],
    async (req, res) => {

        // Checks if there are any errors, return bad requests
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        try {
            let success;

            // Check if the user with the same email address already exists
            let user = await User.findOne({ email })
            if (!user) {
                success = false;
                return res.status(400).json({ success: success, error: "Either Email or password is incorrect" })
            }
            // compairing passwords
            const matchPassword = await bcrypt.compare(password, user.password)
            if (!matchPassword) {
                success = false;
                return res.status(400).json({ success: success, error: "Either email or Password incorrect" })
            }

            const data = {
                user: {
                    id: user.id
                }
            }
            // token generation
            success = true;
            const token = await jwt.sign(data, JWT_SECRET);
            // console.log(token)
            res.send({ success: success, "token": token, userName: req.body.email, message: "User logged-in" })

        }
        catch (err) {
            console.error(err)
            res.status(500).send("Internal server error occured!")
        }

    })


// Route 3: get logged-in user's detail : POST '/api/auth/getuser'. require login
router.post('/getuser', fetchUser,
    async (req, res) => {
        try {
            const userId = req.user.id;
            const user = await User.findById(userId).select('-password')
            res.send(user)
        } catch (err) {
            console.error(err)
            res.status(500).send("Internal server error occured!")
        }
    })


module.exports = router;