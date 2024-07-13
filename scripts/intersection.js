const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        
        // Check if the entry is intersecting
        if (entry.isIntersecting) {
            // Add the 'show' class if it is not already present
            if (!entry.target.classList.contains('show')) {
                entry.target.classList.add('show');
            }
        }
    });
});

// Select elements to observe
const elements = document.querySelectorAll(".scaler");
const right = document.querySelectorAll(".rightreveal");
const rightslide = document.querySelectorAll(".rightSlideIn");

// Observe each element
elements.forEach((el) => observer.observe(el));
right.forEach((el) => observer.observe(el));
rightslide.forEach((el) => observer.observe(el));

document.addEventListener('DOMContentLoaded', () => {
    const targets = document.querySelectorAll('.scramble');

    // Function to scramble text
    function scrambleText(element) {
        const originalText = element.textContent;
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:",.<>?/~`';
        const duration = 1500; // Scramble duration in milliseconds
        const interval = 100; // Interval between updates in milliseconds
        let startTime;
        let lastUpdateTime = 0;

        function getRandomChar() {
            return characters[Math.floor(Math.random() * characters.length)];
        }

        function updateText() {
            const currentTime = Date.now();
            if (!startTime) startTime = currentTime;

            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);

            if (currentTime - lastUpdateTime >= interval) {
                let scrambledText = '';
                for (let i = 0; i < originalText.length; i++) {
                    if (Math.random() < progress) {
                        scrambledText += originalText[i];
                    } else {
                        scrambledText += getRandomChar();
                    }
                }

                element.textContent = scrambledText;
                lastUpdateTime = currentTime;
            }

            if (progress < 1) {
                requestAnimationFrame(updateText);
            } else {
                element.textContent = originalText;
                element.classList.add('scrambled');
            }
        }

        requestAnimationFrame(updateText);
    }

    // Intersection Observer callback
    function handleIntersect(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                scrambleText(entry.target);
                observer.unobserve(entry.target); // Remove observer after scrambling
            }
        });
    }

    // Create Intersection Observer
    const observer = new IntersectionObserver(handleIntersect, {
        threshold: 0.5 // Trigger when 50% of the element is in view
    });

    targets.forEach(target => observer.observe(target));
});