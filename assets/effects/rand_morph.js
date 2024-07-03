const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!&)#$)0!@%?";
let interval = null;
const h2Element = document.querySelector("h2");
const targetWord = "DOING THE IMPOSSIBLE";
let isScrambling = false; // Flag to track if currently scrambling
let hasScrambled = false; // Flag to track if already fully scrambled
let lastMouseMoveTime = 0;
const throttleDelay = 100; // Throttle delay in milliseconds

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

function handleMouseMove(event) {
  const currentTime = new Date().getTime();
  if (currentTime - lastMouseMoveTime < throttleDelay) {
    return;
  }
  lastMouseMoveTime = currentTime;

  const cursorOutline = document.querySelector(".cursor-outline");
  const h2Rect = h2Element.getBoundingClientRect();
  const cursorRect = cursorOutline.getBoundingClientRect();

  // Check if cursor is over the h2 element
  if (
    cursorRect.left >= h2Rect.left &&
    cursorRect.right <= h2Rect.right &&
    cursorRect.top >= h2Rect.top &&
    cursorRect.bottom <= h2Rect.bottom
  ) {
    if (!isScrambling && !hasScrambled) {
      h2Element.classList.remove("glow-text"); // Remove glow effect class on hover
      scrambleText(h2Element, targetWord);
    }
  }
}

document.addEventListener("mousemove", handleMouseMove);

// Initialize with scrambled text
startContinuousScrambling();
