const inputs = document.querySelectorAll("#name, #email, #password");
const registerBtn = document.getElementById("registerBtn");
const loginBtn = document.getElementById("loginBtn");
const transition = document.getElementById("transition");
const rightPanel = document.getElementById("rightPanel");

// Kích hoạt nút khi nhập đủ
inputs.forEach((input) =>
  input.addEventListener("input", () => {
    const filled = [...inputs].every((i) => i.value.trim() !== "");
    registerBtn.classList.toggle("active", filled);
  })
);

// Hiệu ứng khi bấm "Đăng nhập"
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // 1️⃣ chữ trong khung xanh bay ra trước
  rightPanel.classList.add("move-out");

  // 2️⃣ sau 300ms, nền xanh phủ
  setTimeout(() => {
    transition.classList.add("transition-active");
  }, 300);

  // 3️⃣ sau 900ms, chuyển sang trang đăng nhập
  setTimeout(() => {
    location.href = "signin.html?from=signup";
  }, 900);
});

// Reset khi quay về từ trang đăng nhập
window.addEventListener("load", () => {
  if (location.search.includes("from=signin")) {
    transition.style.right = "0";
    transition.classList.remove("transition-active");
    transition.style.animation = "slideReset 0.8s forwards ease-in-out";
  }
});
