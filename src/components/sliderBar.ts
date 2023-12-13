//--Copyright (c) 2023 Robert A. Howell

const sliderBar = {
  init: () => {
    var divisor = document.getElementById("divisor"),
      slideBar = document.getElementById("slider") as HTMLInputElement | null;
    slideBar.setAttribute("aria-label", "slider");
    slideBar.addEventListener("input", () => sliderBar.moveDivisorBar(divisor, slideBar));
  },
  moveDivisorBar: (divisor: HTMLElement, slideBar: HTMLInputElement) => {
    divisor.style.width = slideBar.value + "%";
  },
};

export default sliderBar;
