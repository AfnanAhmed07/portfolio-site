const overlay = document.querySelector('.nav-overlay');

document.addEventListener("DOMContentLoaded", function(){
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('nav ul');
        const overlay = document.querySelector('.nav-overlay');
        const menuIcon = menuToggle.querySelector('i');

        menuToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            menuIcon.classList.toggle('fa-bars');
            menuIcon.classList.toggle('fa-times');
        });

        overlay.addEventListener('click', function () {
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            menuIcon.classList.add('fa-bars');
            menuIcon.classList.remove('fa-times');
        });
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', function () {
                navMenu.classList.remove('active');
                overlay.classList.remove('active');
                menuIcon.classList.add('fa-bars');
                menuIcon.classList.remove('fa-times');
            });
        });




        const texts =[
            "Fresher Python Developer",
            "Frontend Developer"
        ];
        let textIndex=0;
        let charIndex=0;
        let isDeleting = false;
        let typingDelay=100;

        function type(){
            const currentText = texts[textIndex];
            const typingElement = document.querySelector(".typing-text");

            if(isDeleting){
                typingElement.textContent = currentText.substring(0, charIndex-1);
                charIndex--;
                typingDelay=50;
            } else{
                typingElement.textContent = currentText.substring(0, charIndex+1);
                charIndex++;
                typingDelay=100;
            }

            if(!isDeleting && charIndex===currentText.length){
                isDeleting=true;
                typingDelay=1500;
            }
            else if(isDeleting && charIndex=== 0){
                isDeleting=false;
                textIndex=(textIndex+1) % texts.length;
                typingDelay=500;
            }

            setTimeout(type, typingDelay);
        }

        setTimeout(type, 1000);

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e){
                e.preventDefault();

                const targetID = this.getAttribute('href');
                if(targetID === '#') return;

                const targetElement = document.querySelector(targetID);
                if(targetElement){
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

});

document.addEventListener('DOMContentLoaded', () => {
  const feedbackForm = document.getElementById('feedback-form');
  const statusEl = document.getElementById('feedback-status');

  if (!feedbackForm) return;

  feedbackForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const payload = {
      name: document.getElementById('feedback-name').value,
      rating: document.getElementById('feedback-rating').value,
      comments: document.getElementById('feedback-comments').value.trim()
    };

    if (!payload.rating || !payload.comments) {
      statusEl.textContent = 'Please select a rating and add comments.';
      return;
    }

    statusEl.textContent = 'Sending feedback...';

    try {
      const res = await fetch('http://localhost:5000/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        statusEl.textContent = 'Thanks for your feedback!';
        feedbackForm.reset();
      } else {
        statusEl.textContent = 'Error sending feedback. Please try again.';
      }
    } catch (err) {
      statusEl.textContent = 'Network error. Please try again later.';
    }
  });
});
