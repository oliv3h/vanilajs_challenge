
const todoForm = document.querySelector("#todo"),
    todoInput = todoForm.querySelector("input"),
    todoDiv = document.querySelector('.todo'),
    pendingList = document.querySelector(".js-todoList.pending"),
    finishedList = document.querySelector(".js-todoList.finished");

const PENDING_LS = "PENDING",
    FINISHED_LS = "FINISHED";
let pending = [],
    finished = [];

function handleSubmit(event) {
    event.preventDefault();
    const TODO = todoInput.value;
    paintPendingToDos(TODO);
    todoInput.value = "";
}

function paintPendingToDos(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const finishedBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = pending.length + 1;
    delBtn.innerText = " ❌ ";
    delBtn.addEventListener("click", deleteToDo);
    finishedBtn.innerText = " 🔚 ";
    finishedBtn.addEventListener("click", goToFinishedToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(finishedBtn);
    li.appendChild(span);
    li.id = newId;
    pendingList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    pending.push(toDoObj);
    saveToDos();
}

function goToPendingToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    const span = li.querySelector("span");
    const text = span.innerText;
    deleteToDo(event);
    paintPendingToDos(text);
}

function goToFinishedToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    const span = li.querySelector("span");
    const text = span.innerText;
    deleteToDo(event);
    paintFinishedToDos(text);
}

function paintFinishedToDos(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const pendingBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = finished.length + 1;
    delBtn.innerText = " ❌";
    delBtn.addEventListener("click", deleteToDo);
    pendingBtn.innerText = " 🔙";
    pendingBtn.addEventListener("click", goToPendingToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(pendingBtn);
    li.appendChild(span);
    li.id = newId;
    finishedList.appendChild(li);
    const toDoObj = {
    text: text,
    id: newId
    };
    finished.push(toDoObj);
    saveToDos();
}

function loadToDos() {
    const pendingToDos = localStorage.getItem(PENDING_LS);
    const finishedToDos = localStorage.getItem(FINISHED_LS);

    if (pendingToDos !== null) {
        const parsedToDos = JSON.parse(pendingToDos);
        parsedToDos.forEach(function(toDo) {
            paintPendingToDos(toDo.text);
        });
    }

    
    if (finishedToDos !== null) {
        const parsedToDos = JSON.parse(finishedToDos);
        parsedToDos.forEach(function(toDo) {
            paintFinishedToDos(toDo.text);
        });
    }
}

function saveToDos() {
    localStorage.setItem(PENDING_LS, JSON.stringify(pending));
    localStorage.setItem(FINISHED_LS, JSON.stringify(finished));
}

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    const ul = li.parentNode;

    if (ul.classList[1] === "pending") {
    pendingList.removeChild(li);
    const cleanToDos = pending.filter(function(toDo) {
        return toDo.id !== parseInt(li.id);
    });
    pending = cleanToDos;
    } else if (ul.classList[1] === "finished") {
    finishedList.removeChild(li);
    const cleanToDos = finished.filter(function(toDo) {
        return toDo.id !== parseInt(li.id);
    });
    finished = cleanToDos;
    }
    saveToDos();
}

function todo() {
    loadToDos();
    window.addEventListener("submit", handleSubmit);
}