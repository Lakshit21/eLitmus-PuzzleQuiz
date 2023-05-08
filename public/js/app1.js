const startButton = document.getElementById('start');
// const restartButton = document.getElementById('restart');
const homeButton = document.getElementById('backToHome');
// const Hidd = document.getElementById('hiddenScore');
const scoreDiv = document.getElementById('score');
const dots = document.querySelectorAll('.dot');
const form = document.querySelector('form');
const gScoreInput = document.getElementById('g_score');

let sequence = [];
let index = 0;
let score = 0;

// Generate a random sequence
function generateSequence() {
  const randomIndex = Math.floor(Math.random() * dots.length);
  sequence.push(randomIndex);
}

// Blink the dots in the sequence
function blinkSequence() {
  let i = 0;
  const intervalId = setInterval(() => {
    const dotIndex = sequence[i];
    const dot = dots[dotIndex];
    dot.classList.add('blinking');
    setTimeout(() => {
      dot.classList.remove('blinking');
    }, 300);
    i++;
    if (i >= sequence.length) {
      clearInterval(intervalId);
    }
  }, 500);
}

// Handle a click on a dot
function handleDotClick(event) {
  const dotIndex = Array.from(dots).indexOf(event.target);
  if (dotIndex === sequence[index]) {
    const dot = dots[dotIndex];
    dot.classList.add('highlighted');
    setTimeout(() => {
      dot.classList.remove('highlighted');
    }, 300);
    index++;
    if (index >= sequence.length) {
      index = 0;
      score++;
      scoreDiv.innerText = score;
      generateSequence();
      blinkSequence();
    }
  } else {
    endGame();
  }
}

// End the game and save the score
function endGame() {
  alert(`Game over! Your score is ${score}.`);
  // restartButton.disabled = true;
  homeButton.disabled = false;
//   Hidd.value = score;
//   saveScore();
}

// Save the score to the server
// function saveScore() {
//   const data = { score };
//   console.log(data);
//   fetch('/game_1', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   })
//     .then(() => {
//       console.log('Score saved to server.');
//     })
//     .catch((err) => {
//       console.error(err);
//     });
// }

form.addEventListener('submit', (event) => {
  // Update the hidden input element's value with the score
  gScoreInput.value = score;
});

// Add event listeners
startButton.addEventListener('click', () => {
  startButton.disabled = true;
//   homeButton.disabled = true;
  generateSequence();
  blinkSequence();
  dots.forEach((dot) => {
    dot.addEventListener('click', handleDotClick);
  });
});

restartButton.addEventListener('click', () => {
  if (confirm('Are you sure you want to restart the game?')) {
    location.reload();
  }
});