const jwt = require('jsonwebtoken');
const db = require('../models/db')

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'});
        return {accessToken, refreshToken}
    }

    // Поиск токена для пользователя
    async saveToken(userId, refreshToken) {
        const tokenData = await db.query('SELECT * FROM token WHERE userId = $1', [userId]);
        if (tokenData.rows.length > 0) {
            const token = await db.query('UPDATE token set refreshToken = $2 where id = $1  RETURNING *', [userId, refreshToken]);
            return token;
        }

        const token = await db.query('INSERT INTO token (userId, refreshToken) values ($1, $2) RETURNING *', [userId]);
        return token;
    }
}

module.exports = new TokenService();