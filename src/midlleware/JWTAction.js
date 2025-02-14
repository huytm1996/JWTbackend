import jwt from 'jsonwebtoken';
require('dotenv');
const createJWT = (payload) => {
    // let payload = {
    //     name: 'huytm'
    // }
    let key = process.env.JWT_SERCRET_KEY
    let token = jwt.sign(payload, key);

    jwt.sign(payload, key, function (err, decoded) {
        if (err) {
            console.log(err);
        }
    });
    return token;
}
const veryfiToken = (token) => {

    try {
        let key = process.env.JWT_SERCRET_KEY;
        let decoded = jwt.verify(token, key);
        return decoded;

    }
    catch (ex) {
        console.log(ex);
    }

    //  jwt.verify(token, key, function (err, decoded) {
    //     if (err) {
    //         return
    //     }

    //     return decoded;

    // });

}
module.exports = {
    createJWT, veryfiToken
};