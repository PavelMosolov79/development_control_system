const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail.service')

class UserService {
    async registration(email, password) {
        try {
            const user = await findUser(email);

            if (user.rows.length > 0) {
                throw new Error('There is no user with such an email!');
            }

            const hashPassword = await  bcrypt.hash(password, 3);
            const activationLink = uuid.v4();
            const userData = {
                name: '',
                surname: '',
                middleName: '',
                password: hashPassword,
                email: email,
                phone: '',
                isActivated: false,
                activationLink: ''
            };

            await createUser(userData);
            await mailService.sendActivationMail(email, activationLink);

        } catch (error) {
            console.error('Error while searching for user:', error);
            throw new Error('Failed to retrieve user data from database');
        }
    }
}

async function findUser(email) {
    try {
        const response = await fetch(`/api/userWork/findUser/${encodeURIComponent(email)}`);

        if (!response.ok) {
            throw new Error('Failed to fetch user');
        }

        const userData = await response.json();
        console.log('User data:', userData);
        return userData;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}

async function createUser(data) {
    try {
        const response = await fetch('/api/userWork/createUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to create user');
        }

        const newUser = await response.json();
        console.log('New user created:', newUser);
        return newUser;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

module.exports = new UserService();