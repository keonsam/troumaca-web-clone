"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const party_1 = require("../party");
class Person extends party_1.Party {
    get name() {
        return `${this.lastName}, ${this.firstName}`;
    }
    get firstName() {
        return this._firstName;
    }
    set firstName(value) {
        this._firstName = value;
    }
    get middleName() {
        return this._middleName;
    }
    set middleName(value) {
        this._middleName = value;
    }
    get lastName() {
        return this._lastName;
    }
    set lastName(value) {
        this._lastName = value;
    }
    get username() {
        return this._username;
    }
    set username(value) {
        this._username = value;
    }
    get dateOfBirth() {
        return this._dateOfBirth;
    }
    set dateOfBirth(value) {
        this._dateOfBirth = value;
    }
}
exports.Person = Person;
//# sourceMappingURL=person.js.map