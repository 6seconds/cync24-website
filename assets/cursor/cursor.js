const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

window.addEventListener('mousemove', function (e) {

    const posX = e.clientX;
    const posY = e.clientY;


    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top  = `${posY}px`;
    console.log(posX,posY)

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, {duration: 250, fill: 'forwards'});
});


