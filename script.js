const valueSlider = document.getElementById('ValueSlider');
const value = document.getElementById('Value');
const valueName = document.getElementById('ValueName');
const brightnessButton = document.getElementById('BrightnessBtn');
const grayscaleButton = document.getElementById('GrayscaleBtn');
const inversionButton = document.getElementById('InversionBtn');
const saturationButton = document.getElementById('SaturationBtn');
const sepiaButton = document.getElementById('SepiaBtn');
const blurButton = document.getElementById('BlurBtn');
const chooseImageBtn = document.getElementById('chooseImageBtn');
const fileInput = document.getElementById('fileInput');
const displayImage = document.getElementById('displayImage');
const placeholderText = document.getElementById('placeholderText');
const rotateLeftBtn = document.getElementById('rotateLeftBtn');
const rotateRightBtn = document.getElementById('rotateRightBtn');
const flipHorizontalBtn = document.getElementById('flipHorizontalBtn');
const flipVerticalBtn = document.getElementById('flipVerticalBtn');

const allButtons = [brightnessButton, grayscaleButton, inversionButton, saturationButton, sepiaButton, blurButton];

let filterState = {
    brightness: 100,
    grayscale: 0,
    inversion: 0,
    saturation: 100,
    sepia: 0,
    blur: 0
};

let currentFilter = 'brightness';

let rotate = 0; // in degrees
let flipHorizontal = 1; // 1 or -1
let flipVertical = 1; // 1 or -1

function applyFilters() {
    const filterString = `
        brightness(${filterState.brightness}%)
        grayscale(${filterState.grayscale}%)
        invert(${filterState.inversion}%)
        saturate(${filterState.saturation}%)
        sepia(${filterState.sepia}%)
        blur(${filterState.blur}px)
    `;
    displayImage.style.filter = filterString;
    
    const transformString = `rotate(${rotate}deg) scaleX(${flipHorizontal}) scaleY(${flipVertical})`;
    displayImage.style.transform = transformString;
}

valueSlider.addEventListener('input', (e) => {
    const sliderValue = e.target.value;

    if (currentFilter === 'blur') {
        value.textContent = sliderValue + 'px';
    } else {
        value.textContent = sliderValue + '%';
    }

    filterState[currentFilter] = sliderValue;

    applyFilters();
});

brightnessButton.addEventListener('click', () => {
    currentFilter = 'brightness';
    valueName.textContent = 'Brightness';
    valueSlider.min = '0';
    valueSlider.max = '200';
    valueSlider.value = filterState.brightness;
    value.textContent = filterState.brightness + '%';
    allButtons.forEach(btn => btn.classList.remove('bg-blue-500', 'text-white'));
    brightnessButton.classList.add('bg-blue-500', 'text-white');
    brightnessButton.classList.remove('hover:bg-blue-50');
});

grayscaleButton.addEventListener('click', () => {
    currentFilter = 'grayscale';
    valueName.textContent = 'Grayscale';
    valueSlider.min = '0';
    valueSlider.max = '100';
    valueSlider.value = filterState.grayscale;
    value.textContent = filterState.grayscale + '%';
    allButtons.forEach(btn => btn.classList.remove('bg-blue-500', 'text-white'));
    grayscaleButton.classList.add('bg-blue-500', 'text-white');
    grayscaleButton.classList.remove('hover:bg-blue-50');
});

inversionButton.addEventListener('click', () => {
    currentFilter = 'inversion';
    valueName.textContent = 'Inversion';
    valueSlider.min = '0';
    valueSlider.max = '100';
    valueSlider.value = filterState.inversion;
    value.textContent = filterState.inversion + '%';
    allButtons.forEach(btn => btn.classList.remove('bg-blue-500', 'text-white'));
    inversionButton.classList.add('bg-blue-500', 'text-white');
    inversionButton.classList.remove('hover:bg-blue-50');
});

saturationButton.addEventListener('click', () => {
    currentFilter = 'saturation';
    valueName.textContent = 'Saturation';
    valueSlider.min = '0';
    valueSlider.max = '200';
    valueSlider.value = filterState.saturation;
    value.textContent = filterState.saturation + '%';
    allButtons.forEach(btn => btn.classList.remove('bg-blue-500', 'text-white'));
    saturationButton.classList.add('bg-blue-500', 'text-white');
    saturationButton.classList.remove('hover:bg-blue-50');
});

sepiaButton.addEventListener('click', () => {
    currentFilter = 'sepia';
    valueName.textContent = 'Sepia';
    valueSlider.min = '0';
    valueSlider.max = '100';
    valueSlider.value = filterState.sepia;
    value.textContent = filterState.sepia + '%';
    allButtons.forEach(btn => btn.classList.remove('bg-blue-500', 'text-white'));
    sepiaButton.classList.add('bg-blue-500', 'text-white');
    sepiaButton.classList.remove('hover:bg-blue-50');
});

blurButton.addEventListener('click', () => {
    currentFilter = 'blur';
    valueName.textContent = 'Blur';
    valueSlider.min = '0';
    valueSlider.max = '20';
    valueSlider.value = filterState.blur;
    value.textContent = filterState.blur + 'px';
    allButtons.forEach(btn => btn.classList.remove('bg-blue-500', 'text-white'));
    blurButton.classList.add('bg-blue-500', 'text-white');
    blurButton.classList.remove('hover:bg-blue-50');
});


chooseImageBtn.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
            displayImage.src = event.target.result;
            displayImage.classList.remove('hidden');
            placeholderText.classList.add('hidden');

            applyFilters();
        };
        reader.readAsDataURL(file);
    }
});

rotateLeftBtn.addEventListener('click', () => {
    rotate -= 90;
    applyFilters();
});

rotateRightBtn.addEventListener('click', () => {
    rotate += 90; 
    applyFilters();
});

flipHorizontalBtn.addEventListener('click', () => {
    flipHorizontal *= -1; 
    applyFilters();
});

flipVerticalBtn.addEventListener('click', () => {
    flipVertical *= -1; 
    applyFilters();
});
