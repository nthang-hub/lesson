// ===== LẤY CÁC INPUT CẦN KIỂM TRA =====
const inputs = document.querySelectorAll(
  "#fname, #lname, #birthday, #gender, #email, #message"
);
const sendBtn = document.getElementById("sendBtn");
const transition = document.getElementById("transition");

// ===== BẬT NÚT GỬI KHI ĐIỀN ĐỦ =====
inputs.forEach((input) => {
  input.addEventListener("input", () => {
    const filled = [...inputs].every((i) => i.value.trim() !== "");
    sendBtn.classList.toggle("active", filled);
  });
});

// ===== SỰ KIỆN GỬI FORM =====
document.getElementById("feedbackForm").addEventListener("submit", (e) => {
  e.preventDefault();

  if (!sendBtn.classList.contains("active")) return;

  // Hiệu ứng khi gửi thành công
  transition.classList.add("transition-active");

  setTimeout(() => {
    alert("✅ Cảm ơn bạn đã gửi nhận xét!");
    location.reload();
  }, 900);
});

// ===== RESET HIỆU ỨNG NỀN KHI MỞ LẠI =====
window.addEventListener("load", () => {
  transition.style.right = "0";
  transition.classList.remove("transition-active");
  transition.style.animation = "slideReset 0.8s forwards ease-in-out";
});
