import {task,project,projects} from "./task-project.js";

const domCreation = {
    testing() {
        const main = document.querySelector("main");
        const domTask = document.createElement("div");

        const task1 = new task("Dummy Task","June 2026");

        domTask.textContent = `Title: ${task1.title}
        DueDate: ${task1.dueDate}
        Priority: ${task1.priority}
        Status: ${task1.checkList}`;

        main.appendChild(domTask);
    }
};

export default domCreation;