console.log("Header Loaded!");

// Auto đánh dấu menu theo URL
document.querySelectorAll(".nav-link").forEach((link) => {
  if (link.href === window.location.href) {
    link.classList.add("active");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const navCollapse = document.querySelector("#mainNav");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const bsCollapse = new bootstrap.Collapse(navCollapse, { toggle: false });
      bsCollapse.hide();
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const el = document.getElementById("testimonialsCarousel");
  if (el) {
    new bootstrap.Carousel(el, {
      interval: 5000,
      ride: "carousel",
      pause: "hover",
    });
  }
});

// ====== HIỆU ỨNG HIỆN DẦN KHI CUỘN TỚI LỢI ÍCH ======
document.addEventListener("DOMContentLoaded", function () {
  const benefitCards = document.querySelectorAll(".benefit-card");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("benefit-show");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    benefitCards.forEach((card) => {
      card.classList.add("benefit-hidden");
      observer.observe(card);
    });
  }
});
