(() => {
  'use strict'
  const forms = document.querySelectorAll('.needs-validation')
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }
      form.classList.add('was-validated')
    }, false)
  })
})()

// 1. Tax Switch Safety Check
let taxSwitch = document.getElementById("flexSwitchCheckDefault");
if (taxSwitch) { // Only run if the element exists
  taxSwitch.addEventListener("click", () => {
    let taxInfo = document.getElementsByClassName("tax-info");
    for (let info of taxInfo) { // Added 'let' to info for better practice
      if (info.style.display != "inline") {
        info.style.display = "inline";
      } else {
        info.style.display = "none";
      }
    }
  });
}

// 2. Filters Scroll Buttons Safety Check
document.addEventListener("DOMContentLoaded", function () {
  const leftBtn = document.querySelector(".left-btn");
  const rightBtn = document.querySelector(".right-btn");
  const filtersContainer = document.getElementById("filters-container");
  
  // Only run if ALL filter elements are present
  if (leftBtn && rightBtn && filtersContainer) {
    const filterElement = document.querySelector(".filter");
    if (filterElement) {
      const filterWidth = filterElement.offsetWidth + 32;

      leftBtn.addEventListener("click", function () {
        filtersContainer.scrollLeft -= filterWidth;
      });

      rightBtn.addEventListener("click", function () {
        filtersContainer.scrollLeft += filterWidth;
      });
    }
  }
});

// 3. Touch Scroll Safety Check
document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("filters-container");
  
  if (container) { // Only run if container exists
    let startX;
    let scrollLeft;

    container.addEventListener("touchstart", (e) => {
      startX = e.touches[0].pageX;
      scrollLeft = container.scrollLeft;
    });

    container.addEventListener("touchmove", (e) => {
      const x = e.touches[0].pageX;
      const walk = startX - x;
      container.scrollLeft = scrollLeft + walk;
    });
  }
});