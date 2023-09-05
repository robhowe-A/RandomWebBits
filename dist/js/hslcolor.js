let HSLONE = document.querySelector("#HSLColorONE");
let HSLTWO = document.querySelector("#HSLColorTWO");
let HSLTHREE = document.querySelector("#HSLColorTHREE");

class boxcolor {
    hue = 0;
    saturation = 100;
    lightness = 50;
    constructor(hue = 0, saturation = 100, lightness = 50){
        if(hue == 0){
            this.hue = 0;
        }
        if(hue == 120){
            this.hue = 120
        }
        if(hue == 240){
            this.hue = 240
        }
        this.saturation = saturation;
        this.lightness = lightness;
    }
}
let red = 0;
let green = 120;
let blue = 240;

let HSLBoxColorRed = Object.create(new boxcolor(red, 100, 50));
let HSLBoxColorGreen = Object.create(new boxcolor(green, 100, 50));
let HSLBoxColorBlue = Object.create(new boxcolor(blue, 100, 50));
let toprecthue = document.querySelector('#HSLColorONE span.val1');
let toprectsat = document.querySelector('#HSLColorONE span.val2');
let toprectlight = document.querySelector('#HSLColorONE span.val3');
let midrecthue = document.querySelector('#HSLColorTWO span.val1');
let midrectsat = document.querySelector('#HSLColorTWO span.val2');
let midrectlight = document.querySelector('#HSLColorTWO span.val3');
let botrecthue = document.querySelector('#HSLColorTHREE span.val1');
let botrectsat = document.querySelector('#HSLColorTHREE span.val2');
let botrectlight = document.querySelector('#HSLColorTHREE span.val3');
toprecthue.textContent = HSLBoxColorRed.hue;
toprectsat.textContent = HSLBoxColorRed.saturation;
toprectlight.textContent = HSLBoxColorRed.lightness;
midrecthue.textContent = HSLBoxColorGreen.hue;
midrectsat.textContent = HSLBoxColorGreen.saturation;
midrectlight.textContent = HSLBoxColorGreen.lightness;
botrecthue.textContent = HSLBoxColorBlue.hue;
botrectsat.textContent = HSLBoxColorBlue.saturation;
botrectlight.textContent = HSLBoxColorBlue.lightness;


HSLONE.style.backgroundColor = `hsl(${HSLBoxColorRed.hue}, ${HSLBoxColorRed.saturation}%, ${HSLBoxColorRed.lightness}%)`;
HSLTWO.style.backgroundColor = `hsl(${HSLBoxColorGreen.hue}, ${HSLBoxColorGreen.saturation}%, ${HSLBoxColorGreen.lightness}%)`;
HSLTHREE.style.backgroundColor = `hsl(${HSLBoxColorBlue.hue}, ${HSLBoxColorBlue.saturation}%, ${HSLBoxColorBlue.lightness}%)`;

const HueSldr = document.querySelector(`#Hue`);
const SaturationSldr = document.querySelector(`#Saturation`);
const LightnessSldr = document.querySelector(`#Lightness`);

HueSldr.addEventListener("input", () => {
    let hueinputvalue = HueSldr.value;
    HSLONE.style.backgroundColor = `hsl(${hueinputvalue}, ${HSLBoxColorRed.saturation}%, ${HSLBoxColorRed.lightness}%)`;
    HSLTWO.style.backgroundColor = `hsl(${hueinputvalue}, ${HSLBoxColorGreen.saturation}%, ${HSLBoxColorGreen.lightness}%)`;
    HSLTHREE.style.backgroundColor = `hsl(${hueinputvalue}, ${HSLBoxColorBlue.saturation}%, ${HSLBoxColorBlue.lightness}%)`;
    HSLBoxColorRed.hue = hueinputvalue;
    HSLBoxColorGreen.hue = hueinputvalue;
    HSLBoxColorBlue.hue = hueinputvalue;
    toprecthue.textContent = HSLBoxColorRed.hue;
    midrecthue.textContent = HSLBoxColorGreen.hue;
    botrecthue.textContent = HSLBoxColorBlue.hue;
})

SaturationSldr.addEventListener("input", () => {
    let saturationinputvalue = SaturationSldr.value;
    HSLONE.style.backgroundColor = `hsl(${HSLBoxColorRed.hue}, ${saturationinputvalue}%, ${HSLBoxColorRed.lightness}%)`;
    HSLTWO.style.backgroundColor = `hsl(${HSLBoxColorGreen.hue}, ${saturationinputvalue}%, ${HSLBoxColorGreen.lightness}%)`;
    HSLTHREE.style.backgroundColor = `hsl(${HSLBoxColorBlue.hue}, ${saturationinputvalue}%, ${HSLBoxColorBlue.lightness}%)`;
    HSLBoxColorRed.saturation = saturationinputvalue;
    HSLBoxColorGreen.saturation = saturationinputvalue;
    HSLBoxColorBlue.saturation = saturationinputvalue;
    toprectsat.textContent = HSLBoxColorRed.saturation;
    midrectsat.textContent = HSLBoxColorGreen.saturation;
    botrectsat.textContent = HSLBoxColorBlue.saturation;
})

LightnessSldr.addEventListener("input", () => {
    let lightinputvalue = LightnessSldr.value;
    HSLONE.style.backgroundColor = `hsl(${HSLBoxColorRed.hue}, ${HSLBoxColorRed.saturation}%, ${lightinputvalue}%)`;
    HSLTWO.style.backgroundColor = `hsl(${HSLBoxColorGreen.hue}, ${HSLBoxColorGreen.saturation}%, ${lightinputvalue}%)`;
    HSLTHREE.style.backgroundColor = `hsl(${HSLBoxColorBlue.hue}, ${HSLBoxColorBlue.saturation}%, ${lightinputvalue}%)`;
    HSLBoxColorRed.lightness = lightinputvalue;
    HSLBoxColorGreen.lightness = lightinputvalue;
    HSLBoxColorBlue.lightness = lightinputvalue;
    toprectlight.textContent = HSLBoxColorRed.lightness;
    midrectlight.textContent = HSLBoxColorGreen.lightness;
    botrectlight.textContent = HSLBoxColorBlue.lightness;
})
