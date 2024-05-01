const jwt = require('jsonwebtoken');
const db = require('../models/db')

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'});
        return {accessToken, refreshToken}
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        } catch (err) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (err) {
            return null;
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await db.query('SELECT * FROM token WHERE userId = $1', [userId]);
        if (tokenData.rows.length > 0) {
            const token = await db.query('UPDATE token set refreshToken = $2 where id = $1  RETURNING *', [userId, refreshToken]);
            return token;
        }

        const token = await db.query('INSERT INTO token (userId, refreshToken) values ($1, $2) RETURNING *', [userId, refreshToken]);
        return token;
    }

    async removeToken(refreshToken) {
        let refTokenStr = '\'' + refreshToken + '\'';
        const tokenData = await db.query('SELECT * FROM token');
        let tokenId = await tokenData.rows.find(xx => xx.refreshtoken === refreshToken);
        let tokenDelete = await db.query('DELETE FROM token WHERE id = $1 RETURNING *', [tokenId.id]);
        return tokenDelete;
    }

    async findToken(refreshToken) {
        const tokenData = await db.query('SELECT * FROM token');
        let tokenId = await tokenData.rows.find(xx => xx.refreshtoken === refreshToken);
        return tokenId;
    }
}

module.exports = new TokenService();