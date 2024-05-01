const db = require('../models/db');
const  userService = require('../service/user.service');
const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/api.error');

class UserController {
    async registration (req, res, next) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error!', errors.array()));
            }

            const {email, password} = req.body;
            const userData = await userService.registration(email, password);

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});

            return res.json(userData);
        } catch (err) {
            next(err);
        }
    }

    async login (req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await userService.login(email, password);

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});

            return res.json(userData);
        } catch (err) {
            next(err);
        }
    }

    async logout (req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);

            res.clearCookie('refreshToken');
            return res.json(token); //для наглядности
        } catch (err) {
            next(err);
        }
    }

    async activate (req, res, next) {
        try {
            const activationLink = req.params.link;
            await  userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch (err) {
            next(err);
        }
    }

    async refresh (req, res, next) {
        try {
            const {refreshToken} = req.body;
            const userData = await userService.refresh(refreshToken);

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});

            return res.json(userData);
        } catch (err) {
            next(err);
        }
    }

    async findUser(req, res, next) {
        try {
            const email = req.params.email;
            const user = await db.query(`SELECT * FROM person WHERE email = $1`, [email]);
            res.json(user.rows);
        } catch (err) {
            next(err);
        }
    }

    async createUser(req, res, next) {
        try {
            const {name, surname, middleName, password, email, phone, isActivated, activationLink} = req.body;
            const newPerson = await db.query('INSERT INTO person (name, surname, middleName, password, email, phone, isActivated, activationLink)' +
                                             'values ($1, $2, $3, $4, $5, $6, $7, $8,) RETURNING *', [name, surname, middleName, password, email, phone, isActivated, activationLink]);
            res.json(newPerson.rows[0]);
        } catch (err) {
            next(err);
        }
    }

    async getUser(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            res.json(users);
        } catch (err) {
            next(err);
        }
    }

    async getOneUser(req, res, next) {
        try {
            const id = req.params.id;
            const user = await db.query('SELECT * FROM person where id = $1', [id]);
            res.json(user.rows[0]);
        } catch (err) {
            next(err);
        }
    }

    async updateUser(req, res, next) {
        try {
            const {id, name, surname, middleName, password, email, phone, isActivated, activationLink} = req.body;
            const user = await db.query("UPDATE person set name = $2, surname = $3, middleName = $4, password = $5, email = $6, phone = $7, isActivated = $8, activationLink = $9" +
                "where id = $1  RETURNING *", [id, name, surname, middleName, password, email, phone, isActivated, activationLink]);
            res.json(user.rows[0]);
        } catch (err) {
            next(err);
        }
    }

    async deleteUser(req, res, next) {
        try {
            const id = req.params.id;
            const user = await db.query('DELETE FROM person where id = $1', [id]);
            res.json(user.rows[0]);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new UserController();