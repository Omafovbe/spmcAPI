const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Model = require('../model');
require('dotenv/config');
const User = Model.User;
const secret = process.env.JWT_SECRET;

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ email, password }) {
    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(password, user.hash_password)) {
        const { hash_password, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, secret, {
            expiresIn: "2h" // expires in 24 hours
          });
        return {
            ...userWithoutHash,
            token
        };
    }
}

async function getAll() {
    return await User.find().select('-hash_password');
}
 
async function getById(id) {
    return await User.findById(id).select('-hash_password');
}
 
async function create(userParam) {
    // validate
    if (await User.findOne({ email: userParam.email })) {
        throw 'Email: "' + userParam.email + '" already exist.';
    }
 
    const user = new User(userParam);
 
    // hash password
    if (userParam.password) {
        user.hash_password = bcrypt.hashSync(userParam.password, 10);
    }
 
    // save user
    await user.save();
}
 
async function update(id, userParam) {
    const user = await User.findById(id);
 
    // validate
    if (!user) throw 'User not found';
    if (user.email !== userParam.email && await User.findOne({ email: userParam.email })) {
        throw 'Email: "' + userParam.email + '" already exist';
    }
 
    // hash password if it was entered
    if (userParam.password) {
        userParam.hash_password = bcrypt.hashSync(userParam.password, 10);
    }
 
    // copy userParam properties to user
    Object.assign(user, userParam);
 
    await user.save();
}
 
async function _delete(id) {
    await User.findByIdAndRemove(id);
}