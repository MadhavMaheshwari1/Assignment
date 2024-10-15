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

window.addEventListener("load", () => {
  tl.play();
  tl.eventCallback("onComplete", () => {
    new Swiper(".swiper-container-vertical", {
      direction: "vertical",
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: { rotate: 50, depth: 100, slideShadows: true },
      mousewheel: true,
      pagination: { el: ".swiper-pagination", clickable: true },
      speed: 1500,
    });
  });
});

document.querySelectorAll(".page-header ul li a").forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = event.target.getAttribute("href").substring(1);
    if (targetId === "about")
      document.getElementById("about").scrollIntoView({ behavior: "smooth" });
  });
});

let currentDisplayedImage = document.getElementById("main-image");

function updateAboutSection(title, description) {
  const aboutTitle = document.getElementById("about-title");
  const descriptionElement = document.getElementById("description");

  aboutTitle.textContent = title || "About Lore Olympus";
  descriptionElement.textContent =
    description ||
    `Dive into the intricate world of "Lore Olympus," where ancient myths collide with modern storytelling, 
  exploring power, love, trauma, and identity in captivating ways. Rachel Smith’s "Lore Olympus" webtoon 
  is a modern retelling of the ancient Greek myth of Hades and Persephone, and it has taken the digital 
  comics world by storm. This article explores the complex world of “Lore Olympus,” providing insights 
  into its characters, major themes, and the impact this beloved series has on readers.`;
}

updateAboutSection(
  null,
  `Dive into the intricate world of "Lore Olympus," where ancient myths collide with modern storytelling, 
  exploring power, love, trauma, and identity in captivating ways. Rachel Smith’s "Lore Olympus" webtoon 
  is a modern retelling of the ancient Greek myth of Hades and Persephone, and it has taken the digital 
  comics world by storm. This article explores the complex world of “Lore Olympus,” providing insights 
  into its characters, major themes, and the impact this beloved series has on readers.`
); // Same as above

document.querySelectorAll(".small-img").forEach((img) => {
  img.addEventListener("click", function () {
    const title = this.getAttribute("data-title");
    const description = this.getAttribute("data-description");
    const largeImage = this.getAttribute("data-large-image");

    document.getElementById("main-image").src = this.src;
    updateAboutSection(title, description);

    if (currentDisplayedImage.src === this.src) return;

    if (currentDisplayedImage) {
      const previousImageElement = document.querySelector(
        `.small-images img[src="${currentDisplayedImage.src}"]`
      );
      if (previousImageElement) previousImageElement.remove();

      if (currentDisplayedImage.src !== this.src) {
        const newMainImage = document.createElement("img");
        newMainImage.classList.add("small-img");
        newMainImage.src = currentDisplayedImage.src;
        newMainImage.alt = currentDisplayedImage.alt;
        newMainImage.setAttribute("data-title", currentDisplayedImage.alt);
        newMainImage.setAttribute("data-description", description);
        newMainImage.setAttribute("data-large-image", largeImage);
        newMainImage.loading = "lazy"; // Add lazy loading

        newMainImage.addEventListener("click", function () {
          this.remove();
          if (currentDisplayedImage.src === this.src) {
            currentDisplayedImage = document.getElementById("main-image");
            updateAboutSection();
          }
        });

        document.querySelector(".small-images").appendChild(newMainImage);
      }
    }

    currentDisplayedImage = this;

    if (!document.querySelector(`.small-images img[src="${this.src}"]`)) {
      const newImage = document.createElement("img");
      newImage.classList.add("small-img");
      newImage.src = this.src;
      newImage.alt = title;
      newImage.setAttribute("data-title", title);
      newImage.setAttribute("data-description", description);
      newImage.setAttribute("data-large-image", largeImage);
      newImage.loading = "lazy"; // Add lazy loading

      newImage.addEventListener("click", function () {
        this.remove();
        if (currentDisplayedImage.src === this.src) {
          currentDisplayedImage = document.getElementById("main-image");
          updateAboutSection();
        }
      });

      document.querySelector(".small-images").appendChild(newImage);
    }
  });
});

const swiper = new Swiper(".carousel", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
});

// Toggle menu navigation
function toggleMenu() {
  const navLinks = document.querySelector(".nav-links");
  const overlay = document.querySelector(".overlay");
  const menuIcon = document.querySelector(".menuIcon");

  const isActive = navLinks.classList.contains("active");
  navLinks.classList.toggle("active", !isActive);
  overlay.classList.toggle("active", !isActive);
  menuIcon.classList.toggle("active", !isActive);
}

document.querySelector(".overlay").addEventListener("click", toggleMenu);

document
  .getElementById("main-about-image")
  .addEventListener("click", function () {
    const descriptionElement = document.getElementById("description");
    descriptionElement.textContent = `Dive into the intricate world of "Lore Olympus," where ancient myths collide with modern storytelling, 
    exploring power, love, trauma, and identity in captivating ways. Rachel Smith’s "Lore Olympus" webtoon 
    is a modern retelling of the ancient Greek myth of Hades and Persephone, and it has taken the digital 
    comics world by storm. This article explores the complex world of “Lore Olympus,” providing insights 
    into its characters, major themes, and the impact this beloved series has on readers.`; // same description
    document.getElementById("about-title").textContent = "About Lore Olympus";
    document.getElementById("main-image").src = "./LoreOlympus.png"; // New image path
  });
