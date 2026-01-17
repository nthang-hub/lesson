/* ============================================
   0. MOBILE NAV (nếu dùng)
============================================ */
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

/* ============================================
   1. HIỆN / ẨN MENU LỌC
============================================ */
const filterBtn = document.getElementById("filterBtn");
const filterMenu = document.getElementById("filterMenu");

if (filterBtn && filterMenu) {
  filterBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    filterMenu.classList.toggle("show");
  });

  document.addEventListener("click", () => {
    filterMenu.classList.remove("show");
  });

  filterMenu.addEventListener("click", (e) => e.stopPropagation());
}

/* ============================================
   2. XEM THÊM – MỖI LẦN HIỆN 4 CARD
============================================ */
function showMore(button) {
  const section = button.closest(".course-section");
  const hidden = section.querySelectorAll(".hidden-course");

  hidden.forEach((card, index) => {
    if (index < 4) card.classList.remove("hidden-course");
  });

  if (section.querySelectorAll(".hidden-course").length === 0) {
    button.style.display = "none";
  }
}

/* ============================================
   3. ĐỌC TRẠNG THÁI BỘ LỌC
   - Tag, Level, Topic, Search, Category
============================================ */
function getFilterState() {
  // search text
  const searchInput = document.querySelector(".search-bar input");
  const searchText = searchInput ? searchInput.value.trim().toLowerCase() : "";

  // checkbox
  const checked = Array.from(
    document.querySelectorAll('.filter-option input[type="checkbox"]:checked')
  );

  const tagValues = [];
  const levelValues = [];
  const topicValues = [];

  const levelList = ["beginner", "intermediate", "advanced", "expert", "all"];
  const topicList = ["web", "frontend", "backend", "design"];

  checked.forEach((cb) => {
    const v = cb.value.toLowerCase();

    if (levelList.includes(v)) {
      levelValues.push(v);
    } else if (topicList.includes(v)) {
      topicValues.push(v);
    } else {
      // còn lại coi là TAG
      tagValues.push(v);
    }
  });

  // category (menu danh mục trên cùng)
  const activeCatBtn = document.querySelector(
    ".course-categories button.active"
  );
  const category = activeCatBtn ? activeCatBtn.dataset.category : "all";

  return {
    searchText,
    tagValues,
    levelValues,
    topicValues,
    category,
  };
}

/* ============================================
   4. ÁP DỤNG BỘ LỌC + SEARCH + DANH MỤC
============================================ */
function applyFilter() {
  const state = getFilterState();
  const sections = document.querySelectorAll(".course-section");
  let totalVisibleCards = 0;

  sections.forEach((section) => {
    const sectionCategory = section.dataset.category || "all";

    // Ẩn/hiện toàn bộ section theo menu danh mục
    if (state.category !== "all" && sectionCategory !== state.category) {
      section.classList.add("hidden-section");
      return;
    } else {
      section.classList.remove("hidden-section");
    }

    const cards = section.querySelectorAll(".course-card-new");

    cards.forEach((card) => {
      const title = (card.querySelector("h3")?.innerText || "").toLowerCase();
      const tagsStr = (card.dataset.tags || "").toLowerCase();
      const level = (card.dataset.level || "").toLowerCase();
      const topic = (card.dataset.topic || "").toLowerCase();

      // --- SEARCH theo tiêu đề + tags ---
      if (state.searchText) {
        const inTitle = title.includes(state.searchText);
        const inTags = tagsStr.includes(state.searchText);
        if (!inTitle && !inTags) {
          card.classList.add("hide");
          return;
        }
      }

      // --- TAG: OR trong nhóm, AND với nhóm khác ---
      const matchTag =
        state.tagValues.length === 0 ||
        state.tagValues.some((t) => tagsStr.includes(t));

      // level: card có level = "all" thì luôn match
      const matchLevel =
        state.levelValues.length === 0 ||
        level === "all" ||
        state.levelValues.includes(level);

      const matchTopic =
        state.topicValues.length === 0 || state.topicValues.includes(topic);

      if (matchTag && matchLevel && matchTopic) {
        card.classList.remove("hide");
        totalVisibleCards++;
      } else {
        card.classList.add("hide");
      }
    });
  });

  handleNoResult(totalVisibleCards);
}

/* ============================================
   5. THÔNG BÁO "KHÔNG CÓ KẾT QUẢ"
============================================ */
function handleNoResult(count) {
  let noResult = document.getElementById("no-result-global");

  if (!noResult) {
    noResult = document.createElement("div");
    noResult.id = "no-result-global";
    noResult.style.textAlign = "center";
    noResult.style.padding = "40px 20px";
    noResult.style.fontSize = "18px";
    noResult.style.color = "#666";
    noResult.innerText = "Không tìm thấy khóa học phù hợp.";

    const lastSection = document.querySelector(".course-section:last-of-type");
    if (lastSection) {
      lastSection.insertAdjacentElement("afterend", noResult);
    } else {
      document.body.appendChild(noResult);
    }
  }

  noResult.style.display = count === 0 ? "block" : "none";
}

/* ============================================
   6. NÚT "LỌC" & "LÀM MỚI"
============================================ */
document.querySelector(".btn-filter")?.addEventListener("click", () => {
  applyFilter();
  filterMenu?.classList.remove("show");
});

document.querySelector(".btn-reset")?.addEventListener("click", () => {
  // bỏ chọn checkbox
  document
    .querySelectorAll('.filter-option input[type="checkbox"]')
    .forEach((cb) => (cb.checked = false));

  // xóa search
  const searchInput = document.querySelector(".search-bar input");
  if (searchInput) searchInput.value = "";

  // hiện lại tất cả card
  document.querySelectorAll(".course-card-new").forEach((card) => {
    card.classList.remove("hide");
  });

  // ẩn thông báo
  const noResult = document.getElementById("no-result-global");
  if (noResult) noResult.style.display = "none";

  filterMenu?.classList.remove("show");
});

/* ============================================
   7. SEARCH REALTIME
============================================ */
document
  .querySelector(".search-bar input")
  ?.addEventListener("input", applyFilter);

/* ============================================
   8. MENU DANH MỤC (CATEGORY TABS)
============================================ */
const categoryButtons = document.querySelectorAll(".course-categories button");

categoryButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    categoryButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    applyFilter();
  });
});

// chạy 1 lần lúc load
applyFilter();
