document.addEventListener('DOMContentLoaded', () => {
    const card = document.querySelector('.card');
    
    card.addEventListener('mouseenter', () => {
        gsap.to(card, { 
            duration: 1, 
            rotationY: 180, 
            ease: 'power4.out' 
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, { 
            duration: 1, 
            rotationY: 0, 
            ease: 'power4.out' 
        });
    });
});
