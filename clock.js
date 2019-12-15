
const timeControl = document.querySelector('.time');

function clock() {
    setInterval(getTime, 1000);
}

function getTime() {
    const today = new Date();
    const hour = today.getHours() < 10 ? '0'+today.getHours() : today.getHours();
    const minute = today.getMinutes() < 10? '0'+today.getMinutes() : today.getMinutes();
    const second = today.getSeconds() < 10? '0'+today.getSeconds() : today.getSeconds();;
    timeControl.innerHTML = `${hour} : ${minute} : ${second}`;
}