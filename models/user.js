const Model = require('./model');
module.exports =
    class User extends Model {
        constructor() {
            super();
            this.Name = "";
            this.Email = "";
            this.Password = "";
            this.Created = 0;
            this.AvatarGUID = "";
            this.VerifyCode = 0;
            this.Remember = false;

            this.key = "Email";
            this.addValidator('Name', 'string');
            this.addValidator('Email', 'email');
            this.addValidator('Password', 'string');
            this.addValidator('Created', 'integer');
        }
    }