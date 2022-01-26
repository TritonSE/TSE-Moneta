const express = require('express');
const router = express.Router();

// Load User model
const User = require('../models/Users');

// /addUser

router.post('/addUser', (req, res) => {
    console.log(req.body)
    User.create(req.body)
    .then(user => console.log(user))
    .catch(err => res.status(400).json({ error: err }))
});

//remove route to be added

router.put('/editUser/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body)
    .then(user => {console.log(user)})
    .catch(err => {res.statusCode(400).json({error: err})})
});

router.get('/getUser/:id', (req, res) => {
    User.findById(req.params.id)
    .then(user => {console.log(user)})
    .catch(err => {res.statusCode(400).json({error: err})})
});

router.get('/getAllUsers', (req, res) => {
    User.find()
    .then(users => {console.log(users)})
    .catch(err => {res.statusCode(400).json({error: err})})
});

module.exports = router
