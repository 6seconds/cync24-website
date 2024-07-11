const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:",.<>?/~`';
let interval = null;
const h2Element = document.querySelector("h2");
const targetWord = "DOING THE IMPOSSIBLE";
let isScrambling = false; // Flag to track if currently scrambling
let hasScrambled = false; // Flag to track if already fully scrambled
let lastMouseMoveTime = 0;
const throttleDelay = 100; // Throttle delay in milliseconds
let mouseX = 0;
let mouseY = 0;
let ticking = false;

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
      console.log(element);
      element.classList.add("scrambled"); // Add class to parent container indicating fully scrambled
      
      isScrambling = false; // Reset scrambling flag
      hasScrambled = true; // Set flag indicating text has fully scrambled

      const preloader = document.querySelector('.preloader');
      const navbar = document.querySelector('.navbar');
      const cypher = document.getElementById('cypher-text');

      cypher.style.animationPlayState = 'running';
      cypher.addEventListener('animationend', () => {
        preloader.style.animationPlayState = 'running';
        preloader.addEventListener('animationend', () => {
          preloader.remove();
          navbar.style.opacity = '1';
        });
        
      });    
    }

    iteration++;
  }, 100); // Slower interval for smoother effect and aesthetic

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
  mouseX = event.clientX;
  mouseY = event.clientY;
  requestTick();
}

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(update);
    ticking = true;
  }
}

function update() {
  ticking = false;

  const cursorOutline = document.querySelector(".cursor-outline");
  const h2Rect = h2Element.getBoundingClientRect();
  const cursorRect = {
    left: mouseX - cursorOutline.offsetWidth / 2,
    right: mouseX + cursorOutline.offsetWidth / 2,
    top: mouseY - cursorOutline.offsetHeight / 2,
    bottom: mouseY + cursorOutline.offsetHeight / 2
  };

  // Check if cursor is over the h2 element
  if (
    cursorRect.left >= h2Rect.left &&
    cursorRect.right <= h2Rect.right &&
    cursorRect.top >= h2Rect.top &&
    cursorRect.bottom <= h2Rect.bottom
  ) {
    if (!isScrambling && !hasScrambled) {
      scrambleText(h2Element, targetWord);
    }
  }
}

document.addEventListener("mousemove", handleMouseMove);

if (window.innerWidth >= 768) {
  document.addEventListener("DOMContentLoaded", () => {
    startContinuousScrambling();
  });
} else {
  const preloader = document.querySelector('.preloader');
  const navbar = document.querySelector('.navbar');
  const cypher = document.getElementById('cypher-text');

  cypher.style.animationPlayState = 'running';
  cypher.addEventListener('animationend', () => {
    preloader.style.animationPlayState = 'running';
    preloader.addEventListener('animationend', () => {
      preloader.remove();
      navbar.style.opacity = '1';
    });
    
  });  
}
