import { projectManagement, defaultProject } from './appLogic.js';

const save = () => {
    const data = projectManagement.getProjects().map(p => ({
        title: p.title,
        description: p.description,
        notCompletedTasks: p.notCompletedTasks.map(t => ({
            title: t.title,
            description: t.description,
            dueDate: t.dueDate,
            priority: t.priority,
            status: t.status,
            projectName: t.projectName
        })),
        completedTasks: p.completedTasks.map(t => ({
            title: t.title,
            description: t.description,
            dueDate: t.dueDate,
            priority: t.priority,
            status: t.status,
            projectName: t.projectName
        }))
    }));
    localStorage.setItem("projects", JSON.stringify(data));
}

const load = () => {
    const data = localStorage.getItem("projects");
    if(!data) return;
    const parsed = JSON.parse(data);
    for (const p of parsed) {
        const proj = p.title === "Uncategorized" ? defaultProject
        : projectManagement.createProject(p.title,p.description);
        if(p.title !== "Uncategorized") {
            projectManagement.addProject(proj);
        }
        for(const t of p.notCompletedTasks) {
            const tsk = projectManagement.createTask(t.title,t.description,t.dueDate);
            tsk.priority = t.priority;
            proj.addTask(tsk);
        }
        for(const t of p.completedTasks) {
            const tsk = projectManagement.createTask(t.title,t.description,t.dueDate);
            tsk.priority = t.priority;
            tsk.status = "Completed";
            proj.addTask(tsk);
        }
    }
};

export { save, load };