const gallery = document.getElementById("gallery");

const items = [
  { src: "https://via.placeholder.com/150?text=1", type: "image", number: 1 },
  { src: "https://via.placeholder.com/150?text=2", type: "image", number: 2 },
  { src: "https://via.placeholder.com/150?text=3", type: "image", number: 3 },
  { src: "https://via.placeholder.com/150?text=4", type: "image", number: 4 },
  { src: "https://via.placeholder.com/150?text=5", type: "image", number: 5 },
  { src: "https://via.placeholder.com/150?text=6", type: "image", number: 6 },
  { src: "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnh4aGZkOXZocjRiZmU0NWF2bGVsYXIwNGd6NGJ1OHh1cW5tZDgyayZlcD13MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MDJ9IbxxvDUQM/giphy.gif", type: "gif", number: 7 },
  { src: "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnh4aGZkOXZocjRiZmU0NWF2bGVsYXIwNGd6NGJ1OHh1cW5tZDgyayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MDJ9IbxxvDUQM/giphy.gif", type: "gif", number: 8 },
  { src: "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnh4aGZkOXZocjRiZmU0NWF2bGVsYXIwNGd6NGJ1OHh1cW5tZDgyayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MDJ9IbxxvDUQM/giphy.gif", type: "gif", number: 9 },
  { src: "https://via.placeholder.com/150?text=10", type: "image", number: 10 },
  { src: "https://via.placeholder.com/150?text=11", type: "image", number: 11 },
  { src: "https://via.placeholder.com/150?text=12", type: "image", number: 12 },
  { src: "https://via.placeholder.com/150?text=13", type: "image", number: 13 },
];

const usedPositions = [];

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const isOverlap = (newRect, existingRects) => {
  return existingRects.some(rect => (
    !(newRect.right < rect.left || 
      newRect.left > rect.right || 
      newRect.bottom < rect.top || 
      newRect.top > rect.bottom)
  ));
};

const generateRandomPosition = () => {
  let top, left, tileHeight, tileWidth, newRect;
  const centerBuffer = 20; // Center buffer to avoid overlap with heading

  do {
    tileHeight = getRandomInt(10, 20); // Random height between 10vh and 20vh
    tileWidth = getRandomInt(10, 20); // Random width between 10vw and 20vw
    top = getRandomInt(0, 110 - tileHeight);
    left = getRandomInt(0, 110 - tileWidth);
    newRect = {
      top: top,
      left: left,
      bottom: top + tileHeight,
      right: left + tileWidth
    };
  } while (
    isOverlap(newRect, usedPositions) ||
    (newRect.top >= 45 && newRect.bottom <= 55 && newRect.left >= 45 && newRect.right <= 55) // Ensure no overlap with center gap
  );

  usedPositions.push(newRect);

  return { top, left, tileWidth, tileHeight };
};

items.forEach((item) => {
  const tile = document.createElement("div");
  tile.className = "tile";
  
  if (item.type === "image") {
    const img = document.createElement("img");
    img.src = item.src;
    tile.appendChild(img);
  } else if (item.type === "gif") {
    const gif = document.createElement("img");
    gif.src = item.src;
    tile.appendChild(gif);
  }

  const numberDiv = document.createElement("div");
  numberDiv.className = "number";
  numberDiv.textContent = item.number;
  tile.appendChild(numberDiv);

  const { top, left, tileWidth, tileHeight } = generateRandomPosition();

  tile.style.top = `${top}vh`;
  tile.style.left = `${left}vw`;
  tile.style.height = `${tileHeight}vh`;
  tile.style.width = `${tileWidth}vw`;
  gallery.appendChild(tile);
});

// Function to check for touch devices
const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints;
};

if (isTouchDevice()) {
  gallery.classList.add('touch');
} else {
  window.onmousemove = e => {
    const mouseX = e.clientX,
          mouseY = e.clientY;

    const xDecimal = mouseX / window.innerWidth,
          yDecimal = mouseY / window.innerHeight;

    const maxX = gallery.offsetWidth - window.innerWidth,
          maxY = gallery.offsetHeight - window.innerHeight;

    const panX = maxX * xDecimal * -1,
          panY = maxY * yDecimal * -1;

    gallery.animate({
      transform: `translate(${panX}px, ${panY}px)`
    }, {
      duration: 4000,
      fill: "forwards",
      easing: "ease"
    });
  };

  const tiles = document.querySelectorAll(".tile");

  const checkOverflow = () => {
    tiles.forEach(tile => {
      const rect = tile.getBoundingClientRect();
      const inViewport = rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
      tile.style.opacity = inViewport ? 0.6 : 0;
    });
  };

  window.addEventListener('resize', checkOverflow);
  window.addEventListener('scroll', checkOverflow);
  window.addEventListener('mousemove', checkOverflow);

  // Initial check on load
  checkOverflow();
}
