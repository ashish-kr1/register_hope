const express = require('express');
var jwt = require('jsonwebtoken');
var User = require('../../models/user');
var config = require('../../config/database');
var userschema = require('../../models/schema')
var bcrypt = require('bcryptjs');
var token;
module.exports = {
    signup: async (req, res) => {
        var newUser = await new userschema({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            contact_no: req.body.contact_no,
            age: req.body.age,
            gender: req.body.gender,
            password: req.body.password,
        });
        var un = await new userschema({
            username: req.body.username,
        });
        User.getByUsern(un.username, (err, user) => {
            if (err) throw err;
            if (user) {
                return res.status(501).json({ success: false, message: 'Choose another username' });

            }
            else {
                User.createUser(newUser, (err, user) => {
                    if (err) {
                        res.status(400).json({ success: false, message: 'user is not registered' });

                    }
                    else {
                        res.status(201).json({ success: true, message: 'user success' });

                    }
                });
            }
        })


    },
    login: async (req, res) => {
        var email = await req.body.email;
        var password = await req.body.password;

        User.getUserByEmail(email, (err, user) => {
            if (err) throw err;
            if (!user) {
                //return res.json({ success: false, message: 'no user found' });
                return res.sendStatus(404);
            }
            User.comparePassword(password, user.password, function (err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    token = jwt.sign(user.toJSON(), config.secret, { expiresIn: 600000 });
                    res.json({
                        success: true, token: 'JWT ' + token,
                        user: {
                            id: user._id,
                            username: user.username,
                            email: user.email,
                            password: user.password,
                            name: user.name,
                            contact_no: user.contact_no,
                            age: user.age,
                            gender: user.gender,
                            role: user.role
                        }
                    });
                } else {
                    //return res.json({ success: false, message: 'password not match' });
                    return res.sendStatus(401);
                }
            });
        });
    },
    forgetPassword: async (req, res) => {
        const email = await req.body.email;
        const password = await req.body.password;
        User.getUserByEmail(email, function (err, user) {
            if (err) throw err;
            if (!user) {
                //return res.json({ success: false, message: 'no user found' });
                return res.sendStatus(404);
            }


            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password, salt, function (err, hash) {
                    if (err) throw err;
                    userschema.findOneAndUpdate({ email: email },
                        {
                            $set: {

                                password: hash
                            }
                        }, (err, user) => {
                            if (err) return res.sendStatus(404);
                            else {
                                res.status(200).send({ data: 'done' });
                            }
                        })
                })
            })
        });
    }
}



