document.addEventListener("DOMContentLoaded", function () {
  // Hamburger menü
  const hamburgerMenu = document.getElementById("hamburger-menu");
  const navMenu = document.getElementById("nav-menu");

  if (hamburgerMenu && navMenu) {
    hamburgerMenu.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });

    // Ha rákattintunk egy menüpontra, záródjon be a menü
    navMenu.querySelectorAll("a").forEach((item) => {
      item.addEventListener("click", () => {
        navMenu.classList.remove("active");
      });
    });
  }
});

function animateOnScroll(targetClass, showClass) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(showClass);
          observer.unobserve(entry.target); // csak egyszer animáljuk
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll(`.${targetClass}`).forEach((el) => {
    observer.observe(el);
  });
}

// Alkalmazás különféle animációkra
animateOnScroll("scroll-hidden", "scroll-show");
animateOnScroll("scroll-left", "scroll-left-show");
animateOnScroll("scroll-right", "scroll-right-show");
animateOnScroll("scroll-scale", "scroll-scale-show");
