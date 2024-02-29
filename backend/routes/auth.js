const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    obj = {
        a: "Pranjal",
        number: 11
    }
    res.json(obj)
})

module.exports = router