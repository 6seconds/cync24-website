const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let interval = null;
const h2Element = document.querySelector("h2");
const words = ["...DOING...", "...THE....", "IMPOSSIBLE"];
let currentWordIndex = 0;

function startAnimation() {
  let iteration = 0;
  const originalText = words[currentWordIndex];

  clearInterval(interval);

  interval = setInterval(() => {
    h2Element.innerText = originalText
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return originalText[index];
        }

        return letters[Math.floor(Math.random() * 26)];
      })
      .join("");

    iteration++;

    if (iteration > originalText.length) {
      clearInterval(interval);
      iteration = 0;
      currentWordIndex = (currentWordIndex + 1) % words.length;
      setTimeout(startAnimation, 800);
    }
  }, 125);
}

// Start the animation initially
startAnimation();
