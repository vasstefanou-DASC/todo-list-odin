import {task,project,projects} from "./task-project.js";
import {client} from "./client.js";

const domCreation = {
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
        addTaskButton.textContent = "Add task";
        aside.appendChild(addTaskButton);
        const projectsListContainer = document.createElement("div");
        const listTitle = document.createElement("h3");
        listTitle.textContent = "Todo Task Lists";
        projectsListContainer.appendChild(listTitle);
        const projectsList = document.createElement("ul");
        for (const project of projects.projectsArr) {
            const listItem = document.createElement("li");
            const listItemButton = document.createElement("button");
            listItemButton.textContent = `${project.title}`;
            listItem.appendChild(listItemButton);
            projectsList.appendChild(listItem);
        }
        projectsListContainer.appendChild(projectsList);
        aside.appendChild(projectsListContainer);
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
    testing() {
        const main = document.querySelector("main");
        const domTask = document.createElement("div");

        const task1 = new task("Dummy Task","June 2026");

        domTask.textContent = `Title: ${task1.title}
        DueDate: ${task1.dueDate}
        Priority: ${task1.priority}
        Status: ${task1.checkList}`;

        main.appendChild(domTask);
    },
    footer() {
        const footer = document.querySelector("footer");
        footer.textContent = "VS Todo Tasklist App Odin Project 2026";
    }
};

export default domCreation;
