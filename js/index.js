const body = document.querySelector("body");
const NUMBER_OF_PICS = 3;

const backgroundPics = {
    1: {name: 'Cityscape of Jamsil, Korea', src: './image/1.jpg'},
    2: {name: 'Hanok Village Seoul, Korea', src: './image/2.jpg'},
    3: {name: 'Night View Seoul, Korea', src: './image/3.jpg'}
}

function setBackgroundImage(number) {
    const image = new Image();
    const bgDiv = document.getElementById('background');
    const bgName = document.getElementById('bgName');

    //image.src = `./image/${number + 1}.jpg`;
    image.src = backgroundPics[number+1].src;
    image.classList.add("bg");

    bgDiv.prepend(image);
    bgName.innerText = backgroundPics[number+1].name;
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