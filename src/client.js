const client = class {

    #name;
    #surname;
    #email;
    #timeEnrolled;
    
    constructor(name,surname,email) {
        this.#name = name;
        this.#surname = surname;
        this.#email = email;
        this.#timeEnrolled = new Date(Date.now()).toDateString();
    }

    get fullName() {
        return this.#name + " " + this.#surname;
    }
    get email() {
        return this.#email;
    }
    get timeEnrolled() {
        return this.#timeEnrolled;
    }
    
    set name(name) {
        this.#name = name;
    }
    set surname(surname) {
        this.#surname = surname;
    }
    set email(email) {
        this.#email = email;
    }

}

export { client };
