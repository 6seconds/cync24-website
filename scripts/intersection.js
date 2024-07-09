const observer = new IntersectionObserver((entries) => {
    entries.forEach( (entry) => {
        console.log(entry);
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});


const elements = document.querySelectorAll(".scaler");
const right = document.querySelectorAll(".rightreveal");
elements.forEach((el) => observer.observe(el));
right.forEach((el) => observer.observe(el));