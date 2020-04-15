const body = document.querySelector("body");
const NUMBER_OF_PICS = 3;

function setBackgroundImage(number) {
    const image = new Image();
    const bgDiv = document.getElementById('background');

    image.src = `./image/${number + 1}.jpg`;
    image.classList.add("bg");

    bgDiv.prepend(image);
}

function getRandomNumber() {
    const number = Math.floor(Math.random() * NUMBER_OF_PICS);
    return number;
}

function init() {
    const randomNumber = getRandomNumber();
    setBackgroundImage(randomNumber);
}

init();