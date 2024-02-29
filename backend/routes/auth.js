const express = require('express');
const User = require('../models/User')
const router = express.Router();
const { body, validationResult } = require('express-validator');


// Create a user using POST "/api/auth/" . Doesn't require Auth
router.post('/', [
    body('name', 'Enter a valid Name').isLength({ min: 3 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password must e atleast 5 characters').isLength({ min: 5 }),
], (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({result: result.array() });
    }
    // res.send({ errors: result.array() });

    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }).then(user => res.json(user))
    .catch(err => {console.log(err)
        res.json({result: 'Please! Enter a unique value for Email', message: err.message})})

    // res.send(req.body)
})

module.exports = router