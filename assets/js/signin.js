const inputs = document.querySelectorAll("#email, #password");
const loginButton = document.getElementById("loginButton");
const signupBtn = document.getElementById("signupBtn");
const transition = document.getElementById("transition");
const leftPanel = document.getElementById("leftPanel");

// Kích hoạt nút đăng nhập khi nhập đủ thông tin
inputs.forEach((input) =>
  input.addEventListener("input", () => {
    const filled = [...inputs].every((i) => i.value.trim() !== "");
    loginButton.classList.toggle("active", filled);
  })
);

// Hiệu ứng khi ấn "Đăng ký"
signupBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // 1️⃣ chữ trong khung xanh bay ra trước
  leftPanel.classList.add("move-out");

  // 2️⃣ sau 300ms, nền xanh phủ
  setTimeout(() => {
    transition.classList.add("transition-active");
  }, 300);

  // 3️⃣ sau 900ms, chuyển sang trang signup
  setTimeout(() => {
    location.href = "signup.html?from=signin";
  }, 900);
});

// Khi trở lại từ signup
window.addEventListener("load", () => {
  if (location.search.includes("from=signup")) {
    transition.style.left = "0";
    transition.classList.remove("transition-active");
    transition.style.animation = "slideReset 0.8s forwards ease-in-out";
  }
});
