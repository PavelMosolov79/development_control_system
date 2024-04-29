const db = require('../models/db')

class UserController {
    async registration (req, res, next) {

    }

    async login (req, res, next) {

    }

    async logout (req, res, next) {

    }

    async activate (req, res, next) {

    }

    async refresh (req, res, next) {

    }

    async findUser(req, res) {
        try {
            const email = req.params.email
            const user = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
            res.json(user.rows);
        } catch (err) {
            console.log(err);
        }
    }

    async createUser(req, res) {
        try {
            const {name, surname, middleName, password, email, phone, isActivated, activationLink} = req.body
            const newPerson = await db.query('INSERT INTO person (name, surname, middleName, password, email, phone, isActivated, activationLink)' +
                                             'values ($1, $2, $3, $4, $5, $6, $7, $8,) RETURNING *', [name, surname, middleName, password, email, phone, isActivated, activationLink])
            res.json(newPerson.rows[0])
        } catch (err) {
            console.log(err);
        }
    }

    async getUser(req, res) {
        try {
            const users = await db.query('SELECT * FROM person')
            res.json(users.rows)
        } catch (err) {
            console.log(err);
        }
    }

    async getOneUser(req, res) {
        try {
            const id = req.params.id
            const user = await db.query('SELECT * FROM person where id = $1', [id])
            res.json(user.rows[0])
        } catch (err) {
            console.log(err);
        }
    }

    async updateUser(req, res) {
        try {
            const {id, name, surname, middleName, password, email, phone, isActivated, activationLink} = req.body
            const user = await db.query("UPDATE person set name = $2, surname = $3, middleName = $4, password = $5, email = $6, phone = $7, isActivated = $8, activationLink = $9" +
                "where id = $1  RETURNING *", [id, name, surname, middleName, password, email, phone, isActivated, activationLink])
            res.json(user.rows[0])
        } catch (err) {
            console.log(err);
        }
    }

    async deleteUser(req, res) {
        try {
            const id = req.params.id
            const user = await db.query('DELETE FROM person where id = $1', [id])
            res.json(user.rows[0])
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new UserController();