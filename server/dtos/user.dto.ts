module.exports = class  UserDto {
    id: number;
    name: string;
    surname: string;
    middleName: string;
    password: string;
    email: string;
    phone: string;
    isActivated: boolean;

    constructor(model: any) {
        this.id = model.id;
        this.name = model.name;
        this.surname = model.surname;
        this.middleName = model.middleName;
        this.password = model.password;
        this.email = model.email;
        this.phone = model.phone;
        this.isActivated = model.isactivated;
    }
}