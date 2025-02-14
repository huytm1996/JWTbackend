
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
const CreateUser = async (data) => {
    let hashpass = hashPassword(data.pass);
    try {
        await db.User.create({
            email: data.email,
            password: data.pass,
            username: data.username,
            address: data.address,
            phone: data.phone,
            groupid: data.groupid
        })
        return {
            EC: 0,
            EM: 'Create User succesfully!'

        };
    }
    catch (error) {
        console.log(error);
    }
}
const GetlistUser = async () => {

    //test redational
    let user = await db.User.findOne({
        where: {
            id: 1
        },
        attributes: ["id", "username", "email"],
        include: {
            model: db.Group, attributes: ["name", "description"]
        },
        raw: true,
        nest: true
    });

    // let r = await db.Role.findAll({
    //     include: { model: db.Group, where: { id: 1 } },
    //     attributes: ["id"],
    //     raw: true,
    //     nest: true
    // })

    //console.log('check role:>>>', r)

    // create the connection, specify bluebird as Promise

    try {

        let users = []
        users = await db.User.findAll({
            raw: true,
            nest: true
        });
        return users;
    }
    catch (error) {
        console.log(error);
    }

}

const DeleteUser = async (id) => {
    // create the connection, specify bluebird as Promise
    try {
        console.log('DeleteUser-id:', id);
        await db.User.destroy({
            where: {
                id: id
            }

        });
        return {
            EC: 0,
            EM: "Delete successfully!"
        }
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
const EditUser = async (data) => {
    // create the connection, specify bluebird as Promise


    try {
        if (data) {
            let respones = await db.User.update({
                email: data.email,
                username: data.username
            },
                {
                    where: { id: data.id }
                }
            );
            return {
                EC: 0,
                EM: 'Edit User Successfully!'
            };
        }

    }
    catch (error) {

    }

}
const GetAllUser = async () => {
    try {
        let listuser = await db.User.findAll({
            raw: true,
            nest: true
        });

        return {
            EC: 0,
            EM: '',
            DT: listuser
        };

    }



    catch (error) {

    }
}
module.exports = {
    hashPassword, CreateUser, GetlistUser, DeleteUser, EditViewUser,
    EditUser, GetAllUser
}