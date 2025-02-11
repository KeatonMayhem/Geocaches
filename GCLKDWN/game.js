function generateUniquePin() {
    let digits = "0123456789".split("");
    let pin = "";
    while (pin.length < 4) {
        let index = Math.floor(Math.random() * digits.length);
        pin += digits.splice(index, 1);
    }
    return pin;
}

let pin = generateUniquePin();
let attempts = 6;
let currentGuess = "";

function updateDisplay() {
    const inputDigits = document.getElementById("input").children;
    for (let i = 0; i < 4; i++) {
        inputDigits[i].textContent = currentGuess[i] || "";
    }
}

function checkGuess() {
    if (currentGuess.length !== 4) return;
    
    let tempPin = pin.split('');
    let guessArr = currentGuess.split('');
    let result = Array(4).fill("incorrect");
    
    guessArr.forEach((digit, i) => {
        if (digit === pin[i]) {
            result[i] = "correct";
            tempPin[i] = null;
        }
    });
    
    guessArr.forEach((digit, i) => {
        if (result[i] === "incorrect" && tempPin.includes(digit)) {
            result[i] = "misplaced";
            tempPin[tempPin.indexOf(digit)] = null;
        }
    });
    
    const guessDigits = document.getElementById("guesses").children;
    guessArr.forEach((digit, i) => {
        guessDigits[i].textContent = digit;
        guessDigits[i].className = `digit ${result[i]}`;
    });
    
    attempts--;
    document.getElementById("attempts").innerText = `Attempts Left: ${attempts}`;
    
    if (currentGuess === pin) {
        endGame("You guessed the correct PIN!");
        return;
    }
    
    if (attempts === 0) {
        endGame("Game Over! The PIN was " + pin);
        return;
    }
    
    currentGuess = "";
    updateDisplay();
}

function endGame(message) {
    document.getElementById("game-message").innerText = message;
    document.getElementById("game-message").classList.remove("hidden");
    disableButtons();
}

function disableButtons() {
    document.querySelectorAll(".numpad button").forEach(button => button.disabled = true);
}

function enableButtons() {
    document.querySelectorAll(".numpad button").forEach(button => button.disabled = false);
}

function createNumpad() {
    let numpadHTML = "";
    for (let i = 1; i <= 9; i++) {
        numpadHTML += `<button onclick='addDigit(${i})'>${i}</button>`;
    }
    numpadHTML += `<button onclick='clearGuess()'>⌫</button>`;
    numpadHTML += `<button onclick='addDigit(0)'>0</button>`;
    numpadHTML += `<button onclick='checkGuess()'>✔</button>`;
    document.getElementById("numpad").innerHTML = numpadHTML;
}

function addDigit(digit) {
    if (currentGuess.length < 4) {
        currentGuess += digit;
        updateDisplay();
    }
}

function clearGuess() {
    currentGuess = currentGuess.slice(0, -1);
    updateDisplay();
}

function resetGame() {
    pin = generateUniquePin();
    attempts = 6;
    currentGuess = "";
    document.getElementById("attempts").innerText = `Attempts Left: ${attempts}`;
    document.getElementById("game-message").classList.add("hidden");
    enableButtons();
    const guessDigits = document.getElementById("guesses").children;
    for (let i = 0; i < 4; i++) {
        guessDigits[i].textContent = "";
        guessDigits[i].className = "digit incorrect";
    }
    updateDisplay();
}

createNumpad();
updateDisplay();