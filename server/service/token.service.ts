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

    validateAccessToken(token: any) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        } catch (err) {
            return null;
        }
    }

    validateRefreshToken(token: any) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (err) {
            return null;
        }
    }

    async saveToken(userId: number, refreshToken: any): Promise<any> {
        const tokenData = prisma.token.findFirst({
            where: { personId: userId }
        })
            // await db.query('SELECT * FROM token WHERE userId = $1', [userId]);
        if (tokenData) {
            // const user = prisma.person.findUnique({
            //     where: { id: userId },
            //     select: {
            //
            //     }
            // })
            const token = prisma.token.update({
                // where: {
                //     personId: userId
                // }
            })
                // await db.query('UPDATE token set refreshToken = $2 where userid = $1  RETURNING *', [userId, refreshToken]);
            return token;
        }

        const token = await db.query('INSERT INTO token (userId, refreshToken) values ($1, $2) RETURNING *', [userId, refreshToken]);
        return token;
    }

    async removeToken(refreshToken: string): Promise<any> {
        function cheToken(token: any) {
            return token.refreshtoken! === refreshToken;
        }

        const tokenData = await db.query('SELECT * FROM token');
        let tokenId = await tokenData.rows.find(cheToken);
        let tokenDelete = await db.query('DELETE FROM token WHERE id = $1 RETURNING *', [tokenId.id]);
        return tokenDelete;
    }

    async findToken(refreshToken: any): Promise<any> {
        function cheToken(token: any) {
            return token.refreshtoken! === refreshToken;
        }

        const tokenData = await db.query('SELECT * FROM token');

        let tokenId = await tokenData.rows.find(cheToken);//xx => xx.refreshtoken === refreshToken);
        return tokenId;
    }
}

module.exports = new TokenService();