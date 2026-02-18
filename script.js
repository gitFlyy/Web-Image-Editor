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

let history = [];
let currentHistoryIndex = -1;

function createState(description) {
    return {
        filterState: { ...filterState },
        rotate: rotate,
        flipHorizontal: flipHorizontal,
        flipVertical: flipVertical,
        description: description
    };
}

function saveState(description) {
    if (currentHistoryIndex < history.length - 1) {
        history = history.slice(0, currentHistoryIndex + 1);
    }
    
    history.push(createState(description));
    currentHistoryIndex = history.length - 1;
    
    updateHistoryUI();
    updateUndoRedoButtons();
}

function restoreState(state) {
    filterState = { ...state.filterState };
    rotate = state.rotate;
    flipHorizontal = state.flipHorizontal;
    flipVertical = state.flipVertical;
    
    valueSlider.value = filterState[currentFilter];
    if (currentFilter === 'blur') {
        value.textContent = filterState[currentFilter] + 'px';
    } else {
        value.textContent = filterState[currentFilter] + '%';
    }
    
    applyFilters();
}

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

let isSliding = false;

valueSlider.addEventListener('input', (e) => {
    const sliderValue = e.target.value;

    if (currentFilter === 'blur') {
        value.textContent = sliderValue + 'px';
    } else {
        value.textContent = sliderValue + '%';
    }

    filterState[currentFilter] = sliderValue;

    applyFilters();
    isSliding = true;
});

valueSlider.addEventListener('change', (e) => {
    if (isSliding) {
        const filterName = currentFilter.charAt(0).toUpperCase() + currentFilter.slice(1);
        const sliderValue = e.target.value;
        const unit = currentFilter === 'blur' ? 'px' : '%';
        saveState(`${filterName}: ${sliderValue}${unit}`);
        isSliding = false;
    }
});

brightnessButton.addEventListener('click', () => {
    currentFilter = 'brightness';
    valueName.textContent = 'Brightness';
    valueSlider.min = '0';
    valueSlider.max = '200';
    valueSlider.value = filterState.brightness;
    value.textContent = filterState.brightness + '%';
    allButtons.forEach(btn => btn.classList.remove('active'));
    brightnessButton.classList.add('active');
});

grayscaleButton.addEventListener('click', () => {
    currentFilter = 'grayscale';
    valueName.textContent = 'Grayscale';
    valueSlider.min = '0';
    valueSlider.max = '100';
    valueSlider.value = filterState.grayscale;
    value.textContent = filterState.grayscale + '%';
    allButtons.forEach(btn => btn.classList.remove('active'));
    grayscaleButton.classList.add('active');
});

inversionButton.addEventListener('click', () => {
    currentFilter = 'inversion';
    valueName.textContent = 'Inversion';
    valueSlider.min = '0';
    valueSlider.max = '100';
    valueSlider.value = filterState.inversion;
    value.textContent = filterState.inversion + '%';
    allButtons.forEach(btn => btn.classList.remove('active'));
    inversionButton.classList.add('active');
});

saturationButton.addEventListener('click', () => {
    currentFilter = 'saturation';
    valueName.textContent = 'Saturation';
    valueSlider.min = '0';
    valueSlider.max = '200';
    valueSlider.value = filterState.saturation;
    value.textContent = filterState.saturation + '%';
    allButtons.forEach(btn => btn.classList.remove('active'));
    saturationButton.classList.add('active');
});

sepiaButton.addEventListener('click', () => {
    currentFilter = 'sepia';
    valueName.textContent = 'Sepia';
    valueSlider.min = '0';
    valueSlider.max = '100';
    valueSlider.value = filterState.sepia;
    value.textContent = filterState.sepia + '%';
    allButtons.forEach(btn => btn.classList.remove('active'));
    sepiaButton.classList.add('active');
});

blurButton.addEventListener('click', () => {
    currentFilter = 'blur';
    valueName.textContent = 'Blur';
    valueSlider.min = '0';
    valueSlider.max = '20';
    valueSlider.value = filterState.blur;
    value.textContent = filterState.blur + 'px';
    allButtons.forEach(btn => btn.classList.remove('active'));
    blurButton.classList.add('active');
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
            filterState = {
                brightness: 100,
                grayscale: 0,
                inversion: 0,
                saturation: 100,
                sepia: 0,
                blur: 0
            };
            rotate = 0;
            flipHorizontal = 1;
            flipVertical = 1;
            
            history = [];
            currentHistoryIndex = -1;
            saveState('Initial State');

            applyFilters();
        };
        reader.readAsDataURL(file);
    }
});

rotateLeftBtn.addEventListener('click', () => {
    rotate -= 90;
    applyFilters();
    saveState('Rotate Left 90°');
});

rotateRightBtn.addEventListener('click', () => {
    rotate += 90; 
    applyFilters();
    saveState('Rotate Right 90°');
});

flipHorizontalBtn.addEventListener('click', () => {
    flipHorizontal *= -1; 
    applyFilters();
    saveState('Flip Horizontal');
});

flipVerticalBtn.addEventListener('click', () => {
    flipVertical *= -1; 
    applyFilters();
    saveState('Flip Vertical');
});

// Undo/Redo functionality
function undo() {
    if (currentHistoryIndex > 0) {
        currentHistoryIndex--;
        restoreState(history[currentHistoryIndex]);
        updateHistoryUI();
        updateUndoRedoButtons();
    }
}

function redo() {
    if (currentHistoryIndex < history.length - 1) {
        currentHistoryIndex++;
        restoreState(history[currentHistoryIndex]);
        updateHistoryUI();
        updateUndoRedoButtons();
    }
}

function updateUndoRedoButtons() {
    const undoBtn = document.getElementById('undoBtn');
    const redoBtn = document.getElementById('redoBtn');
    
    if (undoBtn) {
        undoBtn.disabled = currentHistoryIndex <= 0;
    }
    
    if (redoBtn) {
        redoBtn.disabled = currentHistoryIndex >= history.length - 1;
    }
}

function updateHistoryUI() {
    const historyPanel = document.getElementById('historyPanel');
    if (!historyPanel) return;
    
    historyPanel.innerHTML = '';
    
    history.forEach((state, index) => {
        const historyItem = document.createElement('div');
        historyItem.className = index === currentHistoryIndex 
            ? 'history-item active' 
            : 'history-item';
        
        historyItem.innerHTML = `
            <div class="history-item-title">${state.description}</div>
            <div class="history-item-step">
                Step ${index + 1}
            </div>
        `;
        
        historyItem.addEventListener('click', () => {
            currentHistoryIndex = index;
            restoreState(history[index]);
            updateHistoryUI();
            updateUndoRedoButtons();
        });
        
        historyPanel.appendChild(historyItem);
    });
}

const resetFiltersBtn = document.getElementById('resetFiltersBtn');
if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', () => {
        filterState = {
            brightness: 100,
            grayscale: 0,
            inversion: 0,
            saturation: 100,
            sepia: 0,
            blur: 0
        };
        rotate = 0;
        flipHorizontal = 1;
        flipVertical = 1;

        valueSlider.value = filterState[currentFilter];
        if (currentFilter === 'blur') {
            value.textContent = filterState[currentFilter] + 'px';
        } else {
            value.textContent = filterState[currentFilter] + '%';
        }
        
        applyFilters();
        saveState('Reset All Filters');
    });
}

const saveImageBtn = document.getElementById('saveImageBtn');
if (saveImageBtn) {
    saveImageBtn.addEventListener('click', () => {
        if (displayImage.src && !displayImage.classList.contains('hidden')) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            const img = new Image();
            img.src = displayImage.src;
            
            img.onload = () => {
                const isRotated90or270 = Math.abs(rotate % 180) === 90;
                canvas.width = isRotated90or270 ? img.naturalHeight : img.naturalWidth;
                canvas.height = isRotated90or270 ? img.naturalWidth : img.naturalHeight;
                
                ctx.save();
                
                ctx.translate(canvas.width / 2, canvas.height / 2);

                ctx.rotate((rotate * Math.PI) / 180);
                ctx.scale(flipHorizontal, flipVertical);

                ctx.filter = `
                    brightness(${filterState.brightness}%)
                    grayscale(${filterState.grayscale}%)
                    invert(${filterState.inversion}%)
                    saturate(${filterState.saturation}%)
                    sepia(${filterState.sepia}%)
                    blur(${filterState.blur}px)
                `;

                ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);

                ctx.restore();

                canvas.toBlob((blob) => {
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'edited-image.png';
                    a.click();
                    URL.revokeObjectURL(url);
                });
            };
        } else {
            alert('Please select an image first!');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const undoBtn = document.getElementById('undoBtn');
    const redoBtn = document.getElementById('redoBtn');
    
    if (undoBtn) {
        undoBtn.addEventListener('click', undo);
    }
    
    if (redoBtn) {
        redoBtn.addEventListener('click', redo);
    }
    
    updateUndoRedoButtons();
});
