const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

window.addEventListener('mousemove', function (e) {

    const posX = e.clientX;
    const posY = e.clientY;


    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top  = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, {duration: 250, fill: 'forwards'});
});


const blob = document.getElementById("blob");

window.onpointermove = event => { 
const { clientX, clientY } = event;

blob.animate({
    left: `${clientX}px`,
    top: `${clientY}px`
}, { duration: 3000, fill: "forwards" });
}  