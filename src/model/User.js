// Already covered in part 2 - This module will not be used anymore,
// once the database already creates an unique id for each new register
// const uniqid = require('uniqid')

const knex = require('knex')
const config = require('../../knexfile')
const db = knex(config.development)

/*
    This is the library used to validate the email address
    in the user registration process.
*/
const validator = require('validator')

/*
    This is the library responsible for encrypting the password
    provided by the user in the registration process.
*/
const bcrypt = require('bcrypt')

/*
    This is a basic JavaScript class which handles our
    fake users database. For more informations on JS
    classes, please visit: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
*/
class User {

    static users = []

    // tested
    static async create(user) {
        if (User.validate(user)) {
            user.password = bcrypt.hashSync(user.password, 10)
            return await db('users').insert(user)
        } else {
            return undefined
        }
    }

    // tested
    static validate(user) {
        let valid = true
        if (!user.firstName) valid = false
        if (!user.lastName) valid = false
        if (!user.email || !validator.isEmail(user.email)) valid = false
        if (!user.password) valid = false
        return valid
    }

    // tested
    static async getOneByEmail(email) {
        const user = await db('users').where({email})
        
        /**
         * In case of user not found, knex returns an empty array.
         * Otherwise, it returns an array with just one item inside,
         * which would be the user we're looking for.
         */
        if (user.length === 0) return undefined
        return user[0]
    }

    // tested
    static comparePassword(password, hashPassword) {
        return bcrypt.compareSync(password, hashPassword)
    }
}

/*
    Here we are exporting the class we just created, so
    it can be imported inside other files.
*/
module.exports = User