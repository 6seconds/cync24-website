// Ensure script runs after DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
    const blob = document.getElementById("blob");
  
    // Check if element with ID "blob" exists
    if (blob) {
      window.onpointermove = event => {
        const { clientX, clientY } = event;
  
        blob.animate(
          {
            left: `${clientX}px`,
            top: `${clientY}px`
          },
          { duration: 3000, fill: "forwards" }
        );
      };
    } else {
      console.error('Element with ID "blob" not found.');
    }
  });
  