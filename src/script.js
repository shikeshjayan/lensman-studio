(function () {
  "use strict";

  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", function () {
    navbar.classList.toggle("bg-black/80", window.scrollY > 50);
    navbar.classList.toggle("backdrop-blur", window.scrollY > 50);
  });

  var menuBtn = document.getElementById("menuBtn");
  var mobileMenu = document.getElementById("mobileMenu");
  var mobileLinks = mobileMenu.querySelectorAll("a");

  function toggleMenu() {
    mobileMenu.classList.toggle("hidden");
    mobileMenu.classList.toggle("flex");
  }

  menuBtn.addEventListener("click", toggleMenu);

  mobileLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      mobileMenu.classList.add("hidden");
    });
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) entry.target.classList.add("show");
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll(".motion").forEach(function (el) {
    observer.observe(el);
  });

  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  var lightboxClose = document.getElementById("lightboxClose");

  function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.remove("hidden");
    lightbox.classList.add("flex");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.add("hidden");
    lightbox.classList.remove("flex");
    document.body.style.overflow = "";
  }

  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !lightbox.classList.contains("hidden")) {
      closeLightbox();
    }
  });

  var contactForm = document.getElementById("contactForm");
  var formStatus = document.getElementById("formStatus");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    formStatus.className = "text-sm";
    formStatus.classList.add("hidden");

    var formData = new FormData(contactForm);
    var data = Object.fromEntries(formData);

    if (!data.name || !data.email || !data.message) {
      formStatus.textContent = "Please fill in all required fields.";
      formStatus.className = "text-sm text-red-400";
      formStatus.classList.remove("hidden");
      return;
    }

    var message =
      "*New Inquiry from Website*%0A%0A*Name:* " +
      encodeURIComponent(data.name) +
      "%0A*Email:* " +
      encodeURIComponent(data.email) +
      "%0A*Service:* " +
      encodeURIComponent(data.service || "Not specified") +
      "%0A*Message:* " +
      encodeURIComponent(data.message);

    window.open("https://wa.me/971558390080?text=" + message, "_blank");
    contactForm.reset();

    formStatus.textContent = "Message sent! Check WhatsApp to continue.";
    formStatus.className = "text-sm text-green-400";
    formStatus.classList.remove("hidden");
  });

  var folderView = document.getElementById("folderView");
  var imageView = document.getElementById("imageView");
  var folderGrid = document.getElementById("folderGrid");
  var imageGrid = document.getElementById("imageGrid");
  var backBtn = document.getElementById("backBtn");
  var folderPath = document.getElementById("folderPath");

  var folders = {
    "official-passport": {
      name: "Official & Passport",
      path: "public/Official & Passport",
      files: ["portrait-1.jpg", "portrait-2.jpg", "portrait-3.jpg"],
    },
    family: {
      name: "Family",
      path: "public/Family",
      files: ["family-1.jpg", "family-2.jpg"],
    },
    linkedin: {
      name: "LinkedIn",
      path: "public/LinkedIn",
      files: ["linkedin-1.jpg", "linkedin-2.jpg"],
    },
    "cabin-crew": {
      name: "Cabin Crew",
      path: "public/Cabin Crew",
      files: ["cabin-1.jpg", "cabin-2.jpg"],
    },
  };

  function openFolder(folderKey) {
    var folder = folders[folderKey];
    if (!folder) return;

    imageGrid.innerHTML = "";
    folderPath.innerHTML =
      'Portfolio / <span class="text-white">' + folder.name + "</span>";

    folder.files.forEach(function (file) {
      var src = folder.path + "/" + file;
      var div = document.createElement("div");
      div.className =
        "gallery-item rounded overflow-hidden group relative motion";

      var img = document.createElement("img");
      img.src = src;
      img.alt = folder.name + " photo";
      img.className =
        "gallery-img cursor-pointer object-cover w-full rounded transition-transform duration-500 group-hover:scale-105";
      img.loading = "lazy";

      img.addEventListener("error", function () {
        img.src = "";
        img.alt = "Image failed to load";
        img.className =
          "gallery-img cursor-pointer object-cover w-full rounded min-h-[200px] bg-neutral-800 flex items-center justify-center text-gray-500";
      });

      img.addEventListener("click", function () {
        openLightbox(img.src);
      });

      var overlay = document.createElement("div");
      overlay.className =
        "gallery-overlay absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4";
      var span = document.createElement("span");
      span.className =
        "text-xs font-medium text-amber-400 uppercase tracking-wide";
      span.textContent = folder.name;
      overlay.appendChild(span);

      div.appendChild(img);
      div.appendChild(overlay);
      imageGrid.appendChild(div);
    });

    folderView.classList.add("hidden");
    imageView.classList.remove("hidden");

    document.querySelectorAll("#imageGrid .motion").forEach(function (el) {
      observer.observe(el);
    });
  }

  function closeFolder() {
    imageView.classList.add("hidden");
    folderView.classList.remove("hidden");
  }

  folderGrid.querySelectorAll(".folder-card").forEach(function (card) {
    card.addEventListener("click", function () {
      openFolder(card.dataset.folder);
    });
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openFolder(card.dataset.folder);
      }
    });
  });

  backBtn.addEventListener("click", closeFolder);
})();
