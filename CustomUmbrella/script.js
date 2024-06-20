var colorsArr = [
  { imgURL: "./Images/blue_umbrella.png", colorName: "#2eb3e5" },
  { imgURL: "./Images/pink_umbrella.png", colorName: "#d0006f" },
  { imgURL: "./Images/yellow_umbrella.png", colorName: "#fed141" },
];

// Get references to HTML elements
const colorContainer = document.getElementById("colorContainer");
const imageContainer = document.getElementById("imageContainer");
const button = document.getElementById("customizeButton");
const fileInput = document.getElementById("fileInput");
const buttonIcon = document.getElementById("icon");

let selectedImgURL = colorsArr[0].imgURL; // Default selected image URL
let exist_uploding_image = null; // Placeholder for the uploaded image

// Create color circles dynamically based on colorsArr
colorsArr.forEach((colorObj) => {
  const circleDiv = document.createElement("div");
  circleDiv.classList.add("circle");
  circleDiv.style.backgroundColor = colorObj.colorName;
  circleDiv.setAttribute("data-color", colorObj.colorName);
  circleDiv.setAttribute("data-img", colorObj.imgURL);
  colorContainer.appendChild(circleDiv);
});

// Set the default blue umbrella image and button color
const defaultColorObj = colorsArr[0];
imageContainer.innerHTML = `<img src="${defaultColorObj.imgURL}" alt="${defaultColorObj.colorName} umbrella">`;
button.style.backgroundColor = defaultColorObj.colorName;

// Set the default active circle
const circles = document.querySelectorAll(".circle");
circles[0].classList.add("active");
circles[0].style.borderColor = defaultColorObj.colorName;

// Function to create SVG loader with specific color and styling
function createColoredLoader(color, hght, wgth, mrg, lft) {
  return `
    <svg aria-hidden="true" fill="${color}" width="${wgth}" height="${hght}" id="loader" style="margin-top: ${mrg}%;left:${lft}%; margin-right:30px;"
    focusable="false" role="presentation" viewBox="0 0 28.3 31.2" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <path d="M25.1 23.6c-.3.1-.6.2-1 .2-.6.1-1.3 0-2.1.1s-1.7.3-2.6.8c-.8.5-1.4 1.1-1.9 1.6-.7.9-1.1 1.7-1.5 2.2-.2.3-.4.4-.7.6-.2.1-.4.2-.8.2v-13L26 22.9c-.3.3-.6.5-.9.7m-11.3 5.9c-.5-.1-.8-.2-1-.4-.2-.2-.5-.4-.7-.7-.3-.5-.7-1.1-1.2-1.7-.5-.7-1.1-1.3-2.1-1.9-.8-.5-1.6-.7-2.3-.8-1.1-.2-2-.1-2.7-.2l-.9-.3c-.2-.1-.4-.3-.6-.6l11.4-6.6v13.2zM1.7 21.3c0-.3.1-.6.2-1 .2-.5.6-1.1.9-1.9.3-.8.6-1.7.6-2.8v-.1c0-1.5-.6-2.6-1-3.5l-.6-1.2c-.1-.4-.2-.7-.2-1 0-.3.1-.6.2-1l11.4 6.6-11.3 6.8c-.1-.4-.2-.7-.2-.9M3.2 7.6c.3-.1.6-.2 1-.2.6-.1 1.3 0 2.1-.1.7-.2 1.6-.4 2.5-.9.8-.5 1.4-1.1 1.9-1.6.7-.9 1.1-1.7 1.5-2.2.2-.3.4-.4.7-.6.2-.1.5-.2.8-.2V15L2.3 8.3c.3-.4.6-.6.9-.7m11.3-5.9c.5 0 .8.2 1 .4.2.2.5.4.7.7.3.5.7 1.1 1.2 1.7.5.7 1.1 1.3 2.1 1.9.8.5 1.6.7 2.4.8 1.1.1 2 .1 2.7.2l.9.3c.2.1.4.3.6.6l-11.4 6.6V1.7zm12.1 8.2c0 .3-.1.6-.2 1-.2.5-.6 1.1-.9 1.9-.3.8-.6 1.7-.6 2.8v.2c0 1.5.5 2.6 1 3.5l.6 1.2c.1.4.2.7.2 1 0 .3-.1.6-.2.9l-11.4-6.6L26.3 9c.2.4.3.7.3.9m.4 7.8c-.3-.6-.5-1.3-.5-2v-.1c0-1 .4-1.8.8-2.7.2-.4.5-.8.6-1.3.2-.5.3-1 .3-1.6 0-.7-.2-1.4-.6-2.1-.5-.8-1.1-1.4-1.8-1.7-.5-.2-1-.3-1.5-.4-.7-.1-1.4-.1-2.1-.1-.7-.1-1.3-.2-1.9-.6-.6-.3-1-.7-1.4-1.2-.5-.9-.9-1.7-1.6-2.5-.3-.4-.7-.8-1.3-1-.5-.3-1.1-.4-1.9-.4-1 0-1.8.2-2.4.7-.5.3-.8.7-1.1 1.1-.4.6-.7 1.2-1.1 1.7-.4.5-.8 1-1.5 1.4-.6.4-1.2.5-1.8.6-.9.1-1.8 0-2.8.2-.5.1-1 .3-1.5.7-.5.3-.9.8-1.3 1.4C.2 8.5 0 9.3 0 10c0 .6.1 1.1.3 1.6.3.7.7 1.3 1 2 .3.6.5 1.3.5 2.1v.1c0 1.1-.4 1.8-.8 2.7-.2.4-.5.8-.6 1.3-.2.5-.3 1-.3 1.6 0 .7.2 1.4.6 2.1.5.8 1.1 1.4 1.8 1.7.5.2 1 .3 1.5.4.7.1 1.4.1 2.1.1.7.1 1.3.2 2 .6.6.3 1 .7 1.4 1.2.5.7.9 1.5 1.6 2.3.3.4.7.7 1.3 1 .5.3 1.2.4 1.9.4 1 0 1.8-.3 2.4-.7.5-.3.8-.7 1.1-1.1.4-.6.8-1.2 1.2-1.7.4-.5.8-1 1.5-1.4.6-.3 1.1-.5 1.7-.6.9-.1 1.8 0 2.8-.2.5-.1 1-.3 1.5-.6s.9-.8 1.3-1.4c.4-.7.6-1.5.6-2.1 0-.6-.1-1.1-.3-1.6-.5-.9-.8-1.5-1.1-2.1"></path>
    </svg>
  `;
}

//  Handle to change the colors and set the loader
colorContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("circle")) {
    const color = event.target.getAttribute("data-color");
    const imgURL = event.target.getAttribute("data-img");
    selectedImgURL = imgURL;

    // Set loader image
    // imageContainer.innerHTML = `<img src="./Images/loader_icon.svg" alt="Loading..." >`;
    imageContainer.innerHTML = createColoredLoader(color, 55, 50, 25, 40);
    buttonIcon.style.display = "none"; // Hide the upload icon
    button.insertAdjacentHTML("afterbegin",createColoredLoader("#fff", 20, 16, 2.5, 5)); // Insert the loader SVG in the button

    // Change the image and button background color after 3 seconds
    setTimeout(() => {
      button.querySelector("#loader").remove(); // Remove the loader SVG from the button
      buttonIcon.style.display = "block"; // Show the upload icon again
      imageContainer.innerHTML = `<img src="${imgURL}" alt="${color} umbrella">`; // to show umbrella image
      imageContainer.insertAdjacentElement("afterbegin", exist_uploding_image); // to show uploaded image
    }, 3000);

    button.style.backgroundColor = color;

    // Remove active class and border color from all circles
    circles.forEach((circle) => {
      circle.classList.remove("active");
      circle.style.borderColor = "transparent"; // Reset border color
    });

    // Add active class and set border color to the clicked circle
    event.target.classList.add("active");
    event.target.style.borderColor = color;
  }
});

// Trigger file input when button is clicked
button.addEventListener("click", function () {
  fileInput.click();
});

// Handle file input changes (user uploads an image) & Display uploaded image on imageContainer
fileInput.addEventListener("change", function (event) {
  const file = event.target.files[0];
  const maxSize = 5 * 1024 * 1024; // 5MB in bytes
  const validExtensions = ["image/jpeg", "image/png"];

  if (file) {
    if (file.size > maxSize) {
      alert("File size exceeds 5MB. Please upload a smaller file.");
      fileInput.value = ""; // Clear the input
      return;
    }

    if (!validExtensions.includes(file.type)) {
      alert("Invalid file type. Please upload a .png or .jpg file.");
      fileInput.value = ""; // Clear the input
      return;
    }

    // Set loader image
    imageContainer.innerHTML = createColoredLoader(button.style.backgroundColor,55,50,25,40);
    buttonIcon.style.display = "none"; // Hide the upload icon
    button.insertAdjacentHTML("afterbegin",createColoredLoader("#fff", 20, 16, 2.5, 5)); // Insert the loader SVG in the button

    setTimeout(() => {
      const reader = new FileReader();
      reader.onload = function (e) {
        // Remove previous uploaded image if it exists
        const existingUploadedImage = document.getElementById("uploadedImage");
        if (existingUploadedImage) {
          existingUploadedImage.remove();
        }

        // Add new uploaded image
        const img = document.createElement("img");
        img.src = e.target.result;
        img.alt = "Uploaded Image";
        img.id = "uploadedImage";
      
        exist_uploding_image = img; //set uploaded image to exist_uploding_image

        imageContainer.innerHTML = `<img src="${selectedImgURL}" alt="umbrella">`;
        imageContainer.insertAdjacentElement("afterbegin", img); // to show uploaded image

        // Remove loader and show the uploaded image with selected umbrella
        button.querySelector("#loader").remove(); // Remove the loader SVG from the button
        buttonIcon.style.display = "block"; // Show the upload icon again
      };
      reader.readAsDataURL(file);
    }, 3000);
  }
});
