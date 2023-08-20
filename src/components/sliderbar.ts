//--Copyright (c) 2023 Robert A. Howell

const sliderbar = {
    init: () => {
        var divisor = document.getElementById("divisor"), 
        slideBar = document.getElementById("slider") as HTMLInputElement | null;
        slideBar.setAttribute("aria-label", "slider");
        slideBar.addEventListener('input', () => sliderbar.moveDivisorBar(divisor, slideBar));
    },
    moveDivisorBar: (divisor: HTMLElement, slideBar: HTMLInputElement) => {
        divisor.style.width = slideBar.value + "%";
    }
}

export default sliderbar;