var express = require('express');
var router = express.Router();
const userService = require('../_helpers/user.service');


router.post('/register', register);
/* GET users listing. */
router.get('/', getAll);
router.get('/:id', getById);
router.get('/current', getCurrent);
router.put('/:id', update);
router.delete('/:id', _delete);
router.post('/authenticate', authenticate);

module.exports = router;

function authenticate(req, res, next) { 
  userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function register(req, res, next) {
  userService.create(req.body)
        .then(() => res.json({message: 'Successfully added user'}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
  userService.getAll()
      .then(users => res.json(users))
      .catch(err => next(err));
}

function update(req, res, next) {
  userService.update(req.params.id, req.body)
      .then(() => res.json({}))
      .catch(err => next(err));
}

function getById(req, res, next) {
  userService.getById(req.params.id)
    .then(user => user ? res.json(user) : res.sendStatus(404))
    .catch(err => next(err));
}

function getCurrent(req, res, next) {
  userService.getById(req.params.sub)
    .then(user => user ? res.json(user) : res.sendStatus(404))
    .catch(err => next(err));
} 

function _delete(req, res, next) {
  userService.delete(req.params.id)
      .then(() => res.json({message: `Deleted user with id ${req.params.id} successfully`}))
      .catch(err => next(err));
}