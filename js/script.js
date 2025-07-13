document.getElementById("year").textContent = new Date().getFullYear();

const navData = [
  { label: "Home", target: "#home", color: "#F29B70" },
  { label: "About me", target: "#about", color: "#A282C5" },
  { label: "Projects", target: "#projects", color: "#AAB8DB" },
];

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".nav-buttons");

  navData.forEach(({ label, target, color }) => {
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
          target.scrollIntoView({ behavior: "smooth" });
          updateIndicators(target.id); // Call updateIndicators after scrolling
        }
      }, 500);
    });
  });
});

// const scrollContainer = document.querySelector(".scroll-horizontal");

// scrollContainer.addEventListener("wheel", (evt) => {
//   evt.preventDefault();
//   scrollContainer.scrollLeft += evt.deltaY;
// });

function updateIndicators(activePageId) {
  document.querySelectorAll(".navbar").forEach((navbar) => {
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

document.addEventListener("DOMContentLoaded", () => {
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
      root: null, // viewport
      rootMargin: "0px",
      threshold: 0.5, // 50% visible triggers update
    }
  );
  sections.forEach((section) => observer.observe(section)); // Update the indicators on initial load
});
