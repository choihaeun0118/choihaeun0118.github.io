document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     MODAL
     ========================= */

  const slides = document.querySelectorAll(".slide");
  const modals = document.querySelectorAll(".modal");
  const closes = document.querySelectorAll(".close");

  slides.forEach(slide => {
    slide.addEventListener("click", () => {
      const modalId = slide.dataset.modal;
      if (!modalId) return;
      document.getElementById(modalId).style.display = "flex";
    });
  });

  closes.forEach(close => {
    close.addEventListener("click", () => {
      close.closest(".modal").style.display = "none";
    });
  });

  window.addEventListener("click", (e) => {
    modals.forEach(modal => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  });


  /* =========================
     HEADER SCROLL EFFECT
     ========================= */

  const header = document.querySelector(".header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > window.innerHeight - 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });


  /* =========================
     SKILL SCROLL ANIMATION
     ========================= */

  const skillSection = document.querySelector("#skill");
  const skillItems = document.querySelectorAll(".skill-item");

  if (skillSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {

          skillItems.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add("show");
            }, index * 150);
          });

          observer.unobserve(skillSection);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(skillSection);
  }


  /* =========================
     WORK SLIDER (AUTO + BUTTON)
     ========================= */

  const track = document.querySelector(".work-slider-track");
  const slidesAll = document.querySelectorAll(".work-slider-track .slide");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  if (!track || slidesAll.length === 0) return;

  let index = 0;
  let slideWidth = slidesAll[0].offsetWidth + 24;
  let autoSlide;

  function updateWidth() {
    slideWidth = slidesAll[0].offsetWidth + 24;
  }

  window.addEventListener("resize", updateWidth);

  function moveSlide() {
    track.style.transform = `translateX(-${index * slideWidth}px)`;
  }

  function startAutoSlide() {
    autoSlide = setInterval(() => {
      index++;
      if (index > slidesAll.length - 3) {
        index = 0;
      }
      moveSlide();
    }, 2500);
  }

  function stopAutoSlide() {
    clearInterval(autoSlide);
  }

  startAutoSlide();

  nextBtn.addEventListener("click", () => {
    stopAutoSlide();
    index++;
    if (index > slidesAll.length - 3) {
      index = 0;
    }
    moveSlide();
    startAutoSlide();
  });

  prevBtn.addEventListener("click", () => {
    stopAutoSlide();
    index--;
    if (index < 0) {
      index = slidesAll.length - 3;
    }
    moveSlide();
    startAutoSlide();
  });

});


/* =========================
   TOP BUTTON SCROLL
   ========================= */

const topBtn = document.querySelector(".top-btn");

window.addEventListener("scroll", () => {
  const heroHeight = document.querySelector(".hero").offsetHeight;

  if (window.scrollY > heroHeight / 2) {
    topBtn.classList.add("show");
  } else {
    topBtn.classList.remove("show");
  }
});

/* 부드럽게 맨위로 */
topBtn.addEventListener("click", function(e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

/* =========================
   CONTACT SCROLL ANIMATION (Late Trigger)
   ========================= */

const contactSection = document.querySelector(".contact");

const contactObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      contactSection.classList.add("show");
      contactObserver.unobserve(contactSection);
    }
  });
}, { 
  threshold: 0.15,          // 살짝만 보여도 감지
  rootMargin: "0px 0px -35% 0px"  
  // 👆 화면 아래 20% 지점 들어왔을 때 트리거
});

contactObserver.observe(contactSection);



const items = contactSection.querySelectorAll("h2, p");

items.forEach((item, index) => {
  item.style.transitionDelay = `${index * 0.15}s`;
});




/* =========================
   HERO INTRO EFFECT
   ========================= */

const heroSection = document.querySelector(".hero");

window.addEventListener("load", () => {
  setTimeout(() => {
    heroSection.classList.add("show");
  }, 300); // 살짝 여백 후 등장
});



/* =========================
   ABOUT SCROLL EFFECT
   ========================= */

const aboutSection = document.querySelector(".about");
const aboutElements = aboutSection.querySelectorAll(
  ".profile-img, .profile-text h2, .profile-text p"
);

const aboutObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {

      aboutElements.forEach((el, index) => {
        setTimeout(() => {
          el.style.transitionDelay = `${index * 0.15}s`;
          el.style.opacity = "1";
          el.style.transform = "translate(0,0)";
        }, index * 150);
      });

      aboutSection.classList.add("show");
      aboutObserver.unobserve(aboutSection);
    }
  });
}, {
  threshold: 0.35
});

aboutObserver.observe(aboutSection);



/* =========================
   PROJECT SCROLL EFFECT
   ========================= */

const projectSection = document.querySelector(".project");
const projectItems = document.querySelectorAll(".project-item");

const projectObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {

      projectItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.2}s`;
      });

      projectSection.classList.add("show");
      projectObserver.unobserve(projectSection);
    }
  });
}, {
  threshold: 0.3,
  rootMargin: "0px 0px -10% 0px"
});

projectObserver.observe(projectSection);