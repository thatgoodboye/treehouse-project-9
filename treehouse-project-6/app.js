const qwerty = document.getElementById("qwerty");
const phrase = document.getElementById("phrase");
const phrases = ["throw me a bone", "haste makes waste", "dead men tell no tales", "honesty is the best policy", "all you need is love"];
let missed = 0;

// select phrase at random from bank of phrases
function getRandomPhraseAsArray(arr = phrases) {
  // gen an indexer between 0 and the length of the phrase array minus 1
  const i = Math.floor(Math.random() * arr.length);
  // all caps the phrase and split it by letters and spaces
  const splitPhrase = arr[i].toUpperCase().split("");

  // console.log(arr[i].toUpperCase());

  return splitPhrase;
}

// display the split phrase
function addPhraseToDisplay(arr) {
  const display = document.querySelector("#phrase ul");
  // loop the arr and construct li to append to the ul
  for (i = 0; i < arr.length; i++) {
    const text = arr[i];
    let li = document.createElement("li");

    li.textContent = text;
    // if the current index is a letter add the ".letter" class to the li
    if (/\s/.test(text)) li.classList.add("space");
    else li.classList.add("letter");
    display.appendChild(li);
  }
}

// compare the button letter to the phrase letters
function checkLetter(btn) {
  const phraseEls = document.querySelectorAll(".letter");
  let match = false;

  // loop phrase and .show letters that match button selection
  for (i = 0; i < phraseEls.length; i++) {
    let el = phraseEls[i];

    if (el.textContent === btn.textContent.toUpperCase()) {
      console.log(el);
      el.classList.add("show");
      match = true;
    }
  }

  btn.setAttribute("disabled", "disabled");

  return match;
}

function checkWin() {
  const letterEls = document.querySelectorAll(".letter");
  const shownLetterEls = document.querySelectorAll(".show");
  let overlay = document.getElementById("overlay");
  let title = document.querySelector("#overlay .title");
  let start = document.querySelector("#overlay a");

  if (letterEls.length === shownLetterEls.length) {
    overlay.style.display = "flex";
    title.textContent = "YOU WIN :]";
    overlay.className = "win";
    start.style.display = "none";
  } else if (missed >= 5) {
    overlay.style.display = "flex";
    title.textContent = "YOU LOSE :,[";
    overlay.className = "lose";
    start.style.display = "none";
  }
}

document.addEventListener("click", e => {
  if (e.target.tagName === "A") document.getElementById("overlay").style.display = "none";
  else if (e.target.tagName === "BUTTON") {
    let scoreboard = document.querySelectorAll("#scoreboard img");
    if (!checkLetter(e.target)) {
      missed++;
      scoreboard[scoreboard.length - missed].src = "images/lostHeart.png";
    }

    checkWin();
  }
});

addPhraseToDisplay(getRandomPhraseAsArray());
