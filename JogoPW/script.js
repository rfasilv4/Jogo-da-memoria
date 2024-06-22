const cards = document.querySelectorAll('.memory-card');
const newGameButton = document.getElementById('new-game');
const score1Element = document.getElementById('score1');
const score2Element = document.getElementById('score2');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let score1 = 0;
let score2 = 0;
let currentPlayer = 1;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    // second click
    secondCard = this;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    if (isMatch) {
        disableCards();
        updateScore(currentPlayer);
    } else {
        unflipCards();
        currentPlayer = currentPlayer === 1 ? 2 : 1;
    }
}

function disableCards() {
    firstCard.classList.add('match');
    secondCard.classList.add('match');

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function updateScore(player) {
    if (player === 1) {
        score1++;
        score1Element.textContent = score1;
    } else if (player === 2) {
        score2++;
        score2Element.textContent = score2;
    }
}

function resetGame() {
    cards.forEach(card => {
        card.classList.remove('flip', 'match');
    });

    shuffleCards();
    score1 = 0;
    score2 = 0;
    score1Element.textContent = score1;
    score2Element.textContent = score2;
    currentPlayer = 1;
}

function shuffleCards() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
}

newGameButton.addEventListener('click', resetGame);
cards.forEach(card => card.addEventListener('click', flipCard));

// Shuffle cards initially
shuffleCards();
