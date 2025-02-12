//Prevents from the screen moving
window.visualViewport.addEventListener("resize", () => {
    document.body.style.height = `${window.visualViewport.height}px`;
});

document.getElementById("guess").addEventListener("focus", function() {
    document.body.style.overflow = "hidden";
});

document.getElementById("guess").addEventListener("blur", function() {
    document.body.style.overflow = "auto";
});
// Categorized word list
const words = [
{ word: "apple", category: "Food" },
{ word: "banana", category: "Food" },
{ word: "grapes", category: "Food" },
{ word: "orange", category: "Food" },
{ word: "cookie", category: "Food" },
{ word: "candle", category: "Household Items" },
{ word: "pencil", category: "School Supplies" },
{ word: "butter", category: "Food" },
{ word: "garden", category: "Nature" },
{ word: "rocket", category: "Space" },
{ word: "ticket", category: "Entertainment" },
{ word: "planet", category: "Space" },
{ word: "monkey", category: "Animals" },
{ word: "silver", category: "Metals" },
{ word: "breeze", category: "Weather" },
{ word: "puzzle", category: "Games" },
{ word: "summer", category: "Seasons" },
{ word: "cactus", category: "Plants" },
{ word: "guitar", category: "Music" },
{ word: "sunset", category: "Nature" },
{ word: "rabbit", category: "Animals" },
{ word: "soccer", category: "Sports" },
{ word: "tunnel", category: "Structures" },
{ word: "yellow", category: "Colors" },
{ word: "window", category: "Household Items" },
{ word: "basket", category: "Objects" },
{ word: "splash", category: "Water" },
{ word: "bottle", category: "Household Items" },
{ word: "goblin", category: "Fantasy" },
{ word: "giraffe", category: "Animals" },
{ word: "jaguar", category: "Animals" },
{ word: "puffin", category: "Animals" },
{ word: "wombat", category: "Animals" },
{ word: "ocelot", category: "Animals" },
{ word: "explore", category: "Verbs" },
{ word: "rescue", category: "Verbs" },
{ word: "swimmer", category: "Verbs" },
{ word: "chasing", category: "Verbs" },
{ word: "trapped", category: "Verbs" },
{ word: "concert", category: "Entertainment" },
{ word: "theater", category: "Entertainment" },
{ word: "comedy", category: "Entertainment" },
{ word: "jukebox", category: "Entertainment" },
{ word: "cartoon", category: "Entertainment" },
{ word: "sunrise", category: "Nature" },
{ word: "harvest", category: "Nature" },
{ word: "volcano", category: "Nature" },
{ word: "tornado", category: "Nature" },
{ word: "glacier", category: "Nature" },
{ word: "history", category: "Academics" },
{ word: "science", category: "Academics" },
{ word: "physics", category: "Academics" },
{ word: "grammar", category: "Academics" },
{ word: "college", category: "Academics" },
{ word: "cyclone", category: "Weather" },
{ word: "thunder", category: "Weather" },
{ word: "blazing", category: "Weather" },
{ word: "drizzle", category: "Weather" },
{ word: "hammock", category: "Objects" },
{ word: "blanket", category: "Objects" },
{ word: "luggage", category: "Objects" },
{ word: "candle", category: "Objects" }
];

let chosenWordObj = words[Math.floor(Math.random() * words.length)];
let chosenWord = chosenWordObj.word;
let chosenCategory = chosenWordObj.category;
let guessedLetters = new Set();
let wrongGuesses = 0;
const maxGuesses = 6;

const hangmanStages = [
`+---+\n |   |\n     |\n     |\n     |\n     |\n=========`,
`+---+\n |   |\n O   |\n     |\n     |\n     |\n=========`,
`+---+\n |   |\n O   |\n |   |\n     |\n     |\n=========`,
`+---+\n |   |\n O   |\n/|   |\n     |\n     |\n=========`,
`+---+\n |   |\n O   |\n/|\\  |\n     |\n     |\n=========`,
`+---+\n |   |\n O   |\n/|\\  |\n/    |\n     |\n=========`,
`+---+\n |   |\n O   |\n/|\\  |\n/ \\  |\n     |\n=========`
];

function updateDisplay() {
document.getElementById("word-display").innerHTML = chosenWord
    .split("")
    .map(letter => guessedLetters.has(letter) 
        ? `<span class='correct'>${letter}</span>` 
        : "_")
    .join(" ");
document.getElementById("hangman").textContent = hangmanStages[wrongGuesses];
document.getElementById("category-text").textContent = chosenCategory; // Update category display
}

function makeGuess() {
let guess = document.getElementById("guess").value.toLowerCase();
document.getElementById("guess").value = "";
if (guess.length !== 1 || !/[a-z]/.test(guess)) {
    document.getElementById("message").textContent = "Please enter a valid letter.";
    return;
}
if (guessedLetters.has(guess)) {
    document.getElementById("message").textContent = "You've already guessed that letter.";
    return;
}
guessedLetters.add(guess);
if (!chosenWord.includes(guess)) {
    wrongGuesses++;
    document.getElementById("message").innerHTML = `<span class='incorrect'>Incorrect guess!</span>`;
} else {
    document.getElementById("message").innerHTML = `<span class='correct'>Good guess!</span>`;
}
updateDisplay();
checkGameOver();
}

function handleKeyPress(event) {
if (event.key === "Enter") {
    makeGuess();
}
}

function checkGameOver() {
const displayedWord = chosenWord.split("").map(letter => guessedLetters.has(letter) ? letter : "_").join("");

if (displayedWord === chosenWord) {
    document.getElementById("message").textContent = "Congratulations! You guessed the word!";
    displayCoordinates();
    endGame();
} else if (wrongGuesses >= maxGuesses) {
    document.getElementById("message").textContent = "Game Over! The word was " + chosenWord;
    document.getElementById("message").classList.add("lose");
    endGame();
}
}
    
function endGame() {
document.getElementById("guess").disabled = true;
document.getElementById("submit-button").disabled = true;
document.getElementById("restart-button").style.display = "inline-block";
}

function displayCoordinates() {
const coordinates = "N 39° 33.570′ W 86° 05.270′";
const coordinatesElement = document.getElementById("coordinates");
coordinatesElement.style.display = "inline-block";
coordinatesElement.textContent = coordinates;
}

function restartGame() {
chosenWordObj = words[Math.floor(Math.random() * words.length)];
chosenWord = chosenWordObj.word;
chosenCategory = chosenWordObj.category;
guessedLetters = new Set();
wrongGuesses = 0;
updateDisplay();
document.getElementById("guess").disabled = false;
document.getElementById("submit-button").disabled = false;
document.getElementById("restart-button").style.display = "none";
document.getElementById("message").textContent = "";
document.getElementById("message").classList.remove("lose");
document.getElementById("coordinates").style.display = "none";
}

updateDisplay();