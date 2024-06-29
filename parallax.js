document.addEventListener("mousemove", parallax);

function parallax(e) {
    const angle = 45; // Angle in degrees for movement direction
    const radians = angle * (Math.PI / 180); // Convert angle to radians


    document.querySelectorAll(".object").forEach(function(move) {
        var moving_value = move.getAttribute("data-value");
        if (moving_value == -3) {
            var x = (e.clientX * moving_value) / 50 * 0.2; 
            var y = (e.clientY * moving_value) / 50 * 0.2; 
            
            
            var rotateX = (e.clientY / window.innerHeight * 2 - 1) * moving_value * 2;
            var rotateY = (e.clientX / window.innerWidth * 2 - 1) * moving_value * 2;
    
            
            var scale = 1 + moving_value / 100 * 0.2; 
    
            
            // var blur = moving_value / 100 * 0.2; 
    
            
            var opacity = 1 - (moving_value / 200 * 0.2); 
    
            move.style.transition = "transform 0.8s ease-out, filter 0.8s ease-out, opacity 0.8s ease-out"; 
    
            
            move.style.transform = `translateX(${x}px) translateY(${y}px) scale(${scale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            move.style.opacity = opacity.toFixed(2);

        } else {
        
        
        
        var x = (e.clientX * moving_value) / 50 * 0.2; 
        var y = (e.clientY * moving_value) / 50 * 0.2; 
        
        
        var scale = 1 + moving_value / 100 * 0.2; 

        
        var blur = moving_value / 100 * 0.2; 

        
        var opacity = 1 - (moving_value / 200 * 0.2); 

        move.style.transition = "transform 0.8s ease-out, filter 0.8s ease-out, opacity 0.8s ease-out"; 

        
        move.style.transform = `translateX(${x}px) translateY(${y}px) scale(${scale})`;
        move.style.filter = `blur(${blur}px)`;
        move.style.opacity = opacity.toFixed(2); 

        }
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
