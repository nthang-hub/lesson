// Hiệu ứng hiện dần cho các .about-card và .team-card khi cuộn tới
document.addEventListener("DOMContentLoaded", () => {
  const revealEls = document.querySelectorAll(
    ".about-card, .team-card, .feature-mini"
  );

  if (!("IntersectionObserver" in window)) return;

  revealEls.forEach((el) => {
    el.classList.add("about-hidden");
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("about-show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealEls.forEach((el) => observer.observe(el));
});

// Hiệu ứng fade-in khi cuộn tới section "Tìm hiểu về chúng tôi"
document.addEventListener("DOMContentLoaded", function () {
  const elements = document.querySelectorAll(".fade-in-on-scroll");

  if (!("IntersectionObserver" in window)) {
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  elements.forEach((el) => observer.observe(el));
});
const buttons = document.querySelectorAll(".course-categories button");
const cards = document.querySelectorAll(".course-card-new");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const category = btn.dataset.category;

    // active nút
    buttons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    // lọc card
    cards.forEach((card) => {
      if (category === "all" || card.dataset.category === category) {
        card.classList.remove("hide");
      } else {
        card.classList.add("hide");
      }
    });
  });
});
