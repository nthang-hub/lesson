// Số event trên 1 trang
const EVENTS_PER_PAGE = 4;

document.addEventListener("DOMContentLoaded", () => {
  const eventListEl = document.getElementById("eventList");
  const paginationEl = document.getElementById("eventPagination");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const backToTopBtn = document.getElementById("backToTopBtn");

  if (!eventListEl || !paginationEl) return;

  const allCards = Array.from(
    eventListEl.querySelectorAll(".event-card-wrapper")
  );

  let currentPage = 1;
  let currentFilterMode = "all"; // all | online | offline

  function getFilteredCards() {
    if (currentFilterMode === "all") return allCards;
    return allCards.filter(
      (card) => card.dataset.mode === currentFilterMode
    );
  }

  function renderEvents() {
    const filtered = getFilteredCards();
    const totalPages =
      Math.max(1, Math.ceil(filtered.length / EVENTS_PER_PAGE)) || 1;

    if (currentPage > totalPages) currentPage = totalPages;

    // Ẩn tất cả
    allCards.forEach((card) => {
      card.style.display = "none";
    });

    // Xóa thông báo "không có"
    const oldMsg = eventListEl.querySelector("#noEventsMsg");
    if (oldMsg) oldMsg.remove();

    if (filtered.length === 0) {
      const msg = document.createElement("div");
      msg.id = "noEventsMsg";
      msg.className = "col-12 text-center text-muted py-4";
      msg.textContent = "Hiện chưa có sự kiện phù hợp với bộ lọc.";
      eventListEl.appendChild(msg);
      renderPagination(1);
      return;
    }

    const startIndex = (currentPage - 1) * EVENTS_PER_PAGE;
    const endIndex = startIndex + EVENTS_PER_PAGE;

    filtered.slice(startIndex, endIndex).forEach((card) => {
      card.style.display = "block";
    });

    renderPagination(totalPages);
  }

  function renderPagination(totalPages) {
    paginationEl.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
      const li = document.createElement("li");
      li.className = `page-item ${i === currentPage ? "active" : ""}`;

      li.innerHTML = `<button class="page-link" data-page="${i}">${i}</button>`;
      paginationEl.appendChild(li);
    }
  }

  // Filter mode (Tất cả / Online / Offline)
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      currentFilterMode = btn.dataset.filter || "all";
      currentPage = 1;
      renderEvents();
    });
  });

  // Pagination click
  paginationEl.addEventListener("click", (e) => {
    const target = e.target;
    if (!target.classList.contains("page-link")) return;

    const page = Number(target.dataset.page);
    if (!Number.isNaN(page) && page !== currentPage) {
      currentPage = page;
      renderEvents();

      // scroll nhẹ lên phần "Sự kiện nổi bật"
      const highlightEl = document.getElementById("eventsHighlight");
      if (highlightEl) {
        const top =
          highlightEl.getBoundingClientRect().top +
          window.scrollY -
          90;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  });

  // BACK TO TOP
  window.addEventListener("scroll", () => {
    if (!backToTopBtn) return;
    if (window.scrollY > 200) {
      backToTopBtn.style.display = "flex";
    } else {
      backToTopBtn.style.display = "none";
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // HERO TEXT (nếu sau này bạn thêm .hero-title, .hero-desc thì sẽ tự chạy)
  const heroTitles = [
    "Sự kiện nổi bật trong lĩnh vực công nghệ giáo dục",
    "Ưu đãi siêu khủng – săn học bổng khóa học IT",
    "Workshop & Talkshow mỗi tuần cho sinh viên",
  ];

  const heroDesc = [
    "Tham gia ngay các workshop, talkshow, mini game để nhận quà tặng, học bổng và ưu đãi khóa học lên đến 70%.",
    "Đăng ký sớm để nhận voucher, tài liệu PDF và cơ hội tư vấn 1-1 với mentor.",
    "Lịch sự kiện liên tục cập nhật, đa dạng chủ đề: Lập trình, Thiết kế, Kỹ năng mềm, Ngoại ngữ...",
  ];

  const heroTitleEl = document.querySelector(".hero-title");
  const heroDescEl = document.querySelector(".hero-desc");
  let heroIndex = 0;

  function rotateHeroContent() {
    if (!heroTitleEl || !heroDescEl) return;
    heroIndex = (heroIndex + 1) % heroTitles.length;
    heroTitleEl.textContent = heroTitles[heroIndex];
    heroDescEl.textContent = heroDesc[heroIndex];
  }

  setInterval(rotateHeroContent, 5000);

  // LẦN ĐẦU LOAD
  renderEvents();
});
