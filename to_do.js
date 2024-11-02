let task = document.getElementById("task");
let form = document.getElementById("form");
let close_btn = document.getElementById("btn_close");
let addtask = document.getElementById("addtask");
let tasks = [];

task.onclick = show_form;

close_btn.onclick = hide_form;



function get_data() {
  let tite = document.getElementById("titre");
  let description = document.getElementById("description");
  let datestart = document.getElementById("datestart");
  let dateend = document.getElementById("dateend");
  let category = document.getElementById("category");
  let statu = document.getElementById("statu");
}


function add_task() {
  get_data()
  let newtask = {
    title: tite.value,
    description: description.value,
    dateend: dateend.value,
    category: category.value,
    statu: statu.value,
    id: Date.now()
  };
  tasks.push(newtask);
  clearinputs()
}


function clearinputs() {
  tite.value = "";
  description.value = "";
  dateend.value = "";
  datestart.value = "";
  category.value = "P1";
  statu.value = "To do";
}


function show_form() {
  form.classList.remove("hidden");
}
function hide_form() {
  form.classList.remove("hidden");
}


addtask.onclick = add_task;






