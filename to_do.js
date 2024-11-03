let task = document.getElementById("task");
let form = document.getElementById("form");
let close_btn = document.getElementById("btn_close");
let addtask = document.getElementById("addtask");
let tasks = [];
let editIndex = null;


let todoCount = 0;
let doingCount = 0;
let doneCount = 0;

let todoCounter = document.getElementById("todoCounter");
let doingCounter = document.getElementById("doingCounter");
let doneCounter = document.getElementById("doneCounter");

let tite = document.getElementById("titre");
let description = document.getElementById("description");
let datestart = document.getElementById("datestart");
let dateend = document.getElementById("dateend");
let category = document.getElementById("category");
let statu = document.getElementById("statu");

task.onclick = toggle_form;
close_btn.onclick = toggle_form;
addtask.addEventListener("click", add_task);

function add_task() {               
  if (!tite.value || !description.value || !dateend.value || !category.value || !statu.value) {
    alert("Tous les champs doivent être remplis !");
    return;
  }

  if (description.value.length > 500) {
    alert("La description ne doit pas dépasser 500 caractères !");
    return;
  }

  const startDate = new Date(); 
  const endDate = new Date(dateend.value);
  
  if (endDate <= startDate) {
    alert("La date de fin doit être postérieure à la date de début !");
    return;
  }

  
  if (editIndex === null) {
    let newtask = {
      title: tite.value,
      description: description.value,
      dateend: dateend.value,
      category: category.value,
      statu: statu.value,
      id: Date.now()
    };
    tasks.push(newtask);
  } else {
    tasks[editIndex].title = tite.value;
    tasks[editIndex].description = description.value;
    tasks[editIndex].dateend = dateend.value;
    tasks[editIndex].category = category.value;
    tasks[editIndex].statu = statu.value;
    editIndex = null;
    addtask.textContent = "Ajouter";
  }

  toggle_form();
  creat_task();
  clear_inputs();
}

function clear_inputs() {
  tite.value = "";
  description.value = "";
  dateend.value = "";
  category.value = "P1";
  statu.value = "To do";
}

function creat_task() {
  const todo = document.querySelector('#todoholder');
  const doing = document.querySelector('#doingholder');
  const done = document.querySelector('#doneholder');
  
  todo.innerHTML = '';
  doing.innerHTML = '';
  done.innerHTML = '';

  todoCount = 0;
  doingCount = 0;
  doneCount = 0;

  tasks.forEach((task_, index) => {
    let taskdiv = document.createElement('div');
    let p_color;

    switch(task_.category){
      case "P1":
        p_color = "red";
        break; 
      case "P2":
        p_color = "yellow"; 
        break;
      case "P3":
        p_color = "green";
        break;
    }

    taskdiv.innerHTML = ` 
      <div  id="${task_.id}" style="border-left: 8px solid ${p_color};" class="bg-white shadow-md rounded p-4 mb-4 my-10">
        <h3 class="font-bold">${task_.title}</h3>
        <p>${task_.description}</p>
        <p>${task_.dateend}</p>
        <div class="flex justify-around mt-2">
          <button class="bg-blue-500 text-white py-1 px-3 rounded" onclick="editTask(${index})">Edit</button>
          <button class="bg-red-500 text-white py-1 px-3 rounded" onclick="deleteTask(${task_.id})">Delete</button>
        </div>
      </div>
    `;
    if(task_.statu === 'To do') {
      todo.appendChild(taskdiv);
      todoCount++;
    } else if (task_.statu === 'doing') {
      doing.appendChild(taskdiv);
      doingCount++;
    } else if (task_.statu === 'done') {
      done.appendChild(taskdiv);
      doneCount++;
    }
  });

  todoCounter.textContent = ` ${todoCount}`;
  doingCounter.textContent = ` ${doingCount}`;
  doneCounter.textContent = ` ${doneCount}`;
}

function editTask(index) {
  editIndex = index;
  tite.value = tasks[index].title;
  description.value = tasks[index].description;
  dateend.value = tasks[index].dateend;
  category.value = tasks[index].category;
  statu.value = tasks[index].statu;
  
  addtask.textContent = "Enregistrer";
  toggle_form();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  creat_task();
}

function toggle_form() {
  form.classList.toggle("hidden");
  if (editIndex === null) addtask.textContent = "Ajouter";
}

