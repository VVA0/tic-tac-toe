const playerOne = prompt("Введите имя первого игрока") || "Игрок 1";
const playerTwo = prompt("Введите имя второго игрока") || "Игрок 2";

const playerName = document.querySelector(".player__name");
const winner = document.querySelector(".wrapper__winner");
const wrapperPlayer = document.querySelector(".wrapper__player");
const restartBtn = document.querySelector(".btn");
const cards = document.querySelectorAll(".card");
const playerNameOne = document.querySelector(".player__name-1");
const playerNameTwo = document.querySelector(".player__name-2");
const playerScoreOne = document.querySelector(".player__score-1");
const playerScoreTwo = document.querySelector(".player__score-2");
const drawScore = document.querySelector(".draw__score");

playerName.innerHTML = playerOne;

playerNameOne.innerHTML = playerOne;
playerNameTwo.innerHTML = playerTwo;

let currentPlayer = 1; //! 1- крестик, 2- нолик
let gameEnd = false;
const winPos = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

restartBtn.addEventListener("click", restartGame);

for (let i = 1; i <= 9; i++) {
  let card = document.getElementById(i.toString());
  card.addEventListener("click", function () {
    makeMove(card);
  });
}

function makeMove(card) {
  let img = card.querySelector("img");
  if (!gameEnd && img.src == "") {
    img.src = `./image/img-${currentPlayer}.png`;
    card.classList.add("flip");
    checkWin();
    if (currentPlayer == 1) {
      playerName.innerHTML = playerTwo;
      currentPlayer = 2;
    } else {
      playerName.innerHTML = playerOne;
      currentPlayer = 1;
    }
  }
}

function checkWin() {
  winPos.forEach((element) => {
    let cardOne = document.getElementById(element[0]);
    let cardTwo = document.getElementById(element[1]);
    let cardThree = document.getElementById(element[2]);
    let imgOne = cardOne.querySelector("img");
    let imgTwo = cardTwo.querySelector("img");
    let imgThree = cardThree.querySelector("img");
    if (imgOne.src && imgTwo.src && imgThree.src) {
      if (imgOne.src === imgTwo.src && imgTwo.src === imgThree.src) {
        cardOne.classList.add("active");
        cardTwo.classList.add("active");
        cardThree.classList.add("active");
        winnerPlayer();
        return;
      }
    }
  });
  checkDraw();
}

function winnerPlayer() {
  gameEnd = true;
  wrapperPlayer.classList.add("hidden");
  restartBtn.classList.remove("hidden");
  winner.classList.remove("hidden");
  if (currentPlayer === 1) {
    winner.innerHTML = `<div>Выиграл игрок:</div><div>${playerOne}</div>`;
    playerScoreOne.innerHTML = +playerScoreOne.innerHTML + 1;
  } else {
    winner.innerHTML = `<div>Выиграл игрок:</div><div>${playerTwo}</div>`;
    playerScoreTwo.innerHTML = +playerScoreTwo.innerHTML + 1;
  }
}

function restartGame() {
  playerName.innerHTML = playerOne;
  currentPlayer = 1;
  gameEnd = false;
  wrapperPlayer.classList.remove("hidden");
  winner.classList.add("hidden");
  restartBtn.classList.add("hidden");
  winner.innerHTML = "";
  cards.forEach((element) => {
    element.classList.remove("flip", "active");
    let img = element.querySelector("img");
    img.removeAttribute("src");
  });
}

function checkDraw() {
  let count = 0;
  cards.forEach((element) => {
    if (element.classList.contains("flip")) {
      count++;
    }
  });
  if (count === cards.length) {
    gameEnd = true;
    winner.classList.remove("hidden");
    wrapperPlayer.classList.add("hidden");
    restartBtn.classList.remove("hidden");
    winner.innerHTML = "Ничья!";
    drawScore.innerHTML = +drawScore.innerHTML + 1; //!
  }
}
