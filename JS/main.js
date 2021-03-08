var second = 60;
var interval = 0;
var stopTimer = false;
var clickStart = false;
var enableClick = true; // if over 60 sec the click will stop.
var fastDiv = 500; // control the div speed
var scoreToH = 0;
const clickDiv = document.getElementById("click");
const playagain = document.getElementById("playAg");
const missedClicks = document.getElementById("missedClicks");
const levelHT = document.getElementById("level");
var score = document.getElementById("score");
var clickToNextL = document.getElementById("clickTo");
var showName = document.getElementById("le");
var clickWork = false; // האם לחצתי על ckick ?
var misse = 0;
var countClicks = 0;
var level = 1;
var yourName = "";
var my_players = [];
var found = false;
var timeDate = "";
displayPlayers();

//const src ="https://www.gravatar.com/avatar/2f2eaccac43433e0bdd0b9f795286423?s=32&d=identicon&r=PG&f=1";

//const docStyle = document.body.style;
//document.querySelector('#blackScreen').addEventListener('mouseover', () => {
 // if (!docStyle.cursor) docStyle.cursor = `url('https://www.clipartmax.com/png/middle/133-1334105_tom-and-jerry-png-tom-and-jerry-png.png')`;
 // else docStyle.cursor = null;
//});


function start() {
  clickStart = true;
  yourName = prompt("Whats your Name ?");

  timer();
  clickDiv.addEventListener("mouseover", moveClick);
}
function play2() {
  yourName = prompt("Whats your Name ?");
  clickStart = true;
  enableClick = true;
  stopTimer = false;
  timer();
  moveClick();
  playagain.style.display = "none";
}
function catch_click() {
  if (clickStart == true) {
    countClicks++;
    clickWork = true; // לחצתי על קליק!
  
      scoreToH += 10 * level;
      score.innerHTML = scoreToH;
    
    levelHT.innerHTML = level;
    clickToNextL.innerHTML = 10 - countClicks;
    if (countClicks == 10) {
      countClicks = 0;
      clickToNextL.innerHTML = 10 - countClicks;
    }
    if (countClicks % 10 == 0) {
      level++;
      fastDiv -= 50;
      second += 10;
    }
    if (level == 5) {
      alert(yourName + ",  you won!\nyour score is:  " + scoreToH);
      scoreToH = 0;
      stopTimer = true;
      clickStart = false;
    }
  }
}

function badClick() {
  if (clickStart == true && clickWork == false && scoreToH >0) {
    // תיכנס רק אם קליק לא פעיל
    
    scoreToH -= 1 * level;
    score.innerHTML = scoreToH;
    misse++;
    missedClicks.innerHTML = misse;
  }
  clickWork = false; // אם קליק מופעל הגדר קליק לא פעיל
}
function moveClick() {
  if (enableClick == true) {
    setTimeout(function () {
      clickDiv.style.animation = "spin 1s linear infinite";
      let boxH = Math.floor(Math.random() * 380);
      let boxW = Math.floor(Math.random() * 750);
      click.style.top = boxH + "px";
      click.style.right = boxW + "px";
    }, fastDiv);
  }
}
function timer() {
  if (stopTimer == false) {
    stopTimer = true;
    interval = setInterval(function () {
      second--;
      time_html.innerHTML = second;
      if (second == 0) {
        timeDate =
          new Date()
            .toLocaleDateString("he-IL", { timeZone: "Asia/Jerusalem" })
            .replace(/\D/g, "/") +
          " " +
          new Date().toLocaleTimeString("en-US", {
            hour12: false,
            hour: "numeric",
            minute: "numeric",
          });
        alert("GAME OVER");
        players();
        clearInterval(interval);
        enableClick = false;
        clickStart = false;
        playagain.style.display = "block";
        second = 60;
        level = 1;
        scoreToH = 0;
        time_html.innerHTML = second;
        missedClicks.innerHTML = 0;
        clickToNextL.innerHTML = 0;
        score.innerHTML = 0;
        levelHT.innerHTML = 0;
      }
    }, 1000);
  }
}
function players() {
  // chack if the name is in the array
  for (i = 0; i < my_players.length; i++) {
    if (my_players[i].name == yourName) {
      found = true;
      // change only his score
      my_players[i].score = scoreToH;
      my_players[i].timeDat = timeDate;
      break;
    }
  }
  // add a new player
  if (my_players.length < 5 && found == false) {
    my_players.push({ name: yourName, score: scoreToH, timeDat: timeDate });
  } else if (
    // if we have alredey 5 players but the new player has more score then one of the players.
    scoreToH > my_players[my_players.length - 1].score &&
    found == false
  ) {
    my_players[my_players.length - 1].name = yourName;
    my_players[my_players.length - 1].score = scoreToH;
    my_players[my_players.length - 1].timeDat = timeDate;
  }
  // sort the scores
  my_players.sort(function (a, b) {
    return b.score - a.score;
  });
  updatePlayer();
  // clean the table score
  showName.innerHTML = "";
  // update the table score
  my_players.forEach(function (play) {
    showName.innerHTML +=
      `<div class="e">` +
      play.name +
      ` ` +
      play.score +
      ` <span class="date">` +
      play.timeDat +
      ` </span> </div> `;
  });
}
function displayPlayers() {
  var playerJSON = localStorage.getItem("allPlayers");
  if (playerJSON != null) {
    var arrPlayers = JSON.parse(playerJSON);
    if (arrPlayers.length > 0) {
      my_players = arrPlayers;
      my_players.forEach(function (play) {
        showName.innerHTML +=
          `<div class="e">` +
          play.name +
          ` ` +
          play.score +
          ` <span class="date">` +
          play.timeDat +
          ` </span> </div> `;
      });
    }
  }
}
function updatePlayer() {
  var playerJSON = JSON.stringify(my_players);
  localStorage.setItem("allPlayers", playerJSON);
}
