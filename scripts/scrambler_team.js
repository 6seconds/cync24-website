
document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(TextPlugin);

    document.querySelectorAll('.item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item.querySelectorAll('.scramble'), {
                text: function(i, element) {
                    return element.textContent.split('').sort(() => 0.5 - Math.random()).join('');
                },
                duration: 0.5,
                ease: "power1.inOut",
                repeat: 1,
                yoyo: true,
                onComplete: () => {
                    gsap.to(item.querySelectorAll('.scramble'), {
                        text: function(i, element) {
                            return element._originalText;
                        },
                        duration: 0.5,
                        ease: "power1.inOut"
                    });
                }
            });
        });
    
        item.querySelectorAll('.scramble').forEach(el => {
            el._originalText = el.textContent;
        });
    });
});
