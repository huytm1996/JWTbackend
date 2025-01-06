import { json } from "body-parser";
import express from "express";
import mysql from 'mysql2';
import {
    hashPassword,
    CreateUser,
    GetlistUser,
    DeleteUser,
    EditViewUser,
    EditUser
} from '../Service/userService';
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
/**
 * app: express app
 */


const hanldeHelloword = (req, res) => {

    return res.render('home.ejs');
}
const hanldeUsePage = async (req, res) => {
    let listusers = await GetlistUser();
    return res.render('userpage.ejs', { listusers });
}
const hanldeCreateUser = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    CreateUser(email, password, username);
    res.redirect("/users");
}
const hanldeDeleteuser = async (req, res) => {
    let id = req.params.id;
    let respones = await DeleteUser(id);
    res.redirect("/users");

}
const hanldeEditVieweUser = async (req, res) => {
    let id = req.params.id;
    let user = await EditViewUser(id);
    let userview = {};
    if (user && user.length > 0) {
        userview = user[0];
    }

    return res.render('userupdate.ejs', { userview });

}
const hanldeEditUser = async (req, res) => {
    let id = req.body.id;
    let email = req.body.email;
    let username = req.body.username;
    let respones = await EditUser(id, email, username);
    return res.redirect('/users');

}
module.exports = {
    hanldeHelloword, hanldeUsePage, hanldeCreateUser,
    hanldeDeleteuser, hanldeEditVieweUser, hanldeEditUser
};
