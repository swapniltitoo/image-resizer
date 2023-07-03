const imageContainer = document.querySelector(".image-container");
const previewImg = document.querySelector(".preview-image");
const file = document.querySelector(".file");
const widthInput = document.querySelector(".width-input");
const heightInput = document.querySelector(".height-input");
const aspectRatio = document.querySelector(".ratio");
const quality = document.querySelector(".quality");
const download = document.querySelector(".download");

let defaultAspectRatio;

const loadFile = (event) => {
    const file = event.target.files[0]; // getting first user selected file
    if(!file) return; // return if user hasn't selected any file
    previewImg.src = URL.createObjectURL(file); // passing selected file url to preview img src
    previewImg.addEventListener("load", () => { // once img loaded
        widthInput.value = previewImg.naturalWidth;
        heightInput.value = previewImg.naturalHeight;
        defaultAspectRatio = previewImg.naturalWidth / previewImg.naturalHeight;
        document.querySelector(".container").classList.add("active");
    });
}

widthInput.addEventListener("keyup", () => {
    // getting height according to the ratio checkbox status
    const height = aspectRatio.checked ? widthInput.value / defaultAspectRatio : heightInput.value;
    heightInput.value = Math.floor(height);
});

heightInput.addEventListener("keyup", () => {
    // getting width according to the ratio checkbox status
    const width = aspectRatio.checked ? heightInput.value * defaultAspectRatio : widthInput.value;
    widthInput.value = Math.floor(width);
});

const resizeAndDownload = () => {
    const canvas = document.createElement("canvas");
    const a = document.createElement("a");
    const ctx = canvas.getContext("2d");

    // if quality checkbox is checked, pass 0.5 to imgQuality else pass 1.0
    // 1.0 is 100% quality where 0.5 is 50% of total. you can pass from 0.1 - 1.0
    var imgQuality = quality.value / 1.0;

    // setting canvas height & width according to the input values
    canvas.width = widthInput.value;
    canvas.height = heightInput.value;

    // drawing user selected image onto the canvas
    ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height);
    
    // passing canvas data url as href value of <a> element
    a.href = canvas.toDataURL("image/jpeg", imgQuality);
    a.download = new Date().getTime(); // passing current time as download value
    a.click(); // clicking <a> element so the file download
}

download.addEventListener("click", resizeAndDownload);
file.addEventListener("change", loadFile);
imageContainer.addEventListener("click", () => file.click());
