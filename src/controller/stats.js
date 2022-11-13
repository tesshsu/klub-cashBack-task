const express = require('express')
const router = new express.Router() // Here we create the router we will be exporting later
const Cashback = require("../model/Cashback");

router.get('/stats', async (req, res) => {
    try {
        const rRes = await Cashback.getTotalAmountByMerchant();
        if (rRes) {
            res.status(200).send(rRes)
        } else {
            res.status(400).send({ message: 'Invalid entry!' })
        }
    } catch(err) {
        res.status(500).send({ message: err.message })
    }
})

module.exports = router
