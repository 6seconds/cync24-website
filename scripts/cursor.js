const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");
const textContent = document.querySelectorAll("h2, h3, p, .events");

if (cursorDot && cursorOutline && textContent) {
  // Check screen width before adding event listener
  if (window.innerWidth >= 1024) {
    window.addEventListener('mousemove', function (e) {
      const posX = e.clientX;
      const posY = e.clientY;

      cursorDot.style.left = `${posX}px`;
      cursorDot.style.top = `${posY}px`;

      cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
      }, { duration: 250, fill: 'forwards' });

      // Check if the current page is index.html (rest of the code remains the same)
      if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        let isHovering = false;

        textContent.forEach(element => {
          const rect = element.getBoundingClientRect();
          if (posX >= rect.left && posX <= rect.right && posY >= rect.top && posY <= rect.bottom) {
            const elemAtPoint = document.elementFromPoint(posX, posY);

            if (elemAtPoint && element.contains(elemAtPoint)) {
              if (elemAtPoint.nodeType === Node.TEXT_NODE || 
                  (elemAtPoint.nodeType === Node.ELEMENT_NODE && elemAtPoint.textContent.trim())) {
                const range = document.createRange();
                const textNode = Array.from(elemAtPoint.childNodes).find(node => node.nodeType === Node.TEXT_NODE);

                if (textNode) {
                  range.selectNodeContents(textNode);
                  const rects = range.getClientRects();
                  for (const rect of rects) {
                    if (posX >= rect.left && posX <= rect.right && posY >= rect.top && posY <= rect.bottom) {
                      isHovering = true;
                      break;
                    }
                  }
                }
              }
            }
          }
        });

        if (isHovering) {
          cursorDot.classList.add('hover');
          cursorOutline.classList.add('hover');
        } else {
          cursorDot.classList.remove('hover');
          cursorOutline.classList.remove('hover');
        }
      } else {
        cursorDot.classList.remove('hover');
        cursorOutline.classList.remove('hover');
      }
    });
  }
}
