document.addEventListener("DOMContentLoaded", () => {
    const blob = document.getElementById("blob");
    const blobForm = document.getElementById("blob-form");
    const cursorDot = document.querySelector("[data-cursor-dot]");
    const steps = document.querySelectorAll('.step');
    const progressBarFill = document.getElementById('progressBarFill');
    let currentStep = 0;
  
    if (blob || blobForm) {
        window.onpointermove = event => {
            const { clientX, clientY } = event;
            
            // Calculate the position to center the blob on the cursor dot
            const blobSize = blob ? blob.offsetWidth : 0;
            const blobFormSize = blobForm ? blobForm.offsetWidth : 0;
  
            const centerX = clientX - (blobSize / 2);
            const centerY = clientY - (blobSize / 2);
            const centerFormX = clientX - (blobFormSize / 2);
            const centerFormY = clientY - (blobFormSize / 2);
  
            if (blob) {
                blob.animate(
                    {
                        left: `${centerX}px`,
                        top: `${centerY}px`
                    },
                    { duration: 1750, fill: "forwards" }
                );
            }
            if (blobForm) {
                blobForm.animate(
                    {
                        left: `${centerFormX}px`,
                        top: `${centerFormY}px`
                    },
                    { duration: 1750, fill: "forwards" }
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
            const height = steps[currentStep].offsetHeight;
            document.querySelector('line').style.height = `${height}px`; 
        }
    }
  
    window.prevStep = function() {
        if (currentStep > 0) {
            steps[currentStep].classList.remove('active');
            currentStep--;
            steps[currentStep].classList.add('active');
            updateProgressBar();
            const height = steps[currentStep].offsetHeight;
            document.querySelector('line').style.height = `${height}px`;
        }
    }
  
    document.getElementById('registrationForm').addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Form submitted!');
    });
  });