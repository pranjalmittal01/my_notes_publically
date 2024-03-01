const express = require('express');
const User = require('../models/User')
const router = express.Router();
const { body, validationResult } = require('express-validator');


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
        // console.log(user);
        if (user) {
            return res.status(404).json({ result: "Sorry a user with this email is already exists" })
        }

        // Create a New User
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })

        // .then(user => res.json(user))
        // .catch(err => {console.log(err)
        // res.json({result: 'Please! Enter a unique value for Email', message: err.message})})

       res.json(user)
       
    } catch (error) {
        console.error(result.message);
        res.status(500).send("Oops! Some Error Occured")
    }
})

module.exports = router