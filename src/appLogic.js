class project {
    constructor (title,description){
        this.title = title;
        this.description = description;
        this.notCompletedTasks = [];
        this.completedTasks = [];
    }
    toString() {
        return `Project title: ${this.title}\n` + 
        `Description: ${this.description}\n`;
    }
    showNotCompletedTasks() {
        return this.notCompletedTasks.map(t => t.toString()).join("\n");
    }
    showCompletedTasks() {
        return this.completedTasks.map(t => t.toString()).join("\n");
    }
    addTask(task) {
        if(!this.notCompletedTasks.map(t => t.title).includes(task.title) &&
            !this.completedTasks.map(t => t.title).includes(task.title)) {
            (task.status ==="Not Completed")? this.notCompletedTasks.push(task)
            :this.completedTasks.push(task);
            task.projectName = this.title;
            return true;
        }
        return false;
    }
    toggleCompleteTask(task) {
        this.deleteTask(task);
        task.status =  task.status === "Completed" ? "Not Completed" : "Completed";
        this.addTask(task);
    }
    deleteTask(task) {
        const index = (task.status ==="Not Completed") ? this.notCompletedTasks.map(t => t.title).indexOf(task.title)
        :this.completedTasks.map(t => t.title).indexOf(task.title);
        if(index !== -1) {
            (task.status ==="Not Completed") ? this.notCompletedTasks.splice(index,1):this.completedTasks.splice(index,1);
            return true;
        }
        return false;
    }
}

class task {
    constructor (title,description,dueDate) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this._projectName = "";
        this._priority = "No Priority";
        this._status = "Not Completed"
    }
    toString() {
        return `Task title: ${this.title}\n`+
        `Description: ${this.description}\n` +
        `DueDate: ${this.dueDate}\n` +
        `Priority: ${this._priority}\n` +
        `Status: ${this._status}\n`;
    }
    get projectName() {
        return this._projectName;
    }
    get status() {
        return this._status;
    }
    get priority() {
        return this._priority;
    }
    set projectName(projectName) {
        this._projectName = projectName;
    }
    set priority(prio) {
        this._priority = prio;
    }
    set status(status) {
        this._status = status;
    }  
}

const defaultProject = new project("Uncategorized","Tasks not yet categorized are sent here");

const projectManagement = (() => {
    let projects = [defaultProject];
    const priorities = ["No Priority","Low","Mid","High"];

    const createTask = (title,description,dueDate) => {
        return new task(title,description,dueDate);
    }

    const createProject = (title,description) => {
        return new project(title,description);
    }

    const showProjects = () => {
        return projects.map(p => p.toString()).join("\n");
    };

    const showTasks = (project) => {
        sortTasks(project);
        if(projects.map(p => p.title).includes(project.title)) {
            return `${project.toString()}` +`\nNot Completed Tasks\n\n` + `${project.showNotCompletedTasks()}` + 
            `\nCompleted Tasks\n\n` + `${project.showCompletedTasks()}`;
        }
        return "Project Not Found";
    };
    
    const addProject = (project) => {
        if(!projects.map(p => p.title).includes(project.title) && project.title !== "Uncategorized") {
            projects.push(project);
            return true;
        }
        return false;
    };

    const deleteProject = (project) => {
        const index = projects.map(p => p.title).indexOf(project.title);
        if(index !== -1 && project.title !== "Uncategorized") {
            projects.splice(index,1);
            return true;
        }
        return false;
    };

    const moveTask = (task,fromProj,toProj) => {
        if(fromProj.deleteTask(task))
        toProj.addTask(task);
    };

    const sortTasks = (project) => {
        project.notCompletedTasks.sort((a,b) => priorities.indexOf(b.priority)- priorities.indexOf(a.priority));
        project.completedTasks.sort((a,b) => priorities.indexOf(b.priority)- priorities.indexOf(a.priority));
    }

    const getProjectByTitle = (title) => {
        return projects.find(p => p.title === title);
    }

    const getProjects = () => projects;

    return {showProjects,showTasks,sortTasks,addProject,
        createTask,createProject,deleteProject,
        moveTask,priorities,getProjects,
        getProjectByTitle
    };
})();

export { projectManagement, defaultProject };
