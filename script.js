const tl = gsap.timeline({ paused: true });

tl.to(".panels .panel:first-child, .panels .panel:last-child", {
  scaleY: 1,
  duration: 1,
})
  .to(
    ".panels .panel:not(:first-child):not(:last-child)",
    { scaleY: 1 },
    "-=0.5"
  )
  .to(".panels .panel", { scaleY: 0, duration: 0.3, stagger: 0.05 })
  .to(".panels", { clipPath: "circle(0%)", skewX: 0, duration: 1 })
  .to(".page-main", { clipPath: "circle(100%)", duration: 1 }, "-=0.3");

window.addEventListener("load", function () {
  tl.play();
  let currentEffect = "coverflow";

  tl.eventCallback("onComplete", function () {
    new Swiper(".swiper-container-vertical", {
      direction: "vertical",
      effect: currentEffect,
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 50,
        depth: 100,
        slideShadows: true,
      },
      mousewheel: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      speed: 1500,
    });
  });
});

const aboutSection = document.getElementById("about");

document.querySelectorAll(".page-header ul li a").forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = event.target.getAttribute("href").substring(1);
    if (targetId === "about") {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  });
});
// Store the currently displayed image
let currentDisplayedImage = document.getElementById("main-image");

// Function to update the title and description dynamically
function updateAboutSection(title, description) {
  const aboutTitle = document.getElementById("about-title");
  const descriptionElement = document.getElementById("description");

  aboutTitle.textContent = title || "About Lore Olympus"; // Update title
  descriptionElement.textContent =
    description ||
    `
      Dive into the intricate world of "Lore Olympus," where ancient myths collide with modern storytelling, 
      exploring power, love, trauma, and identity in captivating ways. Rachel Smith’s "Lore Olympus" webtoon 
      is a modern retelling of the ancient Greek myth of Hades and Persephone, and it has taken the digital 
      comics world by storm. This article explores the complex world of “Lore Olympus,” providing insights 
      into its characters, major themes, and the impact this beloved series has on readers.
    `; // Update description
}

// Initial setup to set the default title and description
updateAboutSection(
  null,
  `
      Dive into the intricate world of "Lore Olympus," where ancient myths collide with modern storytelling, 
      exploring power, love, trauma, and identity in captivating ways. Rachel Smith’s "Lore Olympus" webtoon 
      is a modern retelling of the ancient Greek myth of Hades and Persephone, and it has taken the digital 
      comics world by storm. This article explores the complex world of “Lore Olympus,” providing insights 
      into its characters, major themes, and the impact this beloved series has on readers.
    `
);

// Add click event listeners to small images
document.querySelectorAll(".small-img").forEach((img) => {
  img.addEventListener("click", function () {
    // Get the data attributes of the clicked image
    const title = this.getAttribute("data-title");
    const description = this.getAttribute("data-description");
    const largeImage = this.getAttribute("data-large-image");

    // Update the main image
    const mainImage = document.getElementById("main-image");
    mainImage.src = this.src;
    mainImage.alt = title; // Update alt text

    // Update the title and description dynamically
    updateAboutSection(title, description);

    // Check if the currently displayed image is the one being clicked
    if (currentDisplayedImage.src === this.src) {
      // If it's the same image, we don't need to do anything further
      return;
    }

    // If another image was displayed, remove it from the list
    if (currentDisplayedImage) {
      const previousImageElement = document.querySelector(
        `.small-images img[src="${currentDisplayedImage.src}"]`
      );
      if (previousImageElement) {
        // Remove the previous displayed image from the list
        previousImageElement.remove();
      }

      // Add the main image back to the list if it's not already present
      const mainImageElement = document.querySelector(
        `.small-images img[src="${mainImage.src}"]`
      );
      if (!mainImageElement && currentDisplayedImage.src !== mainImage.src) {
        // Create and append the main image only if it was the previous displayed image
        const newMainImage = document.createElement("img");
        newMainImage.classList.add("small-img");
        newMainImage.src = currentDisplayedImage.src; // Use the previous displayed image's source
        newMainImage.alt = currentDisplayedImage.alt; // Use the previous displayed image's alt
        newMainImage.setAttribute("data-title", currentDisplayedImage.alt);
        newMainImage.setAttribute("data-description", description);
        newMainImage.setAttribute("data-large-image", largeImage);

        // Add click event to remove the image if clicked again
        newMainImage.addEventListener("click", function () {
          this.remove();
          // Check if the removed image was the current displayed image
          if (currentDisplayedImage.src === this.src) {
            currentDisplayedImage = mainImage; // Reset to the main image if the current one is removed
            updateAboutSection(); // Reset title and description to defaults
          }
        });

        // Append the main image to the small images container
        document.querySelector(".small-images").appendChild(newMainImage);
      }
    }

    // Add the currently clicked image to the displayed image variable
    currentDisplayedImage = this; // Set the new current displayed image

    // Check if the clicked image is already in the list
    const clickedImageElement = document.querySelector(
      `.small-images img[src="${this.src}"]`
    );

    // If the clicked image is not already in the list, add it
    if (!clickedImageElement) {
      const newImage = document.createElement("img");
      newImage.classList.add("small-img");
      newImage.src = this.src;
      newImage.alt = title;
      newImage.setAttribute("data-title", title);
      newImage.setAttribute("data-description", description);
      newImage.setAttribute("data-large-image", largeImage);

      // Add click event to remove the image if clicked again
      newImage.addEventListener("click", function () {
        this.remove();
        // Check if the removed image was the current displayed image
        if (currentDisplayedImage.src === this.src) {
          currentDisplayedImage = mainImage; // Reset to the main image if the current one is removed
          updateAboutSection(); // Reset title and description to defaults
        }
      });

      // Append the new image to the small images container
      document.querySelector(".small-images").appendChild(newImage);
    }
  });
});

const swiper = new Swiper(".carousel", {
  effect: "coverflow", // Enable coverflow effect
  grabCursor: true, // Show grab cursor when hovering over the slides
  centeredSlides: true, // Center the active slide
  slidesPerView: "auto", // Automatically adjust the number of visible slides
  coverflowEffect: {
    rotate: 50, // Rotate effect (angle)
    stretch: 0, // Space between slides
    depth: 100, // Depth effect (distance)
    modifier: 1, // Modifier for adjusting the depth
    slideShadows: true, // Enable shadows for slides
  },
  navigation: {
    nextEl: ".swiper-button-next", // Next button
    prevEl: ".swiper-button-prev", // Previous button
  },
});
