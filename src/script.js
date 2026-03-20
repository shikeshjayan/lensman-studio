const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("bg-black/80", window.scrollY > 50);
  navbar.classList.toggle("backdrop-blur", window.scrollY > 50);
});

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const mobileLinks = mobileMenu.querySelectorAll("a");

function toggleMenu() {
  mobileMenu.classList.toggle("hidden");
  mobileMenu.classList.toggle("flex");
}

menuBtn.onclick = toggleMenu;

mobileLinks.forEach((link) => {
  link.onclick = () => mobileMenu.classList.add("hidden");
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".motion").forEach((el) => observer.observe(el));

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");

const openLightbox = (src) => {
  lightboxImg.src = src;
  lightbox.classList.remove("hidden");
  lightbox.classList.add("flex");
  document.body.style.overflow = "hidden";
};

const closeLightbox = () => {
  lightbox.classList.add("hidden");
  lightbox.classList.remove("flex");
  document.body.style.overflow = "";
};

document.querySelectorAll(".gallery-img").forEach((img) => {
  img.onclick = () => openLightbox(img.src);
});

lightboxClose.onclick = closeLightbox;
lightbox.onclick = (e) => {
  if (e.target === lightbox) closeLightbox();
};

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !lightbox.classList.contains("hidden")) {
    closeLightbox();
  }
});

const contactForm = document.getElementById("contactForm");
contactForm.onsubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);
  console.log("Form submitted:", data);
  alert("Thank you! Your message has been sent.");
  contactForm.reset();
};

const filterBtns = document.querySelectorAll(".filter-btn");
const galleryImages = document.querySelectorAll(".gallery-img");

filterBtns.forEach((btn) => {
  btn.onclick = () => {
    filterBtns.forEach((b) => {
      b.classList.remove("bg-amber-400", "text-black");
      b.classList.add("bg-neutral-800", "text-white");
    });
    btn.classList.remove("bg-neutral-800", "text-white");
    btn.classList.add("bg-amber-400", "text-black");

    const filter = btn.dataset.filter;
    galleryImages.forEach((img) => {
      if (filter === "all" || img.dataset.category === filter) {
        img.style.display = "block";
      } else {
        img.style.display = "none";
      }
    });
  };
});