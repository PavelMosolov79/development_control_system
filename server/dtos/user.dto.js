module.exports = class  UserDto {
    name;
    surname;
    middleName;
    password;
    email;
    phone;
    isActivated;
    activationLink;

    constructor(model) {
        this.email = model.email;
        this.id = model.id;
        this.isActivated = model.isactivated;
    }
}