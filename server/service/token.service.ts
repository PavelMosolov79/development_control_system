import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken');
const db = require('../models/db')

class TokenService {
    generateTokens(payload: any) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'});
        return {accessToken, refreshToken}
    }

    validateAccessToken(token: string) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        } catch (err) {
            return null;
        }
    }

    validateRefreshToken(token: string) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (err) {
            return null;
        }
    }

    async saveToken(userId: number, refreshToken: string): Promise<any> {
        const tokenData = await prisma.token.findFirst({
            where: { personId: userId }
        })

        if (tokenData) {
            const token = await prisma.token.update({
                where: {
                    id: tokenData.id
                },
                data: {
                    refreshToken: refreshToken
                }
            })
            return token;
        }

        const token = await prisma.token.create({
            data: {
                personId: userId,
                refreshToken: refreshToken
            }
        })

        return token;
    }

    async removeToken(refreshToken: string): Promise<any> {
        const tokenId = await prisma.token.findFirst({
            where: { refreshToken: refreshToken }
        })

        if (tokenId) {
            let tokenDelete = await prisma.token.delete({
                where: { id: tokenId.id  }
            })

            return tokenDelete;
        } else {
            return null;
        }
    }

    async findToken(refreshToken: string): Promise<any> {
        let tokenId = await prisma.token.findFirst({
            where: { refreshToken: refreshToken }
        })

        if (tokenId) {
            return tokenId;
        } else {
            return null;
        }
    }
}

module.exports = new TokenService();