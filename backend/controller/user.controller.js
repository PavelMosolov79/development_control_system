const db = require('../db')

class UserController {
    async createUser(req, res) {
        const {name, surname, middleName, password, email, phone} = req.body
        const newPerson = await db.query('INSERT INTO person (name, surname, middleName, password, email, phone)' +
                                         'values ($1, $2, $3, $4, $5, $6) RETURNING *', [name, surname, middleName, password, email, phone])
        res.json(newPerson.rows[0])
    }

    async getUser(req, res) {
        const users = await db.query('SELECT * FROM person')
        res.json(users.rows)
    }

    async getOneUser(req, res) {
        const id = req.params.id
        const user = await db.query('SELECT * FROM person where id = $1', [id])
        res.json(user.rows[0])
    }

    async updateUser(req, res) {
        const {id, name, surname, middleName, password, email, phone} = req.body
        const user = await db.query("UPDATE person set name = $2, surname = $3, middleName = $4, password = $5, email = $6, phone = $7 " +
            "where id = $1  RETURNING *", [id, name, surname, middleName, password, email, phone])
        res.json(user.rows[0])
    }

    async deleteUser(req, res) {
        const id = req.params.id
        const user = await db.query('DELETE FROM person where id = $1', [id])
        res.json(user.rows[0])
    }
}

module.exports = new UserController();