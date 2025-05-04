function addTask() {
    const input = document.getElementById("task-input");
    const taskText = input.value.trim();
    if (taskText === "") return;
  
    const li = document.createElement("li");
    li.textContent = taskText;
  
    li.addEventListener("click", () => {
      li.classList.toggle("done");
    });
  
    document.getElementById("task-list").appendChild(li);
    input.value = "";
  }