const express = require('express')
const router = new express.Router() // Here we create the router we will be exporting later
const Account = require('../model/Account') // Here we import the Account class from the model/Account.js file
const auth = require('../middleware/auth')

/*
    In this file, we will be creating the routes that will be 
    accessed by the API consumers to make changes or request
    to our API register.
*/

// When you see "our_server_address", consider it to be your server.
// For testing purposes, it'll be localhost:3006. But it can change
// on production environments.

// This is a post request to the address http://our_server_address/accounts
// It expects JSON data and return the created register.
router.post('/accounts', auth, async (req, res) => {
    try {
        const nAccount = await Account.create({...req.body, userId: req.user.id})
        if (nAccount) {
            res.status(201).send(nAccount)
        } else {
            res.status(400).send({ message: 'Invalid entry!' })
        }
    } catch(err) {
        res.status(500).send({ message: err.message })
    }
})

// This is a get request to the address http://our_server_address/accounts
// It does not expect any data and return all the accounts list
router.get('/accounts', auth, async (req, res) => {
    try {
        res.status(200).send(await Account.getAllOfOneUser(req.user.id))
    } catch(err) {
        res.status(500).send({ message: err.message })
    }
})

// This is a get request to the address http://our_server_address/accountes/[accountid]
// It expects just the account ID on the request URL and returns the appropriate account
router.get('/accounts/:id', auth, async (req, res) => {
    try {
        const foundAccount = await Account.getOne(req.params.id)
        if (foundAccount && foundAccount.user_id === req.user.id) {
            res.status(200).send(foundAccount)
        } else {
            res.status(404).send({ message: 'Account not found!'})
        }
    } catch(err) {
        res.status(500).send({ message: err.message })
    }
})

// This is a patch request to the address http://our_server_address/accounts/[accountid]
// It expects JSON data and the account ID on the URL, and return the updated register
router.patch('/account/:id', auth, async (req, res) => {
    try {
        const account = await Account.getOne(req.params.id)
        if (!account) return res.status(404).send({ message: 'Account not found!' })
        if (account.user_id === req.user.id) {
            const updatedAccount = await Account.patch(req.params.id, req.body)
            res.status(200).send(updatedAccount)
        } else {
            res.status(403).send({ message: 'This user has no access to this resource.'})
        }
    } catch(err) {
        res.status(500).send({ message: err.message })
    }
})

// This is a delete request to the address http://our_server_address/accountes/[accountid]
// It expects just the account ID on the URL, and returns a message about the deletion
router.delete('/accounts/:id', auth, async (req, res) => {
    try {
        const account = await Account.getOne(req.params.id)
        if (!account) return res.status(404).send({ message: 'Account not found!' })
        if (account.user_id === req.user.id) {
            const deleteMessage = await Account.delete(req.params.id)
            res.status(200).send(deleteMessage)
        } else {
            res.status(403).send({ message: 'This user has no access to this resource.'})
        }
        
    } catch(err) {
        res.status(500).send({ message: err.message })
    }
})

module.exports = router