const Op = require('Sequelize').Op;
import db from "../models";
import bcrypt from 'bcryptjs';
import jwtService from './jwtService';
import JWTAction from '../midlleware/JWTAction';
require("dotenv").config();
var salt = bcrypt.genSaltSync(10);
const hashPassword = (password) => {
    var hashpassword = bcrypt.hashSync(password, salt);
    return hashpassword;
}
const Login = async (data) => {

    //kiem tra email or phone co ton tai ko
    if (data.emailorphone) {
        let emailorphone_check = await checkEmailorPhone(data)

        return emailorphone_check;
    }


}
const checkEmailorPhone = async (data) => {

    let emailorphonecheck = await db.User.findOne({
        where: {
            [Op.or]: [{
                email: data.emailorphone

            }, {
                phone: data.emailorphone
            }],

        },
        raw: true,
        nest: true
    })

    if (emailorphonecheck) {

        let checkpass = bcrypt.compareSync(data.password, emailorphonecheck.password);
        console.log('checkpass', checkpass);
        if (checkpass === true) {

            //test role
            let groupWithRole = await jwtService.getGroupWithRole(emailorphonecheck);
            let payload = {
                email: data.emailorphone,
                groupWithRole: groupWithRole,
                expriseIn: process.env.JWT_EXPIRESIN // milisec
            }
            let token = JWTAction.createJWT(payload);
            console.log('token', token);

            return {
                EC: 0,
                EM: "Login succesfully!",
                DT: {
                    access_token: token,
                    data: groupWithRole
                }
            }
        }
        else {
            return {
                EC: 1,
                EM: "Password is corrects!"

            }
        }
    }
    else {
        return {
            EM: "Email or Phone does not exits",
            EC: 1
        }
    }

}
module.exports = { Login };