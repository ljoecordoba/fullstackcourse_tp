require('mongoose');
const Usr = require('../models/user');
const jwt = require('jsonwebtoken');
const {SECRET} = require('../utils/config.js');

const login = async(email,password) => {
    console.log("trying")
    const cryptoPass = require('crypto')
        .createHash('sha256')
        .update(password)
        .digest('hex');
    console.log("cryptoPass: ",cryptoPass)
    const  result = await Usr.findOne({ email: email, isActive:true, password:cryptoPass })
    
    if (result){
            // retorno token
            //jwt.sign('payload','secret_key','options')
            const token = jwt.sign({ userId: result._id }, SECRET, { expiresIn: '1h' });   
            //const token = "fgdgbrfeer6g1df23g86ef2gs";
            return token;
    }
    return null; // retorno 

}

module.exports = {login}