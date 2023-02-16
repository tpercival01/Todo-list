import * as Calendar from "./modules/calender";
import * as createProject from "./modules/project";

const today = new Date();

const createProjectButton = document.getElementById("create-project");
createProjectButton.addEventListener("click", () => {
  let projectDetailsWindow = document.querySelector(".window");
  projectDetailsWindow.classList.remove("hidden");
});

const postProjectForm = document.getElementById("project-details-form");
postProjectForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let projectDetailsWindow = document.querySelector(".window");
  projectDetailsWindow.classList.add("hidden");

  createProject.createProject(
    e.target[0].value,
    e.target[1].value,
    e.target[2].value,
    today.toLocaleString()
  );
});
