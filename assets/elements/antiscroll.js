document.addEventListener('touchmove', function(event) {
    if (event.scale !== 1) { event.preventDefault(); } // Prevent default pinch zooming
}, { passive: false });

document.addEventListener('touchstart', function(event) {
    if (event.touches.length > 1) { event.preventDefault(); } // Prevent multiple touches
}, { passive: false });

window.addEventListener('scroll', function() {
    // Lock the scroll position to the top (0) to prevent horizontal scrolling
    window.scrollTo(0, window.scrollY);
});