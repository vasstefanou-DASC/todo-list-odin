import {task,project,projects} from "./task-project.js";

const forms = {
    createTaskFormDialog() {
        const addTaskDialog = document.createElement("dialog");
        addTaskDialog.id = "add-task-dialog";
        const form = document.createElement("form");
        form.id = "task-form";
        const titleInput = document.createElement("input");
        titleInput.setAttribute("type","text");
        titleInput.id = "task-form-title";
        titleInput.name = "title";
        titleInput.placeholder = "Title...";
        form.appendChild(titleInput);
        const descriptionInput = document.createElement("input");
        descriptionInput.setAttribute("type","text");
        descriptionInput.id = "task-form-description";
        descriptionInput.name = "description";
        descriptionInput.placeholder = "Description...";
        form.appendChild(descriptionInput);
        const dateInput = document.createElement("input");
        dateInput.setAttribute("type","date");
        dateInput.id = "task-form-date";
        dateInput.name = "date";
        form.appendChild(dateInput);
        for (let i=0;i<task.priorities.length;i++) {
            const radioDiv = document.createElement("div");
            const radioInput = document.createElement("input");
            radioInput.type = "radio";
            radioInput.id = `${task.priorities[i]}`;
            radioInput.name = "priority";
            radioInput.value = `${task.priorities[i]}`;
            const radioLabel = document.createElement("label");
            radioLabel.htmlFor = `${task.priorities[i]}`;
            radioLabel.textContent = `${task.priorities[i]}`;
            radioDiv.appendChild(radioInput);
            radioDiv.appendChild(radioLabel);
            form.appendChild(radioDiv);
        }
        const notesInput = document.createElement("textarea");
        notesInput.id = "task-form-notes";
        notesInput.placeholder = "notes...";
        notesInput.rows = "20";
        notesInput.cols = "60";
        form.appendChild(notesInput);
        const projectsDropdownDiv = document.createElement("div");
        const projectsDropdown = document.createElement("select");
        projectsDropdown.name = "project";
        for (let i=0;i<projects.projectsArr.length;i++) {
            const optionProject = document.createElement("option");
            if (i === 0) optionProject.selected = true;
            optionProject.value = `${projects.projectsArr[i].title}`;
            optionProject.textContent = `${projects.projectsArr[i].title}`;
            projectsDropdown.appendChild(optionProject);
        }
        projectsDropdownDiv.appendChild(projectsDropdown);
        form.appendChild(projectsDropdownDiv);
        const cancelButton = document.createElement("button");
        cancelButton.id = "task-form-cancel";
        cancelButton.textContent = "Cancel";
        cancelButton.addEventListener("click", () => addTaskDialog.close());
        form.appendChild(cancelButton);
        const addButton = document.createElement("button");
        addButton.id = "task-form-add";
        addButton.textContent = "Add Task";
        form.appendChild(addButton);
        addTaskDialog.appendChild(form);
        document.body.appendChild(addTaskDialog);
    },
    openTaskFormDialog() {
        document.querySelector("#add-task-dialog").showModal();
    },
    createProjectFormDialog(){
        const addProjectDialog = document.createElement("dialog");
        addProjectDialog.id = "add-project-dialog";
        const form = document.createElement("form");
        form.id = "project-form";
        const titleInput = document.createElement("input");
        titleInput.setAttribute("type","text");
        titleInput.id = "project-form-title";
        titleInput.name = "title";
        titleInput.placeholder = "Title...";
        form.appendChild(titleInput);
        const descriptionInput = document.createElement("input");
        descriptionInput.setAttribute("type","text");
        descriptionInput.id = "project-form-description";
        descriptionInput.name = "description";
        descriptionInput.placeholder = "Description...";
        form.appendChild(descriptionInput);
        const cancelButton = document.createElement("button");
        cancelButton.id = "project-form-cancel";
        cancelButton.textContent = "Cancel";
        cancelButton.addEventListener("click", () => addProjectDialog.close());
        form.appendChild(cancelButton);
        const addButton = document.createElement("button");
        addButton.id = "project-form-add";
        addButton.textContent = "Add Project";
        form.appendChild(addButton);
        addProjectDialog.appendChild(form);
        document.body.appendChild(addProjectDialog);
    },
    openProjectFormDialog() {
        document.querySelector("#add-project-dialog").showModal();
    }
}

export default forms;