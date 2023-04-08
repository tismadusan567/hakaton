"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require("express");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const UserModel = require('./models/UserModel');
function startDbConnection() {
    const db_url = "mongodb+srv://vnikolic7821rn:frlqAT5jTsmTdZut@cluster0.dj5ugyr.mongodb.net/?retryWrites=true&w=majority";
    mongoose.connect(db_url);
    const flag = mongoose.connection;
    flag.once('open', () => {
        console.log("Database connection established succesfully!");
    });
}
const app = express();
app.use(express.json());
app.post('/register', (req, res) => {
    const user = new UserModel({
        username: req.body.username,
        email: req.body.email,
        firstName: req.body.firstName,
        lastname: req.body.lastName,
        password: bcrypt.hashSync(req.body.password, 10),
    });
    try {
        user.save();
        const userObj = {
            username: user.username
        };
        const token = jwt.sign(userObj, process.env.ACCESS_TOKEN_SECRET);
        console.log(token);
        res.json({ token: token });
    }
    catch (e) {
        res.status(500).send(e);
    }
});
app.post('/login', (req, res) => {
    try {
        const user = UserModel.findOne({ username: req.body.username });
        if (bcrypt.compareSync(req.body.password, user.password)) {
            const obj = {
                username: user.username
            };
            const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);
            res.json({ token: token });
        }
        else {
            res.status(400).json({ msg: "Invalid credentials" });
        }
    }
    catch (e) {
        res.status(500).send(e);
    }
});
app.listen({ port: 31338 }, () => __awaiter(void 0, void 0, void 0, function* () {
    yield startDbConnection();
}));
