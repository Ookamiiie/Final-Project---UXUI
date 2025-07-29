document.getElementById("year").textContent = new Date().getFullYear(); // Set the current year in the footer

// animation for the buttons on the initial page
const navData = [
  // Define the navigation data
  { label: "Home", target: "#home", color: "#AAB8DB" },
  { label: "About me", target: "#about", color: "#F29B70" },
  { label: "Projects", target: "#projects", color: "#9FC280" },
];

document.addEventListener("DOMContentLoaded", () => {
  // Wait for the DOM to be fully loaded before executing the script
  const nav = document.querySelector(".nav-buttons");

  navData.forEach(({ label, target, color }) => {
    // Iterate over the navData array to create buttons
    const button = document.createElement("button");

    button.className = "btn";
    button.setAttribute("data-target", target);
    button.setAttribute("data-bubble-color", color);
    button.style.setProperty("--bubble-color", color);
    button.innerHTML = `
      ${label}
      <span class="shape">
        ${"<span></span>".repeat(8)}
      </span>
    `;
    nav.appendChild(button);
  });

  // Buttons on the initial page + scroll animation when clicking the buttons
  //Re-bind the click event to the newly created buttons
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const bubbleColor = btn.getAttribute("data-bubble-color");
      btn.style.setProperty("--bubble-color", bubbleColor);

      btn.classList.add("active");
      setTimeout(() => {
        btn.classList.remove("active");
      }, 600);

      const targetSelector = btn.getAttribute("data-target");
      const target = document.querySelector(targetSelector);

      setTimeout(() => {
        if (target) {
          target.scrollIntoView({ behavior: "smooth" }); // This makes the page scroll after clicking a button on the initial page
          updateIndicators(target.id); // Call updateIndicators after scrolling
        }
      }, 500);
    });
  });
});

// Circles on the navbar
// Function to scroll to a specific page
function scrollToPage(pageId) {
  const targetSection = document.getElementById(pageId);
  if (targetSection) {
    targetSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// Function to update indicators based on active page
function updateIndicators(activePageId) {
  // Remove active class from all dots
  document.querySelectorAll(".dot").forEach((dot) => {
    dot.classList.remove("active");
  });

  // Add active class to the corresponding dot
  const activeDot = document.querySelector(`[data-page="${activePageId}"]`);
  if (activeDot) {
    activeDot.classList.add("active");
  }

  // Update the navbar indicators based on the active page
  document.querySelectorAll(".navbar").forEach((navbar) => {
    const blueDot = navbar.querySelector(".dot-blue");
    const orangeDot = navbar.querySelector(".dot-orange");
    const greenDot = navbar.querySelector(".dot-green");

    if (!blueDot || !orangeDot || !greenDot) return;

    // Reset all dots to their default positions
    blueDot.style.order = "1";
    orangeDot.style.order = "2";
    greenDot.style.order = "3";
    blueDot.style.marginLeft = "0";
    orangeDot.style.marginLeft = "0";
    greenDot.style.marginLeft = "0";

    // Apply positioning based on active page
    if (activePageId === "home") {
      orangeDot.style.marginLeft = "auto";
      greenDot.style.marginLeft = "2rem";
    } else if (activePageId === "about") {
      orangeDot.style.marginLeft = "2rem";
      greenDot.style.marginLeft = "auto";
    } else if (activePageId === "projects") {
      orangeDot.style.marginLeft = "2rem";
      greenDot.style.marginLeft = "2rem";
    }
  });
}

// Initialize everything when DOM is loaded
document.querySelectorAll(".dot").forEach((dot) => {
  dot.addEventListener("click", (e) => {
    console.log("Clicked dot:", e.currentTarget);
    const pageId = e.currentTarget.getAttribute("data-page");
    if (pageId) {
      scrollToPage(pageId);
    }
  });

  // Set up intersection observer for automatic indicator updates
  const sections = document.querySelectorAll(
    ".pageHome, .pageAbout, .pageProjects"
  );
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateIndicators(entry.target.id);
        }
      });
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    }
  );

  // Start observing all sections
  sections.forEach((section) => observer.observe(section));

  // Set initial state
  updateIndicators("home");
});

// Button animations on about me page
const iconChar = String.fromCharCode(10549);
class CVButtonController {
  constructor(button) {
    this.button = button;
    this.text = button.querySelector(".btn-text");
    this.icon = button.querySelector(".btn-icon");
    this.animating = false;
    this.thankYou = false;

    this.iconDefault = "⤵"; // copy-paste this exact character from your HTML entity
    this.iconCheck = "✓";

    this.init();
  }

  init() {
    this.button.addEventListener("click", (e) => this.handleClick(e));
    this.button.addEventListener("dblclick", (e) => {
      e.preventDefault();
      this.reset();
    });
    this.button.addEventListener("mousedown", (e) => {
      if (this.animating) e.preventDefault();
    });
  }

  async handleClick(e) {
    if (this.animating || this.thankYou) {
      e.preventDefault();
      return;
    }

    e.preventDefault();
    this.animating = true;
    await this.animateClick();
    this.animating = false;
  }

  async animateClick() {
    this.button.classList.add("clicking-down");
    await this.wait(150);

    await this.wait(200);

    this.button.classList.remove("clicking-down");
    this.button.classList.add("transitioning");

    await this.wait(100);
    this.text.textContent = "Thank you";
    this.icon.textContent = "✓";

    await this.wait(200);
    this.button.classList.remove("transitioning");
    this.button.classList.add("thank-you");

    this.thankYou = true;
  }

  reset() {
    this.button.classList.remove("clicking-down", "transitioning", "thank-you");
    this.text.textContent = "Download my CV";
    this.icon.textContent = this.iconDefault;
    this.animating = false;
    this.thankYou = false;
  }

  wait(ms) {
    return new Promise((res) => setTimeout(res, ms));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const cvButton = document.getElementById("cvButton");
  if (cvButton) window.cvButtonController = new CVButtonController(cvButton);
});

document.getElementById("linkedinButton").addEventListener("click", () => {
  window.open("https://www.linkedin.com/in/jessica-sofia-serra/", "_blank");
});

const scrollContainer = document.querySelector(".scroll-horizontal");
const wrapper = document.querySelector(".element-wrapper");
const pages = document.querySelectorAll(".page");
const totalPages = pages.length;

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const containerTop = scrollContainer.offsetTop;
  const containerHeight = scrollContainer.offsetHeight;
  const scrollDistance = containerHeight - window.innerHeight;

  if (scrollTop >= containerTop && scrollTop <= containerTop + scrollDistance) {
    const progress = (scrollTop - containerTop) / scrollDistance;
    const maxTranslate = wrapper.scrollWidth - window.innerWidth;
    wrapper.style.transform = `translateX(-${progress * maxTranslate}px)`;
  }
});

// Add immediate snapping on scroll end
let scrollEndTimer;
window.addEventListener("scroll", () => {
  clearTimeout(scrollEndTimer);
  scrollEndTimer = setTimeout(() => {
    snapToPage();
  }, 100);
});

function snapToPage() {
  const scrollTop = window.scrollY;
  const containerTop = scrollContainer.offsetTop;
  const containerHeight = scrollContainer.offsetHeight;
  const scrollDistance = containerHeight - window.innerHeight;

  if (scrollTop >= containerTop && scrollTop <= containerTop + scrollDistance) {
    const progress = (scrollTop - containerTop) / scrollDistance;
    const nearestPage = Math.round(progress * (totalPages - 1));
    const targetProgress = nearestPage / (totalPages - 1);
    const targetScroll = containerTop + targetProgress * scrollDistance;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  }
}

function openModal(imageElement) {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalimg");
  const modalDesc = document.getElementById("modaldesc");

  modal.style.display = "flex";
  modalImg.src = imageElement.src;
  modalDesc.textContent = imageElement.getAttribute("data-description") || "";
  // modal.style.backgroundImage = `url(${imageElement.src})`;
  // if I use this, the image selected will become the background of the modal.
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

  modalImg.onmousedown = function (e) {
    if (!isZoomed) return;
    isDragging = true;
    moved = false;
    startX = e.clientX - currentX;
    startY = e.clientY - currentY;
    modalImg.style.cursor = "grabbing";
    e.preventDefault();
  };

  document.onmousemove = function (e) {
    if (!isDragging || !isZoomed) return;
    currentX = e.clientX - startX;
    currentY = e.clientY - startY;
    modalImg.style.left = currentX + "px";
    modalImg.style.top = currentY + "px";
    moved = true;
  };

  document.onmouseup = function () {
    if (isDragging) {
      isDragging = false;
      modalImg.style.cursor = isZoomed ? "grab" : "zoom-in";
    }
  };

  modalImg.onclick = function (e) {
    e.stopPropagation();
    if (moved) {
      moved = false;
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

  document.getElementById("imageModal").addEventListener("click", function (e) {
    if (!modalImg.contains(e.target) && !modalDesc.contains(e.target)) {
      closeModal();
    }
  });
}

function closeModal() {
  document.getElementById("imageModal").style.display = "none";
}

const toggle = document.getElementById("darkModeToggle");
const body = document.body;

// Função para aplicar/remover o dark mode e atualizar o botão
function applyDarkMode(isDarkModeEnabled) {
  if (isDarkModeEnabled) {
    body.classList.add("dark-mode");
    toggle.classList.add("dark-mode-active"); // Aplica o estilo do botão para dark mode
    toggle.textContent = "☀️"; // Sol, para voltar ao light mode
    localStorage.setItem("dark-mode", "enabled");
  } else {
    body.classList.remove("dark-mode");
    toggle.classList.remove("dark-mode-active"); // Remove o estilo do botão de dark mode
    toggle.textContent = "🌙"; // Lua, para ir para o dark mode
    localStorage.setItem("dark-mode", "disabled");
  }
}

// Carrega a preferência salva ou a preferência do sistema
const prefersDarkMode =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;
const savedPreference = localStorage.getItem("dark-mode");

if (savedPreference === "enabled") {
  applyDarkMode(true);
} else if (savedPreference === "disabled") {
  applyDarkMode(false);
} else if (prefersDarkMode) {
  applyDarkMode(true);
} else {
  applyDarkMode(false);
}

function toggleLanguage() {
  // Save scroll position (horizontal and vertical)
  localStorage.setItem("scrollX", window.scrollX);
  localStorage.setItem("scrollY", window.scrollY);

  let path = window.location.pathname;

  if (path.includes("/PT/")) {
    path = path.replace("/PT/", "/EN/");
  } else if (path.includes("/EN/")) {
    path = path.replace("/EN/", "/PT/");
  }

  window.location.pathname = path;
}
