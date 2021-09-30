const aes = require('../helpers/aes.cipher')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const authService = {
    signToken: async function(id){
        return jwt.sign({id}, 'my app', {
            expiresIn: 60 * 60 * 24
        })
    },
    login: async function(data){
        try {
            const {email, password} = data
            let pass = aes.encrypt(password)
            let userExists = await User.findOne({
                where: {
                    email: email,
                    password: pass
                }
            })
            if(!userExists){
                return {
                    code: 400,
                    error: true,
                    msg: "User or password incorrect"
                }
            }
            const token = await this.signToken(userExists.id)
            return {
                user: userExists,
                code:200,
                token
            }
        } catch (error) {
            return error
        }
    },
    register: async function(userData){
        try {
            let pass = aes.encrypt(userData.password)
            userData.password = pass
            await userData.save();
            let token = await this.signToken(userData._id)
            return {
                user: userData,
                code: 200,
                token
            }
        } catch (error) {
            return error
        }
    }
}

module.exports = authService