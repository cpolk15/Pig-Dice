/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, pointWin, diceDOM;
diceDOM = document.querySelectorAll(".dice");
console.log(diceDOM);
function initGame() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  pointWin = 100;
  gamePlaying = true;

  diceDOM[0].style.display = "none";
  diceDOM[1].style.display = "none";
  document.getElementById("win-point").value = 100;
  document.querySelector(".win-point").classList.remove("error");

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  diceDOM[0].style.display = "none";
  diceDOM[1].style.display = "none";
}

initGame();

// EVENT LISTENER FOR "ROLL DICE" BUTTON
document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    var diceOne, diceTwo;
    diceOne = 1 + Math.floor(Math.random() * 6);
    diceTwo = 1 + Math.floor(Math.random() * 6);

    diceDOM[0].style.display = "block";
    diceDOM[1].style.display = "block";
    diceDOM[0].src = "dice-" + diceOne + ".png";
    diceDOM[1].src = "dice-" + diceTwo + ".png";

    if (diceOne !== 1 && diceTwo !== 1) {
      if (diceOne === 6 && diceTwo === 6) {
        //delete complete score if double 6s rolled
        pastRoll = 0;
        scores[activePlayer] = 0;
        document.getElementById("score-" + activePlayer).textContent =
          scores[activePlayer];
        nextPlayer();
      } else {
        //Add score
        roundScore += diceOne + diceTwo;
        document.querySelector(
          "#current-" + activePlayer
        ).textContent = roundScore;
      }
    } else {
      pastRoll = 0;
      nextPlayer();
    }
  }
});

//EVENT LISTNER FOR "HOLD" BUTTON
document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    //add CURRENT score to global score
    scores[activePlayer] += roundScore;

    //update UI to clear current scores
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    //check to see if player won the game (score = 100)
    if (scores[activePlayer] >= pointWin) {
      //display winner UI
      gamePlaying = false;

      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      diceDOM[0].style.display = "none";
      diceDOM[1].style.display = "none";

      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
    } else {
      //switch active player
      nextPlayer();
    }
  }
});

//EVENT LISTENER TO "NEW GAME" BUTTON
document.querySelector(".btn-new").addEventListener("click", initGame);

//EVENT LISTENER TO CHANGE POINTS LIMIT
document
  .querySelector(".win-point")
  .addEventListener("input", function (event) {
    var input = parseInt(event.target.value);
    var limit = document.querySelector(".win-point");

    if (Number.isNaN(input)) {
      gamePlaying = false;
      limit.classList.add("error");
    } else {
      limit.classList.remove("error");
      pointWin = input;
      gamePlaying = true;
    }
    console.log(input);
    console.log();
  });
