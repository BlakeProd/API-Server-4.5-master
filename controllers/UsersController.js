const UserModel = require('../models/user');
const Repository = require('../models/repository');
module.exports =
    class UsersController extends require('./Controller') {
        constructor(HttpContext) {
            super(HttpContext, new Repository(new UserModel()));
        }

    }