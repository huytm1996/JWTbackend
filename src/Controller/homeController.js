import express from "express";

/**
 * app: express app
 */

const hanldeHelloword = (req, res) => {

    return res.render('home.ejs');
}
const hanldeUsePage = (req, res) => {

    return res.render('userpage.ejs');
}
module.exports = { hanldeHelloword, hanldeUsePage };
