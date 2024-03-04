const express = require('express');
const User = require('../models/User')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = "Pranjalisagoodgir$l"
 

// Create a user using POST "/api/auth/createuser". No login required 
router.post('/createuser', [
    body('name', 'Enter a valid Name').isLength({ min: 3 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password must e atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {

    // if there are errors, return bad request and errors
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ result: result.array() });
    }

    // check whether the user with this email exists already 
    try {
        let user = await User.findOne({ email: req.body.email });
        
        if (user) {
            return res.status(404).json({ result: "Sorry a user with this email is already exists" })
        }

        const salt = await bcrypt.genSalt(10);
        secPass = await bcrypt.hash(req.body.password, salt);
        // Create a New User
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });

        const data ={
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        // console.log(jwtData)
        // res.json(user)
        res.json({authtoken});

    } catch (error) {
        console.error(result.message);
        res.status(500).send("Oops! Some Error Occured")
    }
})

module.exports = router