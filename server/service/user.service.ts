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

            if (user) {
                throw ApiError.Conflict(`The user with the mail ${email} already exists!`);
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

            await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

            const userDto = new UserDto(newPerson);
            const tokens = tokenService.generateTokens({...userDto});

            await tokenService.saveToken(userDto.id, tokens.refreshToken);

            return {...tokens, userDto}

        } catch (error) {
            throw ApiError.BadRequest(error);
        }
    }

    async activate(activationLink: string):Promise<any> {
        const user = await prisma.person.findFirst({
            where: { activationlink: activationLink }
        });

        if (!user) {
            throw ApiError.BadRequest('Incorrect link activation!')
        }

        const updateUser = await prisma.person.update({
            where: {
                id: user.id
            },
            data: {
                isactivated: true
            }
        });
    }

    async login(email: string, password: string):Promise<any> {
        try {
            const user = await prisma.person.findFirst({
                where: { email }
            });

            if (!user) {
                throw ApiError.BadRequest(`The user with the mail ${email} does not exist!`, []);
            }

            const isPassEquals = await bcrypt.compare(password, user.password);

            if (!isPassEquals) {
                throw ApiError.BadRequest('Invalid password!');
            }

            const userDto = new UserDto(user);
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

        const user = await prisma.person.findFirst({
            where: { id: userData.id }
        });


        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, userDto}
    }

    // async getAllUsers() {
    //     const users = await db.query('SELECT * FROM person');
    //     return users;
    // }
}

module.exports = new UserService();