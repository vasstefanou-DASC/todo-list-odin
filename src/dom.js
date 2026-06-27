import {task,project,projects} from "./task-project.js";
import {client} from "./client.js";
import forms from "./forms.js";

const domCreation = {

    activeTab: null, 
    
    createDialogs() {
        const {addTaskDialog: taskDialog,form: taskForm} = forms.createTaskFormDialog();
        const {addProjectDialog: projectDialog,form: projectForm} = forms.createProjectFormDialog();
        const addTaskDialogButton = document.querySelector("#task-form-add");
        const taskTitleInput = document.querySelector("#task-form-title");
        const taskDescriptionInput = document.querySelector("#task-form-description");
        const taskDateInput = document.querySelector("#task-form-date");
        const taskNotesInput = document.querySelector("#task-form-notes");
        const taskProjectInput = document.querySelector("#select-project");
        const addProjectDialogButton = document.querySelector("#project-form-add");
        const projectTitleInput = document.querySelector("#project-form-title");
        const projectDescriptionInput = document.querySelector("#project-form-description");
        addTaskDialogButton.addEventListener("click", () => {
            const taskToAdd = new task(taskTitleInput.value,taskDateInput.value,taskProjectInput.value);
            const taskPriorityInput = document.querySelector("input[name='priority']:checked");
            taskToAdd.description = taskDescriptionInput.value;
            taskToAdd.priority = taskPriorityInput.value;
            taskToAdd.notes = taskNotesInput.value;
            const projectOfTask = projects.projectsArr.find(proj => proj.title === taskToAdd.project);
            projectOfTask.addTask(taskToAdd);
            this.renderTasks();
            taskDialog.close();
            taskForm.reset();
        });
        addProjectDialogButton.addEventListener("click",() => {
            projects.addProject(new project(projectTitleInput.value,projectDescriptionInput.value));
            this.renderProjects();
            projectDialog.close();
            projectForm.reset();
        });
    },
    createHeader() {
        const header = document.querySelector("header");
        header.textContent = "Manage your everyday tasks";
    },
    createAside() {
        const aside = document.querySelector("aside");
        const profile = new client("Vasilis","Stefanou","email@email.com");
        const profileVis = document.createElement("div");
        profileVis.textContent = `${profile.fullName}`;
        aside.appendChild(profileVis);
        const addTaskButton = document.createElement("button");
        addTaskButton.id = "add-task";
        addTaskButton.textContent = "Add Task";
        addTaskButton.addEventListener("click",forms.openTaskFormDialog);
        aside.appendChild(addTaskButton);
        const addProjectButton = document.createElement("button");
        addProjectButton.id = "add-project";
        addProjectButton.textContent = "Add Project";
        addProjectButton.addEventListener("click",forms.openProjectFormDialog);
        aside.appendChild(addProjectButton);
        const projectsListContainer = document.createElement("div");
        const listTitle = document.createElement("h3");
        listTitle.textContent = "Todo Task Lists";
        projectsListContainer.appendChild(listTitle);
        const projectsList = document.createElement("ul");
        projectsList.id = "projects-list";
        projectsListContainer.appendChild(projectsList);
        aside.appendChild(projectsListContainer);
        this.renderProjects();
        const statsLogoutContainer = document.createElement("div");
        statsLogoutContainer.id = "stats-logout";
        const statsButton = document.createElement("button");
        statsButton.id = "stats";
        statsButton.textContent = "Stats";
        statsLogoutContainer.appendChild(statsButton);
        const logoutButton = document.createElement("button");
        logoutButton.id = "logout";
        logoutButton.textContent = "Log Out";
        statsLogoutContainer.appendChild(logoutButton);
        aside.appendChild(statsLogoutContainer);
    },
    createMain() {
        this.activeTab = projects.projectsArr[0];
        this.renderTasks();
    },
    footer() {
        const footer = document.querySelector("footer");
        footer.textContent = "VS Todo Tasklist App Odin Project 2026";
    },
    renderProjects() {
        const projectsList = document.querySelector("#projects-list");
        projectsList.textContent = "";
        for (const project of projects.projectsArr) {
            const listItem = document.createElement("li");
            const listItemButton = document.createElement("button");
            listItemButton.textContent = `${project.title}`;
            listItemButton.addEventListener("click", () => {
                this.activeTab = project;
                this.renderTasks();
            });
            listItem.appendChild(listItemButton);
            projectsList.appendChild(listItem);
        }
    },
    renderTasks() {
        const main = document.querySelector("main");
        main.textContent = "";
        const projectHeader = document.createElement("h2");
        projectHeader.textContent = this.activeTab.title;
        main.appendChild(projectHeader);
        for(const task of this.activeTab.tasks) {
            const taskDiv = document.createElement("div");
            taskDiv.textContent = `${task.title} ---> ${task.dueDate} --- ${task.priority}`;
            main.appendChild(taskDiv);
        }
    }
};

export default domCreation;
