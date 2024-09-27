const jwt = require("jsonwebtoken")
//const promisify = require("util").promisify
const {promisify} = require("util")
const {users} = require("../model")


exports.decodeToken = async (token, secret) => {
    const decryptedResult = await promisify(jwt.verify)(token, secret)
    return decryptedResult;
}