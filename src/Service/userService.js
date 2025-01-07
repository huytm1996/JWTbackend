
// get the client
import mysql from 'mysql2/promise';

// get the promise implementation, we will use bluebird
import bluebird from 'bluebird';
import db from '../models';

const { Op } = require('sequelize');


var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
const hashPassword = (password) => {
    var hashpassword = bcrypt.hashSync(password, salt);
    return hashpassword;
}
const CreateUser = async (email, pass, username) => {
    let hashpass = hashPassword(pass);
    try {
        await db.User.create({
            email: email,
            password: pass,
            username: username
        })
        return 1;
    }
    catch (error) {
        console.log(error);
    }
}
const GetlistUser = async () => {
    // create the connection, specify bluebird as Promise

    try {

        let users = []
        users = await db.User.findAll();
        return users;
    }
    catch (error) {
        console.log(error);
    }

}

const DeleteUser = async (id) => {
    // create the connection, specify bluebird as Promise
    try {
        await db.User.destroy({
            where: {
                id: id
            }
        });
    }
    catch (error) {
        console.log(error);
    }

}
const EditViewUser = async (id) => {
    // create the connection, specify bluebird as Promise
    try {
        let user = {}
        user = await db.User.findOne({ where: { id: id } });
        user = user.get({ plain: true });
        return user;
    }

    catch (error) {
        console.log(error);
    }

}
const EditUser = async (id, email, username) => {
    // create the connection, specify bluebird as Promise


    try {
        let respones = await db.User.update({
            email: email,
            username: username
        },
            {
                where: { id: id }
            }
        );
        return respones;
    }
    catch (error) {

    }

}
export { hashPassword, CreateUser, GetlistUser, DeleteUser, EditViewUser, EditUser }