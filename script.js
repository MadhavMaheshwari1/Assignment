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
  .to(".panels .panel", {
    scaleY: 0,
    duration: 0.3,
    stagger: 0.05,
  })
  .to(".panels", {
    clipPath: "circle(0%)",
    skewX: 0,
    duration: 1,
  })
  .to(
    ".page-main",
    {
      clipPath: "circle(100%)",
      duration: 1,
    },
    "-=0.3"
  );

window.addEventListener("load", function () {
  tl.play();
  tl.eventCallback("onComplete", function () {
    const swiper = new Swiper('.swiper-container-vertical', {
      direction: 'vertical',
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      mousewheel: true, // Allows scrolling with mousewheel
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      speed: 1500, // Adjust this value to make the animation faster
    });
  });
});
