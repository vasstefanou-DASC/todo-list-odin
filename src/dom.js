import { projectManagement } from './appLogic.js';
import { renderDialog } from './dialog.js';
import { save } from './json.js';

const domUI = (() => {

    const aside = document.querySelector("aside");
    const main = document.querySelector("main");
    const projectsListDiv = document.createElement("div");
    const tasksDiv = document.createElement("div");
    
    const renderAside = () => {
        const paraUserName = document.createElement("p");
        paraUserName.textContent = "Hello, enjoying my app?";
        aside.appendChild(paraUserName);
        const openDialogsButtonsDiv = document.createElement("div");
        openDialogsButtonsDiv.id = "aside-buttons";
        aside.appendChild(openDialogsButtonsDiv);
        const openTaskDialogButton = document.createElement("button");
        openTaskDialogButton.textContent = "Add Task";
        openTaskDialogButton.addEventListener("click",renderDialog.taskForm);
        openDialogsButtonsDiv.appendChild(openTaskDialogButton);
        const openProjectDialogButton = document.createElement("button");
        openProjectDialogButton.textContent = "Add Project";
        openProjectDialogButton.addEventListener("click", () => {
            renderDialog.projectForm();
        });
        openDialogsButtonsDiv.appendChild(openProjectDialogButton);
        const projectsHeading = document.createElement("h3");
        projectsHeading.textContent = "Projects";
        aside.appendChild(projectsHeading);
        aside.appendChild(projectsListDiv);
        renderProjects();
        
    };
    
    const renderProjects = () => {
        projectsListDiv.innerHTML = "";
        const projects = projectManagement.getProjects();
        const projectsList = document.createElement("ul");
        projectsListDiv.appendChild(projectsList);
        for(const proj of projects) {
            const listItem = document.createElement("li");
            projectsList.appendChild(listItem);
            const projButtons = document.createElement("div");
            projButtons.className = "project-buttons";
            listItem.appendChild(projButtons);
            const projName = document.createElement("button");
            projName.textContent = `${proj.title}`;
            projName.className = "project-name-button";
            projName.addEventListener("click", () => {
                renderMain(proj);
            });
            projButtons.appendChild(projName);
            const deleteProj = document.createElement("button");
            deleteProj.textContent = "Delete";
            deleteProj.addEventListener("click",() => {
                projectManagement.deleteProject(proj);
                renderProjects();
                save();
                main.innerHTML = "";
                const afterDelMessage = document.createElement("h2");
                afterDelMessage.textContent = "You just deleted a project , Select a project to view tasks.";
                main.appendChild(afterDelMessage);
            });
            projButtons.appendChild(deleteProj);
            const projDesc = document.createElement("p");
            projDesc.textContent = `${proj.description}`;
            listItem.appendChild(projDesc);
        }
    };
    const renderMain = (p) => {
        main.innerHTML = "";
        tasksDiv.innerHTML = "";
        projectManagement.sortTasks(p);
        const projHead1 = document.createElement("h2");
        projHead1.textContent = `${p.title}`;
        main.appendChild(projHead1);
        const projHead2 = document.createElement("p");
        projHead2.textContent = `${p.description}`;
        main.appendChild(projHead2);
        main.appendChild(tasksDiv);
        const notComHead = document.createElement("h3");
        notComHead.textContent = "Not Completed Tasks";
        tasksDiv.appendChild(notComHead);
        renderTasks(p.notCompletedTasks,"⬜");
        const ComHead = document.createElement("h3");
        ComHead.textContent = "Completed Tasks";
        tasksDiv.appendChild(ComHead);
        renderTasks(p.completedTasks,"✅");   
    };

    const renderTasks = (pArr,mark) => {
        for (const tsk of pArr) {
            const taskDiv = document.createElement("div");
            taskDiv.className = "task-card";
            tasksDiv.appendChild(taskDiv);
            const taskprops = document.createElement("div");
            taskprops.className = "task-properties";
            const taskprop1 = document.createElement("div");
            taskprop1.className = "task-top-line";
            const taskprop2 = document.createElement("div");
            const taskButtons = document.createElement("div");
            taskButtons.className = "task-buttons";
            taskDiv.appendChild(taskprops);
            taskprops.appendChild(taskprop1);
            taskprops.appendChild(taskprop2);
            taskDiv.appendChild(taskButtons);
            const taskTitle = document.createElement("p");
            taskTitle.textContent = `Title: ${tsk.title}`;
            taskprop1.appendChild(taskTitle);
            const taskDesc = document.createElement("p");
            taskDesc.textContent = `Description: ${tsk.description}`;
            taskprop2.appendChild(taskDesc);
            const taskDue = document.createElement("p");
            taskDue.textContent = `DueDate: ${tsk.dueDate}`;
            taskprop1.appendChild(taskDue);
            const taskPri = document.createElement("p");
            taskPri.textContent = `Priority: ${tsk.priority}`;
            taskprop1.appendChild(taskPri);
            const viewEditButton = document.createElement("button");
            viewEditButton.textContent = "View/Edit";
            viewEditButton.addEventListener("click", () => {
                renderDialog.viewEditTaskForm(tsk);
            });
            taskButtons.appendChild(viewEditButton);
            const delButton = document.createElement("button");
            delButton.textContent = "Delete";
            delButton.addEventListener("click", () => {
                projectManagement.getProjectByTitle(tsk.projectName).deleteTask(tsk);
                renderMain(projectManagement.getProjectByTitle(tsk.projectName));
                save();
            });
            taskButtons.appendChild(delButton);
            const togCompleteButton = document.createElement("button");
            togCompleteButton.textContent = mark;
            togCompleteButton.addEventListener("click", () => {
                projectManagement.getProjectByTitle(tsk.projectName).toggleCompleteTask(tsk);
                renderMain(projectManagement.getProjectByTitle(tsk.projectName));
                save();
            });
            taskButtons.appendChild(togCompleteButton);
        } 
    }

    return {renderAside,renderProjects,renderMain,renderTasks} ;
})();

export { domUI };