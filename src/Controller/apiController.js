const { config } = require("bluebird");

import registerUser from "../Service/registerUser";
import loginService from "../Service/loginService";
import userService from "../Service/userService";
const testApi = (req, res) => {
    return res.status(200).json({
        message: 'ok',
        data: 'testapi'
    });
}

const hanldeRegister = async (req, res) => {

    try {//

        if (!req.body.email || !req.body.password || !req.body.phone) {
            return res.status(200).json({
                EM: 'Missing required parameters',  //error messe
                EC: '-1', //error code
                DT: ''
            });
        }
        let respones = await registerUser.registerNewUser(req.body);
        return res.status(200).json(respones);


    }
    catch (e) {
        return res.status(500).json({
            EM: 'error from server',  //error messe
            EC: '-1', //error code
            DT: ''
        });
    }
}
const haldeLogin = async (req, res) => {
    try {

        if (req.body) {
            let respones = await loginService.Login(req.body)
            res.cookie('jwt', respones.DT.access_token, { httpOnly: true });
            return res.status(200).json(respones);
        }
    }
    catch (e) {
        return res.status(500).json({
            EM: 'error from server',  //error messe
            EC: '-1', //error code
            DT: ''
        });
    }
}
const handeGetAllUser = async (req, res) => {
    try {
        console.log('handeGetAllUser', req.cookies);
        let respones = await userService.GetAllUser();

        return res.status(200).json(respones);

    }
    catch (e) {
        return res.status(500).json({
            EM: 'error from server',  //error messe
            EC: '-1', //error code
            DT: ''
        });
    }
}
const handeCreateUser = async (req, res) => {
    try {
        if (req.body) {

            let respones = await userService.CreateUser(req.body);

            console.log('handeCreateUser', respones);
            return res.status(200).json(respones);
        }


    }
    catch (e) {
        return res.status(500).json({
            EM: 'error from server',  //error messe
            EC: '-1', //error code
            DT: ''
        });
    }
}
const handeDeleteUser = async (req, res) => {
    try {
        console.log('handeDeleteUser', req.body);
        if (req.body) {

            let respones = await userService.DeleteUser(req.body.id);

            console.log('handeDeleteUser', respones);
            return res.status(200).json(respones);
        }


    }
    catch (e) {
        return res.status(500).json({
            EM: 'error from server',  //error messe
            EC: '-1', //error code
            DT: ''
        });
    }
}
const handeEditUser = async (req, res) => {
    try {
        console.log('handeEditUser', req.body);
        if (req.body) {

            let respones = await userService.EditUser(req.body);
            return res.status(200).json(respones);
        }


    }
    catch (e) {
        return res.status(500).json({
            EM: 'error from server',  //error messe
            EC: '-1', //error code
            DT: ''
        });
    }
}
module.exports = {
    testApi, hanldeRegister, haldeLogin,
    handeGetAllUser, handeCreateUser, handeDeleteUser, handeEditUser
}