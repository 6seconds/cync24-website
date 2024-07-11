const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        // Log entry details for debugging
        console.log(entry);
        
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
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const duration = 2000; // Scramble duration in milliseconds
        const interval = 100; // Interval between updates in milliseconds
        let startTime;

        function updateText() {
            if (!startTime) startTime = Date.now();
            const elapsedTime = Date.now() - startTime;
            const progress = elapsedTime / duration;
            let scrambledText = '';

            for (let i = 0; i < originalText.length; i++) {
                if (Math.random() < progress) {
                    scrambledText += originalText[i];
                } else {
                    scrambledText += characters[Math.floor(Math.random() * characters.length)];
                }
            }

            element.textContent = scrambledText;

            if (progress < 1) {
                setTimeout(() => requestAnimationFrame(updateText), interval);
            } else {
                element.textContent = originalText;
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
