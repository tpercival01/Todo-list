const projectsParent = document.getElementById("projects-navbar");
const body = document.getElementById("body");

function createProject(title, importance, description, created) {
  let proj = new Project(
    title,
    [
      { title: "complete task abcdef 1234" },
      { title: "complete task abcefdegf 1231823123" },
      { title: "compelte tasks 12391231923 dfjsidfisdjf" }
    ],
    importance,
    description,
    created
  );

  let post = proj.createNavProject();

  projectsParent.appendChild(post);

  proj.createProjectWindow();
  proj.addNewTask();

  // Check tasks off when clicking checkbox
  let checks = document.querySelectorAll("input[type='checkbox']");
  for (let item in checks) {
    if (typeof checks[item] === "object") {
      checks[item].addEventListener("click", () => {
        let str = checks[item].value.replace(/\s/g, "");
        let temp = document.querySelectorAll("." + str);

        for (let i = 0; i < temp.length; i++) {
          if (temp[i].classList.contains("checked")) {
            temp[i].classList.remove("checked");
          } else {
            temp[i].classList += " checked";
          }
        }
      });
    }
  }
}

class Project {
  constructor(title, tasks, importance, description, created) {
    this.title = title;
    this.tasks = tasks;
    this.importance = importance;
    this.description = description;
    this.created = created;
  }

  createNavProject() {
    let navProject = document.createElement("div");
    navProject.className = "nav-project";

    let title = document.createElement("p");
    title.className = "project-title";
    title.innerHTML = this.title;

    let total = document.createElement("p");
    total.className = "project-total";
    total.innerHTML = "0/" + this.tasks.length;

    let tasksContainer = document.createElement("div");
    tasksContainer.className = "tasks";

    for (let i = 0; i < this.tasks.length; i++) {
      let taskDiv = document.createElement("div");
      taskDiv.className = "task-div";

      let taskP = document.createElement("p");
      taskP.classList += this.tasks[i].title.replace(/\s/g, "");
      if (this.tasks[i].title.length > 20) {
        taskP.innerHTML = this.tasks[i].title.substring(0, 20);
      } else {
        taskP.innerHTML = this.tasks[i].title;
      }
      taskDiv.appendChild(taskP);

      let check = document.createElement("input");
      check.setAttribute("type", "checkbox");
      check.value = this.tasks[i].title.replace(/\s/g, "");
      taskDiv.appendChild(check);

      tasksContainer.appendChild(taskDiv);
    }
    navProject.appendChild(title);
    navProject.appendChild(total);
    navProject.appendChild(tasksContainer);

    return navProject;
  }

  createProjectWindow() {
    let projectDiv = document.createElement("div");
    projectDiv.id = "project-div";

    let title = document.createElement("h2");
    title.id = "renderTitle";
    title.innerHTML = this.title;
    projectDiv.appendChild(title);

    let created = document.createElement("p");
    created.id = "renderCreated";
    let tempCreated = "Created: " + this.created;
    created.innerHTML = tempCreated;
    projectDiv.appendChild(created);

    let importance = document.createElement("p");
    importance.id = "renderImportance";
    let tempImportance = "Importance: " + this.importance;
    importance.innerHTML = tempImportance;
    projectDiv.appendChild(importance);

    let description = document.createElement("p");
    description.id = "renderDescription";
    description.innerHTML = this.description;
    projectDiv.appendChild(description);

    let taskList = document.createElement("dl");
    taskList.id = "renderTaskList";

    let taskTitle = document.createElement("dt");
    taskTitle.innerHTML = "Tasks on this project: ";
    taskList.appendChild(taskTitle);

    let addNewTaskDD = document.createElement("dd");
    let addNewTaskDiv = document.createElement("div");
    addNewTaskDiv.className = "addNew renderTask";

    let addNewTaskP = document.createElement("p");
    addNewTaskP.innerHTML = "Click to add a new task";

    let addNewTaskSpan = document.createElement("span");
    addNewTaskSpan.id = "addNew";
    addNewTaskSpan.innerHTML = "+";

    addNewTaskDiv.appendChild(addNewTaskP);
    addNewTaskDiv.appendChild(addNewTaskSpan);
    addNewTaskDD.appendChild(addNewTaskDiv);

    taskList.appendChild(addNewTaskDD);

    if (this.tasks.length === 0) {
      let emptyTasks = document.createElement("dd");
      emptyTasks.innerHTML = "There are no current tasks on this project.";
      taskList.appendChild(emptyTasks);
    } else {
      for (let i = 0; i < this.tasks.length; i++) {
        let taskDD = document.createElement("dd");
        let taskDiv = document.createElement("div");
        taskDiv.classList += this.tasks[i].title.replace(/\s/g, "");
        taskDiv.classList += " renderTask";

        let taskTitle = document.createElement("p");
        taskTitle.innerHTML = this.tasks[i].title;
        taskDiv.appendChild(taskTitle);

        let taskDone = document.createElement("input");
        taskDone.setAttribute("type", "checkbox");
        taskDone.value = this.tasks[i].title;
        taskDiv.appendChild(taskDone);

        taskDD.appendChild(taskDiv);

        taskList.appendChild(taskDD);
      }
    }

    projectDiv.appendChild(taskList);
    body.appendChild(projectDiv);
  }
  addNewTask() {
    const addTask = document.querySelector(".addNew");
    addTask.addEventListener("click", () => {
      let taskDetailsWindow = document.querySelector(".taskWindow");
      taskDetailsWindow.classList.remove("hidden");
    });

    const addTaskForm = document.getElementById("task-details-form");
    addTaskForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let taskDetailsWindow = document.querySelector(".taskWindow");
      taskDetailsWindow.classList.add("hidden");

      let newTask = { title: e.target[0].value };

      this.tasks.push(newTask);

      let taskDD = document.createElement("dd");
      let taskDiv = document.createElement("div");
      taskDiv.classList += newTask.title.replace(/\s/g, "");
      taskDiv.classList += " renderTask";

      let taskTitle = document.createElement("p");
      taskTitle.innerHTML = newTask.title;
      taskDiv.appendChild(taskTitle);

      let taskDone = document.createElement("input");
      taskDone.setAttribute("type", "checkbox");
      taskDone.value = newTask.title;
      taskDiv.appendChild(taskDone);

      taskDD.appendChild(taskDiv);

      document.getElementById("renderTaskList").appendChild(taskDD);
    });
  }
}

export { createProject };
