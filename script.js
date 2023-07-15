const $ = (selector) => document.querySelector(selector);
const $$ = (selectors) => document.querySelectorAll(selectors);

const memeImage = $('#memeImage');
const topText = $('#topText');
const bottomText = $('#bottomText');
const imageInput = $('#imageInput');
const imagePlaceholder = $('#imagePlaceholder');
const downloadButton = $('#downloadButton');
const themeToggle = $('#themeToggle');
const fontSizeInput = $('#fontSizeInput');
const fontFamilySelect = $('#fontFamily');
const memeText = $('#memeText');
const textColorSelect = $('#textColorSelect');

imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
        memeImage.classList.remove("memeImg")
        memeImage.src = reader.result;
        imagePlaceholder.style.display = "none";
        imageInput.style.display = "none";
    };

    if (file) {
        reader.readAsDataURL(file);
    }
});

fontSizeInput.addEventListener('input', () => {
    const fontSize = fontSizeInput.value;
    memeText.style.fontSize = `${fontSize}px`;
});

fontFamilySelect.addEventListener('change', () => {
    const fontFamily = fontFamilySelect.value;
    memeText.style.fontFamily = fontFamily;
});

textColorSelect.addEventListener('change', () => {
    const color = textColorSelect.value;
    topText.style.color = color;
    bottomText.style.color = color;
});

downloadButton.addEventListener('click', () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 100;
    canvas.height = 100;

    context.drawImage(memeImage, 0, 0);

    context.font = `${fontSizeInput.value}px ${fontFamilySelect.value}`;
    context.fillStyle = textColorSelect.value;
    context.textAlign = 'center';
    context.fillText(topText.value.toUpperCase(), canvas.width / 2, 40);

    context.font = `${fontSizeInput.value}px ${fontFamilySelect.value}`;
    context.fillStyle = textColorSelect.value;
    context.textAlign = 'center';
    context.fillText(bottomText.value.toUpperCase(), canvas.width / 2, canvas.height - 20);

    const link = document.createElement('a');
    link.download = 'meme.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
});

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});
