document.addEventListener("mousemove", parallax);


function parallax(e) {
    document.querySelectorAll(".object").forEach(function(move) {
        var moving_value = move.getAttribute("data-value");
        
        // Calculate translation
        var x = (e.clientX * moving_value) / 50;
        var y = (e.clientY * moving_value) / 50;
        
        // Calculate scaling
        var scale = 1 + moving_value / 100;

        // Calculate blur
        var blur = moving_value / 100;

        // Calculate opacity
        var opacity = 1 - (moving_value / 200);

        move.style.transform = `translateX(${x}px) translateY(${y}px) scale(${scale})`;
        move.style.filter = `blur(${blur}px)`;
        move.style.opacity = opacity;
    });
}

var cursor = document.querySelector('.cursor'),
    cursorScale = document.querySelectorAll('.cursor-scale'),
    mouseX = 0,
    mouseY = 0

gsap.to({}, 0.016, {
    repeat: -1,

    onRepeat: function () {
        gsap.set(cursor, {
            css: {
                left: mouseX,
                top: mouseY
            }
        })
    }
});

window.addEventListener("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY
});

cursorScale.forEach(link => {
    link.addEventListener('mouseleave', () => {
        cursor.classList.remove('grow');
        cursor.classList.remove('grow-small');
    });
    link.addEventListener('mousemove', () => {
        cursor.classList.add('grow');
        if(link.classList.contains('small')){
            cursor.classList.remove('grow');
            cursor.classList.add('grow-small');
        }
    });
});
