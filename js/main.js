window.onload = function() {
  initComparisons();
};

let icon = document.getElementsByClassName("icon")[0];
icon.addEventListener('click', responsive_control);

// Toggle responsive navbar
function responsive_control() {
  let x = document.getElementById("myTopnav");

  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Accordion functionality
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;

    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

// Slideshow
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");

  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

// Image comparison slider
function initComparisons() {
  let overlays = document.getElementsByClassName("img-comp-overlay");

  for (let i = 0; i < overlays.length; i++) {
    compareImages(overlays[i]);
  }
}

function compareImages(img) {
  let w = img.offsetWidth;
  let h = img.offsetHeight;

  img.style.width = (w / 2) + "px";

  let slider = document.createElement("DIV");
  slider.setAttribute("class", "img-comp-slider");
  img.parentElement.insertBefore(slider, img);

  slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
  slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";

  let clicked = false;

  slider.addEventListener("mousedown", e => slideReady(e, slider, img, w));
  window.addEventListener("mouseup", slideFinish);
  slider.addEventListener("touchstart", e => slideReady(e, slider, img, w));
  window.addEventListener("touchend", slideFinish);
}

function slideReady(e, slider, img, w) {
  e.preventDefault();
  slider.clicked = true;
  window.addEventListener("mousemove", event => slideMove(event, slider, img, w));
  window.addEventListener("touchmove", event => slideMove(event, slider, img, w));
}

function slideFinish() {
  document.querySelectorAll(".img-comp-slider").forEach(slider => slider.clicked = false);
}

function slideMove(e, slider, img, w) {
  if (!slider.clicked) return;
  let pos = getCursorPos(e, img);

  if (pos < 0) pos = 0;
  if (pos > w) pos = w;

  slide(pos, slider, img);
}

function getCursorPos(e, img) {
  e = (e.changedTouches) ? e.changedTouches[0] : e;
  let rect = img.getBoundingClientRect();
  let x = e.pageX - rect.left - window.pageXOffset;
  return x;
}

function slide(x, slider, img) {
  img.style.width = x + "px";
  slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
}
