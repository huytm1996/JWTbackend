
// get the client
import mysql from 'mysql2/promise';

// get the promise implementation, we will use bluebird
import bluebird from 'bluebird';





var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
const hashPassword = (password) => {
    var hashpassword = bcrypt.hashSync(password, salt);
    return hashpassword;
}
const CreateUser = async (email, pass, username) => {
    let hashpass = hashPassword(pass);
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
    });


    try {
        const [results, fields] = await connection.execute('Insert into users(email, username, password) values(?,?,?)', [email, username, hashpass]);
        return results
    }
    catch (error) {
        console.log(error);
    }
}
const GetlistUser = async () => {
    // create the connection, specify bluebird as Promise
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
    });


    try {
        const [results, fields] = await connection.execute('Select * from users');
        return results
    }
    catch (error) {
        console.log(error);
    }

}

const DeleteUser = async (id) => {
    // create the connection, specify bluebird as Promise
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
    });


    try {
        const [results, fields] = await connection.execute(`Delete from users where id=${id}`);
        return results;
    }
    catch (error) {
        console.log(error);
    }

}
const EditViewUser = async (id) => {
    // create the connection, specify bluebird as Promise
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
    });


    try {
        const [results, fields] = await connection.execute(`Select * from users where id=${id}`);
        return results
    }
    catch (error) {
        console.log(error);
    }

}
const EditUser = async (id, email, username) => {
    // create the connection, specify bluebird as Promise
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
    });


    try {
        const [results, fields] = await connection.execute(`Update users set email ='${email}', username ='${username}' where id=${id}`);
        return results
    }
    catch (error) {
        console.log(error);
    }

}
export { hashPassword, CreateUser, GetlistUser, DeleteUser, EditViewUser, EditUser }