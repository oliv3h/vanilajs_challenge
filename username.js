const usernameForm = document.querySelector('#username'),
    usernameDiv = document.querySelector('.username'),
    usernameText = usernameDiv.querySelector('h2'),
    usernameBtn = usernameDiv.querySelector('button');

let name = '';

function username() {
    drawName();
    usernameForm.addEventListener('submit', handleUsernameForm);
    usernameBtn.addEventListener('click', removeUsername);
}

function drawName() {
    name = localStorage.getItem('username');
    if (name !== null) {
        usernameText.innerHTML = `hello, ${name}!`;
        toggleClass();
    }
}

function toggleClass() {
    usernameDiv.classList.toggle('hidden');
    usernameForm.classList.toggle('hidden');
}

function handleUsernameForm(event) {
    event.preventDefault();
    const input = usernameForm.querySelector('input');
    localStorage.setItem('username', input.value);
    input.value = '';
    drawName();
}

function removeUsername (event) {
    localStorage.removeItem('username');
    toggleClass();
}