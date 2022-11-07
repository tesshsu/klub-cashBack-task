const knex = require('knex')
const config = require('../../knexfile')
const Transaction = require("./Transaction");
const db = knex(config.development)

class SepaTransfer extends Transaction{

    // tested
    static async create(sepaTransfer) {
        if (SepaTransfer.validate(sepaTransfer)) {
            sepaTransfer.transaction_id = sepaTransfer.transactionId
            delete sepaTransfer.transactionId
            const id = await db('sepaTransfers').insert(sepaTransfer)
            sepaTransfer.id = id[0]
            return sepaTransfer
        } else {
            return undefined
        }
    }

    // tested
    static validate(sepaTransfer) {
        let valid = true
        if (!sepaTransfer.expeditor_name) valid = false
        if (!sepaTransfer.transactionId) valid = false
        return valid
    }

    // tested
    static async getAll() {
        return db.select().table('sepaTransfers')
    }

    // tested
    static async getOne(id) {
        const sepaTransfer = await db('sepaTransfers').where({id})
        
        /**
         * In case of wish not found, knex returns an empty array.
         * Otherwise, it returns an array with just one item inside,
         * which would be the wish we're looking for.
         */
         if (sepaTransfer.length === 0) return undefined
         return sepaTransfer[0]
    }

    // tested
    static async delete(id) {
        const deletion = await db('sepaTransfers').where({id}).del()
        
        if (deletion > 0) return { message: 'SepaTransfer deleted successfully!' }
        return undefined
    }
}

/*
    Here we are exporting the class we just created, so
    it can be imported inside other files.
*/
module.exports = SepaTransfer