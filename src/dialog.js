import { projectManagement } from './appLogic.js';
import { domUI } from './dom.js';
import { save } from './json.js';

const renderDialog = (() => {

    const dialog = document.createElement("dialog");
    document.body.appendChild(dialog);

    const buildTaskForm = () => {
        dialog.innerHTML = "";
        const form = document.createElement("form");
        form.id = "task-form";
        dialog.appendChild(form);
        
        const title = document.createElement("input");
        title.type = "text";
        title.id = "task-title";
        title.placeholder = "Task Title ...";
        form.appendChild(title);

        const desc = document.createElement("input");
        desc.type = "text";
        desc.id = "task-description";
        desc.placeholder = "Task Description ...";
        form.appendChild(desc);

        const dueDate = document.createElement("input");
        dueDate.type = "date";
        dueDate.id = "task-duedate";
        form.appendChild(dueDate);

        const radioDiv = document.createElement("div");
        form.appendChild(radioDiv);
        for (const prio of projectManagement.priorities) {
            const radioInput = document.createElement("input");
            radioInput.type = "radio";
            radioInput.name = "priority";
            radioInput.value = prio;
            radioInput.id = `priority-${prio}`;
            const radioLabel = document.createElement("label");
            radioLabel.textContent = prio;
            radioLabel.htmlFor = `priority-${prio}`;
            radioDiv.appendChild(radioInput);
            radioDiv.appendChild(radioLabel);
        }

        const selectProject = document.createElement("select");
        selectProject.name = "project";
        selectProject.id = "select-project";
        form.appendChild(selectProject);
        for (const proj of projectManagement.getProjects()) {
            const option = document.createElement("option");
            option.value = proj.title;
            option.textContent = proj.title;
            selectProject.appendChild(option);
        }

        const cancelButton = document.createElement("button");
        cancelButton.type = "button";
        cancelButton.textContent = "Cancel";
        cancelButton.id = "cancel-task-form";
        cancelButton.addEventListener("click", () => {
            dialog.close();
            form.reset();
        });
        dialog.appendChild(cancelButton);

        return { form, title, desc, dueDate, selectProject };
    };

    const taskForm = () => {
        const { form, title, desc, dueDate, selectProject } = buildTaskForm();

        const addButton = document.createElement("button");
        addButton.type = "button";
        addButton.textContent = "Add Task";
        addButton.id = "add-task-form";
        addButton.addEventListener("click", () => {
            if (!title.value) return;
            const prio = document.querySelector('input[name="priority"]:checked')
                ?.value ?? "No Priority";
            const task = projectManagement.createTask(title.value, desc.value, dueDate.value);
            task.priority = prio;
            projectManagement.getProjectByTitle(selectProject.value).addTask(task);
            domUI.renderMain(projectManagement.getProjectByTitle(selectProject.value));
            save();
            dialog.close();
            form.reset();
        });
        dialog.appendChild(addButton);
        dialog.showModal();
    };

    const projectForm = () => {
        dialog.innerHTML = "";
        const form = document.createElement("form");
        form.id = "project-form";
        dialog.appendChild(form);

        const title = document.createElement("input");
        title.type = "text";
        title.id = "project-title";
        title.placeholder = "Project Title ...";
        form.appendChild(title);

        const desc = document.createElement("input");
        desc.type = "text";
        desc.id = "project-description";
        desc.placeholder = "Project Description ...";
        form.appendChild(desc);

        const cancelButton = document.createElement("button");
        cancelButton.type = "button";
        cancelButton.textContent = "Cancel";
        cancelButton.id = "cancel-project-form";
        cancelButton.addEventListener("click", () => {
            dialog.close();
            form.reset();
        });
        dialog.appendChild(cancelButton);

        const addButton = document.createElement("button");
        addButton.type = "button";
        addButton.textContent = "Add Project";
        addButton.id = "add-project-form";
        addButton.addEventListener("click", () => {
            if (!title.value) return;
            const project = projectManagement.createProject(title.value, desc.value);
            projectManagement.addProject(project);
            domUI.renderProjects();
            save();
            dialog.close();
            form.reset();
        });
        dialog.appendChild(addButton);
        dialog.showModal();
    };

    const viewEditTaskForm = (task) => {
        const { form, title, desc, dueDate , selectProject } = buildTaskForm();

        title.value = task.title;
        title.readOnly = true;
        desc.value = task.description;
        dueDate.value = task.dueDate;
        selectProject.value = task.projectName;
        const projectSaver = task.projectName;
        
        const checkedRadio = document.querySelector(
            `input[name="priority"][value="${task.priority}"]`
        );
        if (checkedRadio) checkedRadio.checked = true;

        const editButton = document.createElement("button");
        editButton.type = "button";
        editButton.textContent = "Edit Task";
        editButton.id = "edit-task-form";
        editButton.addEventListener("click", () => {
            if (!title.value) return;
            const prio = document.querySelector('input[name="priority"]:checked')
                ?.value ?? "No Priority";
            task.description = desc.value;
            task.dueDate = dueDate.value;
            task.priority = prio;
            if (projectSaver !== selectProject.value) {
                projectManagement.moveTask(task,projectManagement.getProjectByTitle(projectSaver),projectManagement.getProjectByTitle(selectProject.value));
            }
            domUI.renderMain(projectManagement.getProjectByTitle(task.projectName));
            save();
            dialog.close();
            form.reset();
        });
        dialog.appendChild(editButton);
        dialog.showModal();
    };

    return { taskForm, projectForm, viewEditTaskForm };

})();

export { renderDialog };