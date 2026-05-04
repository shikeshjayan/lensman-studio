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
  
  const message = `*New Inquiry from Website*%0A%0A*Name:* ${data.name}%0A*Email:* ${data.email}%0A*Service:* ${data.service}%0A*Message:* ${data.message}`;
  
  window.open(`https://wa.me/971558390080?text=${message}`, "_blank");
  contactForm.reset();
};

const filterBtns = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

filterBtns.forEach((btn) => {
  btn.onclick = () => {
    filterBtns.forEach((b) => {
      b.classList.remove("bg-amber-400", "text-black", "active");
      b.classList.add("bg-neutral-800", "text-white");
    });
    btn.classList.remove("bg-neutral-800", "text-white");
    btn.classList.add("bg-amber-400", "text-black", "active");

    const filter = btn.dataset.filter;
    
    galleryItems.forEach((item) => {
      item.style.opacity = "0";
      item.style.transform = "scale(0.95)";
    });

    setTimeout(() => {
      galleryItems.forEach((item) => {
        const match = filter === "all" || item.dataset.category === filter;
        item.style.display = match ? "block" : "none";
        
        if (match) {
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
          }, 50);
        }
      });
    }, 200);
  };
});

galleryItems.forEach((item) => {
  item.style.transition = "opacity 0.3s ease, transform 0.3s ease";
});
