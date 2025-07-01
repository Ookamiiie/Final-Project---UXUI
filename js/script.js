const scrollContainer = document.getElementById("scrollContainer");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

let currentPage = 0;

const scrollToPage = (index) => {
  const pageWidth = window.innerWidth;
  scrollContainer.scrollTo({
    left: pageWidth * index,
    behavior: "smooth",
  });
};

nextBtn.addEventListener("click", () => {
  const totalPages = scrollContainer.children.length;
  if (currentPage < totalPages - 1) {
    currentPage++;
    scrollToPage(currentPage);
  }
});

prevBtn.addEventListener("click", () => {
  if (currentPage > 0) {
    currentPage--;
    scrollToPage(currentPage);
  }
});
