// const aes = require('../helpers/aes.cipher')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const authService = {
    signToken: async function(id){
        return jwt.sign({id}, 'my app', {
            expiresIn: 60 * 60 * 24
        })
    },
    login: async function(data){
        try {
            const {email, password} = data
            // let pass = aes.encrypt(password)
            let userExists = await User.findOne({email: email},'name email password').exec()
            // return userExists
            if(await bcrypt.compare(password, userExists.password).then(res => res)){
                const token = await this.signToken(userExists.id)
                return {
                    user: userExists,
                    code:200,
                    token
                }
            }else{
                return {
                    code: 400,
                    error: true,
                    msg: "User or password incorrect"
                }
            }
        } catch (error) {
            return error
        }
    },
    register: async function(userData){
        try {
            // let pass = aes.encrypt(userData.password)
            let pass = await bcrypt.hash(userData.password, 10).then(res => res)
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