gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    ScrollTrigger.scrollerProxy(".container", {
        scrollTop(value) {
            return arguments.length ? document.querySelector(".container").scrollTo(0, value) : document.querySelector(".container").scrollTop;
        },
        getBoundingClientRect() {
            return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
        },
        pinType: document.querySelector(".container").style.transform ? "transform" : "fixed"
    });

    // Header animation
    gsap.to('.header', {
        fontSize: '0.6rem',
        top: '0.6rem', // Move to the top center
        left: '50%', // Ensure it stays centered horizontally
        transform: 'translate(-50%, 0)', // Adjust transform to maintain horizontal centering
        padding: '20px',
        scrollTrigger: {
            scroller: ".container", // specify the container
            trigger: '.container',
            start: 'top top',
            end: '+=1000',
            scrub: 0.5,
            pin: '.header',
            pinSpacing: false,
            onUpdate: self => {
                if (self.progress === 1) {
                    self.pin.style.left = '50%';
                    self.pin.style.transform = 'translate(-50%, 0)';
                }
            }
        }
    });

    // Animation for h2 font size change and opacity change
    gsap.to('.header h2', {
        fontSize: '0.5rem', // Change this value to the desired end font size
        opacity: 0, // Add opacity change
        scrollTrigger: {
            scroller: ".container", // specify the container
            trigger: '.container',
            start: 'top top',
            end: '+=1000',
            scrub: 0.5,
            onComplete: () => {
                // Reveal content sections after h2 animation completes
                gsap.to('.content-section', {opacity: 1, duration: 1, stagger: 0.2});
            }
        }
    });

    ScrollTrigger.addEventListener("refresh", () => ScrollTrigger.update());
    ScrollTrigger.refresh();
});