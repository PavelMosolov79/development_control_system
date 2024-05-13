import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail.service');
const tokenService = require('./token.service');
const UserDto = require('../dtos/user.dto');
const db = require("../models/db");
const ApiError = require('../exceptions/api.error')

class UserService {
    async registration(email: string, password: string, name: string, surname: string, middlename: string): Promise<any> {
        try {
            const user = await prisma.person.findFirst({
                where: { email }
            });
            // await db.query(`SELECT * FROM person WHERE email = $1`, [email]);

            if (user) {
                throw ApiError.BadRequest(`The user with the mail ${email} already exists!`);
            }

            const hashPassword = await bcrypt.hash(password, 3);
            const activationLink = uuid.v4();
            const newPerson = await prisma.person.create({
                data: {
                    name: name,
                    surname: surname,
                    middlename: middlename,
                    password: hashPassword,
                    email: email,
                    phone: "",
                    isactivated: false,
                    activationlink: activationLink
                }
            })
                // await db.query('INSERT INTO person (password, email, isActivated, activationLink) values ($1, $2, $3, $4) RETURNING *',
                // [hashPassword, email, false, activationLink])

            await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

            const userDto = new UserDto(newPerson); //
            console.log(userDto)
            const tokens = tokenService.generateTokens({...userDto});

            await tokenService.saveToken(userDto.id, tokens.refreshToken);

            return {...tokens, userDto}

        } catch (error) {
            throw ApiError.BadRequest(error);
        }
    }

    async activate(activationLink: string):Promise<any> {
        const user = await db.query(`SELECT * FROM person WHERE activationlink = $1`, [activationLink]);
        if (user.rows.length <= 0) {
            throw ApiError.BadRequest('Incorrect link activation!')
        }
        const updateUser = await db.query(`UPDATE person SET isactivated = $1 WHERE id = $2 RETURNING *`, [true, user.rows[0].id]);
    }

    async login(email: string, password: string):Promise<any> {
        try {
            const user = await db.query(`SELECT * FROM person WHERE email = $1`, [email]);

            if (user.rows.length <= 0) {
                throw ApiError.BadRequest(`The user with the mail ${email} does not exist!`, []);
            }

            const isPassEquals = await bcrypt.compare(password, user.rows[0].password);

            if (!isPassEquals) {
                throw ApiError.BadRequest('Invalid password!');
            }

            const userDto = new UserDto(user.rows[0]);
            const tokens = tokenService.generateTokens({...userDto});

            await tokenService.saveToken(userDto.id, tokens.refreshToken);

            return {...tokens, userDto}
        } catch (error) {
            throw ApiError.BadRequest(error);
        }
    }

    async logout(refreshToken: string): Promise<any> {
        const token = await tokenService.removeToken(refreshToken);

        return token;
    }

    async refresh(refreshToken: string): Promise<any> {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }

        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);

        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }

        const user = await db.query(`SELECT * FROM person WHERE id = $1`, [userData.id]);
        const userDto = new UserDto(user.rows[0]);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, userDto}
    }

    async getAllUsers() {
        const users = await db.query('SELECT * FROM person');
        return users;
    }
}

module.exports = new UserService();