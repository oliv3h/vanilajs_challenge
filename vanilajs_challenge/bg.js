const bodySelector = document.body;

function bg() {
    let bgName = Math.floor(Math.random() * 3);
    let fileName = 'url(image/' + bgName+'.jpg)'
    bodySelector.style.backgroundImage = fileName;
}