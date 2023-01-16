var create = document.getElementById("create");
var body = document.getElementById("list-body");
var def = document.getElementById("default");
var load_projects = JSON.parse(localStorage.getItem("projects_arr"));
var projDash = document.getElementById("projectDashboard");
var projectsArr = [];
var load_projects_titles = [];

// Clean up
//localStorage.clear();

console.log(load_projects);

if (load_projects !== null && load_projects.length > 0) {
  createDashProjects(load_projects);
  def.style.display = "none";
  projectsArr = load_projects;
  load_projects_titles = load_projects.map((x) => x.title);
}

// Loops through the given array and creates dashboard tiles for each project

function createDashProjects(arr_of_projects) {
  for (let i = 0; i < arr_of_projects.length; i++) {
    let div = document.createElement("div");
    div.classList.add(arr_of_projects[i].title);
    div.classList.add("dash-project");
    div.addEventListener("click", (e) => {
      let temp_title = arr_of_projects[i].title;
      open_project(e, temp_title);
    });

    let p1 = document.createElement("p");
    p1.id = "dash-title";
    p1.innerHTML = arr_of_projects[i].title;

    let p2 = document.createElement("p");
    p2.id = "dash-date";
    p2.innerHTML = arr_of_projects[i].date;

    let p3 = document.createElement("p");
    p3.id = "dash-status";
    p3.innerHTML = arr_of_projects[i].status;

    let a = document.createElement("a");
    a.id = "dash-close";
    a.classList.add(arr_of_projects[i].title);
    a.innerHTML = "X";
    a.addEventListener("click", (e) => {
      delete_dash(e);
    });

    div.appendChild(p1);
    div.appendChild(p2);
    div.appendChild(p3);
    div.appendChild(a);
    projDash.append(div);
  }
}

function open_project(e, temp_title) {
  if (e.target.classList[1] !== "dash-project") return;
  let proj_holder = load_projects.filter((x) => x.title === temp_title);
  console.log(
    proj_holder,
    "titles: ",
    load_projects_titles,
    "current: ",
    proj_holder[0].title
  );
  let proj = new Project(
    proj_holder[0].title,
    proj_holder[0].desc,
    proj_holder[0].date,
    proj_holder[0].status
  );
  if (load_projects_titles.includes(proj_holder[0].title)) {
    unhide_elements(proj);
    return;
  } else {
    proj.addToArray();
    proj.createEverything();
  }
}

function unhide_elements(proj) {
  console.log(proj);
  let proj_header = document.getElementById("project-head" + proj.title);
  let proj_body = document.getElementById(proj.title);

  proj_header.style.display = "inline-block";
  proj_body.style.display = "grid";
}

// Removes the deleted project (dashboard tile) from the array and from localstorage

function delete_dash(e) {
  let dash_proj = document.getElementsByClassName(e.target.className);
  let dashboard = document.getElementById("projectDashboard");
  dashboard.removeChild(dash_proj[0]);

  load_projects.splice(load_projects_titles.indexOf(e.target.className), 1);
  localStorage.setItem("projects_arr", JSON.stringify(load_projects));
}

// Event listeners for creating new project and submitting a new project

create.addEventListener("click", () => {
  document.getElementById("form").style.display = "inline-block";
});

var formButton = document.getElementById("submitForm");
formButton.addEventListener("click", () => {
  onProjectSubmit();
});

// Handles everything that happens when submitting a new project
// Hides the form, hides the default text, creates a new project class

function onProjectSubmit() {
  def.style.display = "none";

  let form = document.getElementById("form");
  form.style.display = "none";

  console.log(def);
  var title = document.getElementById("title").value;
  var desc = document.getElementById("desc").value;
  var date = new Date().toLocaleString();
  var status = document.getElementById("status").value;

  createProject(title, desc, date, status);
}

// Creates a new project and sets current project for later use.
// Adds project to storage and calls function for all HTML creation

function createProject(title, desc, date, status) {
  var new_project = new Project(title, desc, date, status);
  new_project.addToArray();
  new_project.createEverything();
}

// Project class that creates the project

class Project {
  constructor(title, desc, date, status) {
    this.title = title;
    this.desc = desc;
    this.date = date;
    this.status = status;
  }

  addToArray() {
    let projectIter = {
      title: this.title,
      date: this.date,
      desc: this.desc,
      status: this.status
    };

    projectsArr.push(projectIter);

    // Everytime a project is added, update in localstorage.
    localStorage.setItem("projects_arr", JSON.stringify(projectsArr));
  }

  open() {}

  createEverything() {
    let div = document.createElement("div");
    div.classList.add("project");
    div.classList.add(this.title);
    div.id = this.title;

    let title = document.createElement("h1");
    title.id = "titleText";
    title.innerHTML = this.title;

    let desc = document.createElement("p");
    desc.id = "descText";
    desc.innerHTML = this.desc;

    let date = document.createElement("p");
    date.id = "dateText";
    date.innerHTML = this.date;

    let status = document.createElement("select");
    status.id = "statusText";
    status.value = this.status;

    let started = document.createElement("option");
    started.innerHTML = "Started";
    let progress = document.createElement("option");
    progress.innerHTML = "In progress";
    let completed = document.createElement("option");
    completed.innerHTML = "Completed";
    status.appendChild(started);
    status.appendChild(progress);
    status.appendChild(completed);

    let textarea = document.createElement("textarea");
    textarea.id = "commentInput";
    textarea.name = "commentInput";
    let textareaLabel = document.createElement("label");
    textareaLabel.innerHTML = "Add a comment:";
    textareaLabel.id = "commentInputLabel";
    textareaLabel.for = "commentInput";

    div.appendChild(title);
    div.appendChild(desc);
    div.appendChild(date);
    div.appendChild(status);
    div.appendChild(textareaLabel);
    div.appendChild(textarea);

    body.appendChild(div);

    //Create header tab for the project
    let projectHead = document.createElement("div");
    projectHead.id = "project-head" + this.title;
    projectHead.classList.add("project-head");
    let titleHead = document.createElement("h3");
    titleHead.innerHTML = this.title;
    let closeHeader = document.createElement("a");
    closeHeader.innerHTML = "X";
    closeHeader.id = "closeHeader" + this.title;
    projectHead.appendChild(titleHead);
    projectHead.appendChild(closeHeader);

    let head = document.getElementById("header-grid");
    head.appendChild(projectHead);
    let temp_arr = [];

    console.log(load_projects_titles, this.title);
    if (load_projects_titles.includes(this.title)) {
      console.log("Already created.");
    } else {
      let temp_project = {
        title: this.title,
        date: this.date,
        desc: this.desc,
        status: this.status
      };
      temp_arr.push(temp_project);
    }

    var projectHeaderClose = document.getElementById(
      "closeHeader" + this.title
    );
    console.log(projectHeaderClose);
    projectHeaderClose.addEventListener("click", () => {
      close_header(this.title, temp_arr);
    });
  }
}

function close_header(title, temp_arr) {
  console.log(title);
  var projectHeader = document.getElementById("project-head" + title);
  projectHeader.style.display = "none";
  let current = document.getElementById(title);
  current.style.display = "none";

  if (load_projects !== null && load_projects.length > 0) {
    createDashProjects(temp_arr);
    load_projects_titles.push(title);
  }
}
