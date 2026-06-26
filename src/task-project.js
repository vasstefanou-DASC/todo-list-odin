const task = class {

    #title;
    #dueDate;
    #description = "";
    #priorities = ["No priority given","Low","Medium","High"];
    #checkLists = ["Not Started","In Progress","Completed"];
    #notes = "";
    #priority;
    #checkList;
    
    constructor(title,dueDate) {
        this.#title = title;
        this.#dueDate = dueDate;
        this.#priority = this.#priorities[0];
        this.#checkList = this.#checkLists[0];    
    }

    get title() {
        return this.#title;
    }
    get dueDate() {
        return this.#dueDate;
    }
    get description() {
        return this.#description;
    }
    get priorities() {
        return this.#priorities;
    }
    get checkLists() {
        return this.#checkLists;
    }
    get priority() {
        return this.#priority;
    }
    get notes() {
        return this.#notes;
    }
    get checkList() {
        return this.#checkList;
    }

    set title(title) {
        this.#title = title;
    }
    set dueDate(date) {
        this.#dueDate = date;
    }
    set description(description) {
        this.#description = description;
    }
    set priority(priority) {
        this.#priority = priority;
    }
    set checkList(checkList) {
        this.#checkList = checkList;
    }
    set notes(notes) {
        this.#notes = notes;
    }
};

const project = class {

    #title;
    #description;
    #tasks = [];

    constructor(title,description) {
        this.#title = title;
        this.#description = description;
    }

    get title() {
        return this.#title;
    }
    get description() {
        return this.#description;
    }
    get tasks() {
        return this.#tasks;
    }

    set title(title) {
        this.#title = title;
    }
    set description(description) {
        this.#description = description;
    }

    findTask(task) {
        return this.#tasks.map(obj => obj.title).indexOf(task.title);
    }
    addTask(task) {
        if (this.findTask(task) === -1) {
            this.#tasks.push(task);
        }
    }
    deleteTask(task) {
        const index = this.findTask(task);
        if (index !== -1) {
            this.#tasks.splice(index,1);
        }
    }
};

const defaultProject = new project("Uncategorized","Tasks are put here if no projects exists (Cannot be deleted)");

export {task,project,defaultProject};