/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 


document.addEventListener("DOMContentLoaded", function() {
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      body.classList.toggle("dark-theme");
      if (body.classList.contains("dark-theme")) {
        themeToggle.innerHTML = "<i class='bx bx-sun'></i>";
      } else {
        themeToggle.innerHTML = "<i class='bx bx-moon'></i>";
      }
    });
  }
});

// Carrossel de Skills
document.addEventListener("DOMContentLoaded", function() {
  const track = document.querySelector('.carousel-track');
  const skills = Array.from(track.children);
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  let currentIndex = 0;

  function getVisible() {
    return window.innerWidth <= 500 ? 1 : 3;
  }

  function updateCarousel() {
    const visible = getVisible();
    const skill = skills[0];
    if (!skill) return;
    const style = window.getComputedStyle(skill);
    const skillWidth = skill.offsetWidth + parseInt(style.marginLeft) + parseInt(style.marginRight);

    // Limita o índice para não sumir com as skills
    const maxIndex = Math.max(0, skills.length - visible);
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    if (currentIndex < 0) currentIndex = 0;

    track.style.transform = `translateX(-${currentIndex * skillWidth}px)`;

    // Desabilita botões quando não pode mais ir
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === maxIndex;
  }

  prevBtn.addEventListener('click', () => {
    currentIndex--;
    updateCarousel();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex++;
    updateCarousel();
  });

  window.addEventListener('resize', () => {
    updateCarousel();
  });

  // Garante que o carrossel inicia corretamente após renderização
  setTimeout(updateCarousel, 100);
});

// Carrossel automático de skills (loop infinito real)
document.addEventListener("DOMContentLoaded", function() {
  const track = document.querySelector('.carousel-track-auto');
  if (track) {
    // Duplica as skills para efeito infinito
    track.innerHTML += track.innerHTML;
    const skills = track.children;
    let position = 0;
    const skillWidth = skills[0].offsetWidth + 20; // 20 = margin
    const totalSkills = skills.length / 2;
    let animId = null;

    function animateCarousel() {
      position += 1; // ajuste a velocidade aqui
      if (position >= skillWidth * totalSkills) {
        position = 0;
      }
      track.style.transform = `translateX(-${position}px)`;
      animId = requestAnimationFrame(animateCarousel);
    }

    function startCarousel() {
      if (animId) cancelAnimationFrame(animId);
      animId = requestAnimationFrame(animateCarousel);
    }

    function stopCarousel() {
      if (animId) cancelAnimationFrame(animId);
      animId = null;
    }

    startCarousel();

    // Pausa ao passar o mouse
    track.parentElement.addEventListener('mouseenter', stopCarousel);
    track.parentElement.addEventListener('mouseleave', startCarousel);
  }
});
