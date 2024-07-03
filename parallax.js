document.addEventListener("mousemove", parallax);

function parallax(e) {
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




