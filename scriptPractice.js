const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}
let card1 = null;
let card2 = null;
let flippedCount = 0;
let setsMatched = 0;
let noMoreClicksLeft = false;

function handleCardClick(e) {
  // you can use e.target to see which element was clicked
  // console.log("you just clicked", e.target);
  let currentCard = e.target;

  if (noMoreClicksLeft) return; //saying = false
  if (e.target.classList.contains("flipped-Vissible")) return;
  currentCard.style.backgroundColor = e.target.classList[0];

  // card1 & card2 begin as null, so if not..(which is true), then we assignthe flipped to both classes & assign true values for card1 & card2
  if (!card1 || !card2) {
    currentCard.classList.add("flipped-Vissible");
    card1 = card1 || currentCard;
    card2 = currentCard === card1 ? null : currentCard;
    //need help reading card2 assignement
  }
  //card1 & card2 classes (color & flipped-visible) are compared
  if (card1 && card2) {
    let cardColor1 = card1.className;
    let cardColor2 = card2.className;
    noMoreClicksLeft = true; // limits user to only two cards at a time & keeping from returning/exiting
    flippedCount += 2;

    // if the color & flipped state are a match we remove the click listener & reassign the card1 & card2 values to null so the user can continue playing
    if (cardColor1 === cardColor2) {
      setsMatched++;
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);

      card1 = null;
      card2 = null;
      noMoreClicksLeft = false; // exits & gives the user the oppprtuity to continue choosing cards
    } else {
      // the cards are NOT a match, we set a timer and have the cards flip back/ not visible
      setTimeout(function () {
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        // reassigns to empty string and loops back next time card is chosen to reassign
        card1.classList.remove("flipped-Vissible");
        card2.classList.remove("flipped-Vissible");

        card1 = null;
        card2 = null;
        noMoreClicksLeft = false; // cards are flipped over, loop exists, & user can try again
      }, 1000);
    }
  }
  if (setsMatched == COLORS.length / 2) alert("Winner!");
}

// when the DOM loads
createDivsForColors(shuffledColors);

/* */
