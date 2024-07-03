const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!&)#$)0!@%?";
let interval = null;
const h2Element = document.querySelector("h2");
const targetWord = "DOING THE IMPOSSIBLE";
let isScrambling = false; // Flag to track if currently scrambling
let hasScrambled = false; // Flag to track if already fully scrambled

function scrambleText(element, targetText) {
  let iteration = 0;
  clearInterval(interval);
  isScrambling = true; // Set scrambling flag to true

  interval = setInterval(() => {
    element.innerText = targetText
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return targetText[index];
        }
        return letters[Math.floor(Math.random() * letters.length)];
      })
      .join("");

    if (iteration >= targetText.length) {
      clearInterval(interval);
      element.innerText = targetText; // Ensure final text is set to the target
      element.parentElement.classList.add("scrambled"); // Add class to parent container indicating fully scrambled
      isScrambling = false; // Reset scrambling flag
      hasScrambled = true; // Set flag indicating text has fully scrambled
    }

    iteration++;
  }, 100); // Slower interval for smoother effect and aesthetic

  // You can add easing effects here for more aesthetic transition
}

function startContinuousScrambling() {
  clearInterval(interval);

  interval = setInterval(() => {
    if (!isScrambling && !hasScrambled) {
      h2Element.innerText = targetWord
        .split("")
        .map((letter) => (letter === " " ? " " : letters[Math.floor(Math.random() * letters.length)]))
        .join("");
    }
  }, 150); // Adjust the interval for continuous scrambling with a slower rate
}

h2Element.addEventListener("mouseover", () => {
  if (!isScrambling && !hasScrambled) {
    h2Element.classList.remove("glow-text"); // Remove glow effect class on mouseover
    scrambleText(h2Element, targetWord);
  }
});

h2Element.addEventListener("mouseout", () => {
  // Start continuous scrambling only if not currently scrambling and not already fully scrambled
  if (!isScrambling && !hasScrambled) {
    startContinuousScrambling();
  }
});

// Initialize with scrambled text
startContinuousScrambling();
