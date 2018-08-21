const expressJwt = require('express-jwt');
const userService = require('./user.service');
require('dotenv/config');

module.exports = jwt;

function jwt() {
    const secret = process.env.JWT_SECRET
    return expressJwt({ secret}, isRevoked).unless({
        path: [
            // public routes that don't require authentication
            '/pump',
            /^\/pump\//, //Dynamic routing to exclude pump by name
            '/users/authenticate',
            '/users/register'
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);
    console.log(payload);
    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }
 
    done();
};