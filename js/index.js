const body = document.querySelector("body");
const NUMBER_OF_PICS = 5;

const backgroundPics = {
    1: { name: 'Cityscape of Jamsil, South Korea', src: './image/1.jpg', author: 'Sunyu Kim', ref: 'Unsplash' },
    2: { name: 'Hanok Village Seoul, South Korea', src: './image/2.jpg', author: 'Yeo Khee', ref: 'Unsplash' },
    3: { name: 'Night View Seoul, South Korea', src: './image/3.jpg', author: 'Yohan Cho', ref: 'Unsplash' },
    4: { name: 'Gwangan Bridge, Busan, South Korea', src: './image/4.jpg', author: 'Daniel Lee', ref: 'Unsplash' },
    5: { name: 'the bay 101, Busan, South Korea', src: './image/5.jpg', author: 'Daniel Lee', ref: 'Unsplash' }
}

function setBackgroundImage(number) {
    const image = new Image();
    const bgDiv = document.getElementById('background');
    const bgName = document.getElementById('bgName');
    const bgDesc = document.getElementById('bgDesc');

    //image.src = `./image/${number + 1}.jpg`;
    image.src = backgroundPics[number + 1].src;
    image.classList.add("bg");

    bgDiv.prepend(image);
    bgName.innerText = backgroundPics[number + 1].name;
    bgDesc.innerText = "Photo by " + backgroundPics[number + 1].author + " " + backgroundPics[number + 1].ref;
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