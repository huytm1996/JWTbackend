import db from "../models";
import bcrypt from 'bcryptjs';
var salt = bcrypt.genSaltSync(10);
const hashPassword = (password) => {
    var hashpassword = bcrypt.hashSync(password, salt);
    return hashpassword;
}
const registerNewUser = async (data) => {
    try {
        //check email,phone, are exist
        let existEmail = await checkemail(data.email);
        console.log('existEmail', existEmail);
        if (existEmail === true) {
            return {
                EM: 'The Email is aleady exits',
                EC: 1
            }
        }
        let existPhone = await checkphone(data.phone);
        console.log('existPhone', existPhone);
        if (existPhone === true) {
            return {
                EM: 'The Phone is aleady exits',
                EC: 1
            }
        }
        //has pass
        let hashpassword = hashPassword(data.password);

        // create user

        await db.User.create({
            email: data.email,
            password: hashpassword,
            username: data.username,
            phone: data.phone,
            groupId: 1
        })
        //console.log('create', 'ok');
        return {
            EM: "A user created successfully",
            EC: 0
        }
    }
    catch (e) {
        return {
            EM: "Something error",
            EC: -1
        }
    }

}

const checkemail = async (email) => {
    let emailcheck = await db.User.findOne({ where: { email: email } });

    if (emailcheck) {
        return true;
    }

    return false;


}
const checkphone = async (phone) => {
    let phonecheck = await db.User.findOne({ where: { phone: phone } });

    if (phonecheck) {
        return true;
    }

    return false;


}
module.exports = {

    registerNewUser
}