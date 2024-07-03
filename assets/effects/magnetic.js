const $$ = (s, o = document) => o.querySelectorAll(s);

$$('.button').forEach(el => {
  el.addEventListener('mousemove', function(e) {
    const pos = this.getBoundingClientRect();
    const mx = e.clientX - pos.left - pos.width / 2;
    const my = e.clientY - pos.top - pos.height / 2;
    
    this.style.transform = `translate(${mx * 0.15}px, ${my * 0.3}px) rotate3d(${mx * -0.1}, ${my * -0.3}, 0, 12deg)`;
    if (this.children.length > 0) {
      this.children[0].style.transform = `translate(${mx * 0.025}px, ${my * 0.075}px)`;
    }

    document.body.style.backgroundColor = '#000'; // Set background color to black on hover
  });

  el.addEventListener('mouseleave', function() {
    this.style.transform = 'translate3d(0px, 0px, 0px) rotate3d(0, 0, 0, 0deg)';
    if (this.children.length > 0) {
      this.children[0].style.transform = 'translate3d(0px, 0px, 0px)';
    }

    document.body.style.backgroundColor = ''; // Revert background color to default on mouse leave
  });
});
