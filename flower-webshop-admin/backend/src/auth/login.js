const jwt = require('jsonwebtoken');

const Users = [
    {
        email: 'tesztelek@gmail.com',
        password: 'test',
        role: '2'
    },
    {
        email: 'user@gmail.com',
        password: 'test',
        role: '1'
    }
];

module.exports = (req, res) => {
    const { email, password } = req.body;

    const user = Users.find(u => u.email === email && u.password === password);
    if (user) {
        const accessToken = jwt.sign({
            email: user.email,
            role: user.role
        }, process.env.ACCESS_TOKEN_SECRET);

        res.json({
            user,
            accessToken
        });
    } else {
        res.send('email or password incorrect.');
    }
};
