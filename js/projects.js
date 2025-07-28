document.getElementById("year").textContent = new Date().getFullYear(); // Set the current year in the footer

function openModal(imageSrc) {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalimg");

  modal.style.display = "flex";
  modalImg.src = imageSrc;

  // Reset everything
  modalImg.classList.remove("zoomed");
  modalImg.style.transform = "scale(1)";
  modalImg.style.left = "0px";
  modalImg.style.top = "0px";

  let isZoomed = false;
  let isDragging = false;
  let startX, startY;
  let currentX = 0,
    currentY = 0;
  let moved = false;

  // Mousedown: Start drag
  modalImg.onmousedown = function (e) {
    if (!isZoomed) return;
    isDragging = true;
    moved = false;
    startX = e.clientX - currentX;
    startY = e.clientY - currentY;
    modalImg.style.cursor = "grabbing";
    e.preventDefault();
  };

  // Mousemove: Do drag
  document.onmousemove = function (e) {
    if (!isDragging || !isZoomed) return;
    currentX = e.clientX - startX;
    currentY = e.clientY - startY;
    modalImg.style.left = currentX + "px";
    modalImg.style.top = currentY + "px";
    moved = true;
  };

  // Mouseup: End drag
  document.onmouseup = function () {
    if (isDragging) {
      isDragging = false;
      modalImg.style.cursor = isZoomed ? "grab" : "zoom-in";
    }
  };

  // Click to toggle zoom (only if not dragged)
  modalImg.onclick = function (e) {
    e.stopPropagation(); // prevent closing modal
    if (moved) {
      moved = false; // prevent zoom toggle if dragged
      return;
    }

    isZoomed = !isZoomed;
    if (isZoomed) {
      modalImg.classList.add("zoomed");
      modalImg.style.transform = "scale(2)";
      modalImg.style.cursor = "grab";
    } else {
      modalImg.classList.remove("zoomed");
      modalImg.style.transform = "scale(1)";
      modalImg.style.left = "0px";
      modalImg.style.top = "0px";
      modalImg.style.cursor = "zoom-in";
    }
  };

  // Allow clicking outside image to close modal
  document.getElementById("imageModal").addEventListener("click", function (e) {
    const modalDesign = document.getElementById("modalDesign");
    if (!modalDesign.contains(e.target)) {
      closeModal();
    }
  });
}

function closeModal() {
  const modal = document.getElementById("imageModal");
  const modalDesign = document.getElementById("modalDesign");

  modal.style.display = "none";
  modalDesign.classList.remove("zoomed");
  modalDesign.style.transform = "scale(1)";
  modalDesign.style.left = "0px";
  modalDesign.style.top = "0px";
  modalDesign.style.cursor = "zoom-in";
}

const toggle = document.getElementById("darkModeToggle");

// Load saved preference
if (localStorage.getItem("dark-mode") === "enabled") {
  document.body.classList.add("dark-mode");
  toggle.textContent = "☀️";
}

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    toggle.textContent = "☀️";
    localStorage.setItem("dark-mode", "enabled");
  } else {
    toggle.textContent = "🌙";
    localStorage.setItem("dark-mode", "disabled");
  }
});

const returnButton = document.getElementById("returnButton");

// Helper: checks if user is in a project page
function isProjectPageVisible() {
  return (
    document.querySelector(".proj-ill")?.style.display === "block" ||
    document.querySelector(".proj-design")?.style.display === "block"
  );
}

// Show or hide the return button depending on the visible section
function updateReturnButtonVisibility() {
  if (isProjectPageVisible()) {
    returnButton.style.display = "block";
  } else {
    returnButton.style.display = "none";
  }
}

function scrollToSection() {
  const target = document.querySelector(".proj-design");
  if (target) {
    target.scrollIntoView({ behavior: "smooth" });
  }
}
console.log(scrollToSection);
