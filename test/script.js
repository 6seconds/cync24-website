document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);
    const animateChars = (chars, reverse = false) => {

        const staggerOptions = {
            each: 0.35,
            from: reverse ? "start" : "end",
            ease: "linear",
        };

        gsap.fromTo(chars, {
            fontWeight: 100 
        }, {
            fontWeight: 900,
            duration: 1,
            ease: "none",
            scrollTrigger: {
                trigger: chars[0].closest('.marquee-container'),
                start: "50% bottom",
                end: "top top",
                scrub: true,
            }
        })
    
    
    
    }

    const splitText = new SplitType('.item h1',  {types: "chars"});

    const marqueeContainers = document.querySelectorAll(".marquee-container");

    marqueeContainers.forEach( (container, index) => {
        let start = "0%";
        let end = '-15%';

        if (index %2 ==0) {
            start = '0%';
            end = "10%";
        }


        const marquee = container.querySelector('.marquee');
        const words = marquee.querySelectorAll('.item h1');

        gsap.fromTo(marquee, {x: start}, {
            x: end,
            scrollTrigger: {
                trigger: container,
                start: "top bottom",
                end: "150% top",
                scrub: true,
            }
        });

        words.forEach( (word) => {
            const chars = Array.from(word.querySelectorAll(".char"));
            if (chars.length) {
                const reverse = index % 2 !==0;
                animateChars(chars, reverse);
            }
        });
    });

    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add( (time) => lenis.raf(time*1000));
    gsap.ticker.lagSmoothing(0);
});