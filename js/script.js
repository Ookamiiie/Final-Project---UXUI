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

const windowWidth = window.innerWidth;
const horizontalLenght = document.querySelector(".element-wrapper").scrollWidth;

const distFromTop = document.querySelector(".scroll-horizontal").offsetTop;

const scrollDistance = distFromTop + horizontalLenght - windowWidth;

document.querySelector(".scroll-horizontal").style.height =
  horizontalLenght + "px";

window.onscroll = function () {
  const scrollTop = window.pageYOffset;

  if (scrollTop >= distFromTop && scrollTop <= scrollDistance) {
    document.querySelector(".element-wrapper").style.transform =
      "translateX(-" + (scrollTop - distFromTop) + "px)";
  }
};
