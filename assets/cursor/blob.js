document.addEventListener("DOMContentLoaded", () => {
  const blob = document.getElementById("blob");
  const blobForm = document.getElementById("blob-form");
  const steps = document.querySelectorAll('.step');
  const progressBarFill = document.getElementById('progressBarFill');
  let currentStep = 0;

  if (blob || blobForm) {
      window.onpointermove = event => {
          const { clientX, clientY } = event;
          if (blob) {
              blob.animate(
                  {
                      left: `${clientX}px`,
                      top: `${clientY}px`
                  },
                  { duration: 3000, fill: "forwards" }
              );
          }
          if (blobForm) {
              blobForm.animate(
                  {
                      left: `${clientX}px`,
                      top: `${clientY}px`
                  },
                  { duration: 3000, fill: "forwards" }
              );
          }
      };
  } else {
      console.error('Elements with ID "blob" and/or "blob-form" not found.');
  }

  function updateProgressBar() {
      const progress = ((currentStep + 1) / steps.length) * 100;
      progressBarFill.style.width = `${progress}%`;
  }

  window.nextStep = function() {
      if (currentStep < steps.length - 1) {
          steps[currentStep].classList.remove('active');
          currentStep++;
          steps[currentStep].classList.add('active');
          updateProgressBar();
      }
  }

  window.prevStep = function() {
      if (currentStep > 0) {
          steps[currentStep].classList.remove('active');
          currentStep--;
          steps[currentStep].classList.add('active');
          updateProgressBar();
      }
  }

  document.getElementById('registrationForm').addEventListener('submit', function(event) {
      event.preventDefault();
      alert('Form submitted!');
  });
});