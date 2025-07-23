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
function updateIndicators(activePageId) {
  // Update the navbar indicators based on the active page
  document.querySelectorAll(".navbar").forEach((navbar) => {
    // Select all navbars
    const blueDot = navbar.querySelector(".dot-blue");
    const orangeDot = navbar.querySelector(".dot-orange");
    const greenDot = navbar.querySelector(".dot-green");

    if (!blueDot || !orangeDot || !greenDot) return;

    // Reset all dots to their default positions (or a known state)
    blueDot.style.order = "1";
    orangeDot.style.order = "2";
    greenDot.style.order = "3";
    blueDot.style.marginLeft = "0";
    orangeDot.style.marginLeft = "0";
    greenDot.style.marginLeft = "0";

    if (activePageId == "home") {
      orangeDot.style.marginLeft = "auto";
      greenDot.style.marginLeft = "2rem";
    } else if (activePageId == "about") {
      orangeDot.style.marginLeft = "2rem";
      greenDot.style.marginLeft = "auto";
    } else if (activePageId == "projects") {
      orangeDot.style.marginLeft = "2rem";
      greenDot.style.marginLeft = "2rem";
    }
  });
}
// script to make the pages move the circles that represent them
document.addEventListener("DOMContentLoaded", () => {
  // Initialize the indicators
  const sections = document.querySelectorAll(
    ".pageHome, .pageAbout, .pageProjects"
  );

  const observer = new IntersectionObserver( // Observe sections for visibility changes
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateIndicators(entry.target.id);
        }
      });
    },
    {
      root: null, // viewport
      rootMargin: "0px",
      threshold: 0.5, // 50% visible triggers update
    }
  );
  sections.forEach((section) => observer.observe(section)); // Update the indicators on initial load
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

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const containerTop = scrollContainer.offsetTop;
  const containerHeight = scrollContainer.offsetHeight;
  const scrollDistance = containerHeight - window.innerHeight;

  // only scroll when we're within the container
  if (scrollTop >= containerTop && scrollTop <= containerTop + scrollDistance) {
    const progress = (scrollTop - containerTop) / scrollDistance;
    const maxTranslate = wrapper.scrollWidth - window.innerWidth;
    wrapper.style.transform = `translateX(-${progress * maxTranslate}px)`;
  }
});

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

let currentSlide = 0;
let currentProject = "";

function openModal(project) {
  document.getElementById("myModal").style.display = "block";
  currentProject = project;
  currentSlide = 0;
  updateSlides();
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
  const slides = document.querySelectorAll(".modal-slide");
  slides.forEach((slide) => (slide.style.display = "none"));
}

function updateSlides() {
  const allSlides = document.querySelectorAll(".modal-slide");
  allSlides.forEach((slide) => (slide.style.display = "none"));

  const projectSlides = document.querySelectorAll(
    `.modal-slide.${currentProject}`
  );
  if (projectSlides.length > 0) {
    projectSlides[currentSlide].style.display = "block";
  }
}

function nextSlide() {
  const projectSlides = document.querySelectorAll(
    `.modal-slide.${currentProject}`
  );
  if (currentSlide < projectSlides.length - 1) {
    currentSlide++;
    updateSlides();
  }
}

function prevSlide() {
  if (currentSlide > 0) {
    currentSlide--;
    updateSlides();
  }
}
