const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");
const textContent = document.querySelectorAll("h2, h3, p, .events");

if (cursorDot && cursorOutline && textContent) {
    window.addEventListener('mousemove', function (e) {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 250, fill: 'forwards' });

        let isHovering = false;

        textContent.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (posX >= rect.left && posX <= rect.right && posY >= rect.top && posY <= rect.bottom) {
                isHovering = true;
            }
        });

        if (isHovering) {
            cursorDot.classList.add('hover');
            cursorOutline.classList.add('hover');
        } else {
            cursorOutline.classList.remove('hover');
            cursorDot.classList.remove('hover');
        }
    });
}
