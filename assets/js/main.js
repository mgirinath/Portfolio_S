
/*=============== INTRO OVERLAY ===============*/
const introOverlay = document.getElementById("intro-overlay");
if (introOverlay) {
  document.body.classList.add("overflow-hidden");
  setTimeout(() => {
    introOverlay.classList.add("intro__overlay--show");
  }, 1000);

  setTimeout(() => {
    introOverlay.classList.add("intro__overlay--hide");
    document.body.classList.remove("overflow-hidden");
  }, 2800);
}

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
  const header = document.getElementById("header");
  if (this.scrollY >= 50) header.classList.add("scroll-header");
  else header.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*=============== SERVICES MODAL ===============*/
const modalViews = document.querySelectorAll(".services__modal"),
  modalBtns = document.querySelectorAll(".services__button"),
  modalClose = document.querySelectorAll(".services__modal-close");

let modal = function (modalClick) {
  modalViews[modalClick].classList.add("active-modal");
};

modalBtns.forEach((mb, i) => {
  mb.addEventListener("click", () => {
    modal(i);
  });
});

modalClose.forEach((mc) => {
  mc.addEventListener("click", () => {
    modalViews.forEach((mv) => {
      mv.classList.remove("active-modal");
    });
  });
});

/*=============== MIXITUP FILTER PORTFOLIO ===============*/
let mixer = mixitup(".work__container", {
  selectors: {
    target: ".work__card",
  },
  animation: {
    duration: 300,
  },
});

/* Link active work */
const workLinks = document.querySelectorAll(".work__item");

function activeWork(workLink) {
  workLinks.forEach((wl) => {
    wl.classList.remove("active-work");
  });
  workLink.classList.add("active-work");
}

workLinks.forEach((wl) => {
  wl.addEventListener("click", () => {
    activeWork(wl);
  });
});

/*=============== SWIPER TESTIMONIAL / CREDENTIALS ===============*/
let swiperTestimonial = new Swiper(".testimonial__container", {
  slidesPerView: 2,
  spaceBetween: 24,
  loop: false,
  rewind: true,
  grabCursor: true,
  simulateTouch: true,
  allowTouchMove: true,
  speed: 550,
  pagination: {
    el: ".testimonial__pagination",
    clickable: true,
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 48,
    },
  },
});

/* Tap/click the cards to show the next card.
   Pagination dots remain individually clickable for direct slide navigation. */
swiperTestimonial.on("tap", (swiper, event) => {
  if (event?.target?.closest?.(".swiper-pagination-bullet")) return;
  swiperTestimonial.slideNext();
});

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id"),
      navLink = document.querySelector(`.nav__menu a[href*="${sectionId}"]`);

    if (!navLink) return;

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLink.classList.add("active-link");
    } else {
      navLink.classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*=============== LIGHT DARK THEME ===============*/
const themeButton = document.getElementById("theme-button");
const lightTheme = "light-theme";
const iconTheme = "bx-sun";

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () =>
  document.body.classList.contains(lightTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "bx bx-moon" : "bx bx-sun";

if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    lightTheme
  );
  themeButton.classList[selectedIcon === "bx bx-moon" ? "add" : "remove"](
    iconTheme
  );
}

themeButton.addEventListener("click", () => {
  document.body.classList.toggle(lightTheme);
  themeButton.classList.toggle(iconTheme);
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*=============== PROJECT DETAILS MODAL ===============*/
const projectModal = document.getElementById("project-modal");
const projectModalClose = document.getElementById("project-modal-close");
const projectModalTitle = document.getElementById("project-modal-title");
const projectModalDescription = document.getElementById("project-modal-description");

const projectDetails = {
  humidifier: {
    title: "Smart Ambient Humidifier",
    description: "Developed a humidity control system that monitors real-time ambient humidity levels and automatically regulates moisture using sensor feedback. Technologies: ESP32 Microcontroller (Embedded C++) and DHT22 Humidity Sensor.",
  },
  reactor: {
    title: "IoT-Automated Water Treatment Reactor",
    description: "Built a cloud-connected water treatment simulation with automated treating, settling, and skimming phases; synced physical hardware with a real-time web dashboard and automated overcurrent safety interlocks. Technologies: C++ (Arduino), ESP8266 (NodeMCU), Blynk IoT Cloud and Serial Communication.",
  },
};

document.querySelectorAll(".project-info-button").forEach((button) => {
  button.addEventListener("click", () => {
    const details = projectDetails[button.dataset.project];
    if (!details) return;
    projectModalTitle.textContent = details.title;
    projectModalDescription.textContent = details.description;
    projectModal.classList.add("active-modal");
    projectModal.setAttribute("aria-hidden", "false");
  });
});

projectModalClose.addEventListener("click", () => {
  projectModal.classList.remove("active-modal");
  projectModal.setAttribute("aria-hidden", "true");
});

projectModal.addEventListener("click", (event) => {
  if (event.target === projectModal) {
    projectModal.classList.remove("active-modal");
    projectModal.setAttribute("aria-hidden", "true");
  }
});

/*=============== CHATBOX ===============*/
const chatbox = document.getElementById("chatbox");
const chatOpen = document.getElementById("chatbox-open");
const chatClose = document.getElementById("chatbox-close");
const chatForm = document.getElementById("chatbox-form");
const chatInput = document.getElementById("chatbox-input");
const chatMessages = document.getElementById("chatbox-messages");
const quickButtons = document.querySelectorAll(".chatbox__quick button");

const profile = {
  education: "B.E. Electrical & Electronics Engineering at V.S.B Engineering College, Karur, Tamil Nadu (2023–2027), CGPA 8.06/10. HSC: 74.83% from M.S.P. Solai Nadar Memorial Boys HSS, Dindigul.",
  skills: "Java, SQL, AutoCAD, MATLAB/Simulink, VS Code, GitHub, Embedded C++, Arduino IDE, Blynk IoT Cloud, SAP Build (Joule Studio), ESP32 and ESP8266.",
  projects: "Smart Ambient Humidifier using ESP32, Embedded C++ and DHT22; IoT-Automated Water Treatment Reactor using Arduino C++, ESP8266, Blynk IoT Cloud and Serial Communication; and the IEEE-published IoT-Based Grass Cutting Robot.",
  publication: "IoT-Based Grass Cutting Robot, published on IEEE Xplore in 2026 at the International Conference on Innovative Computing (ICSES).",
  internships: "Industrial internships at Tamil Nadu Newsprint and Papers Limited (TNPL), Pugalur, and Poppys Knit Wear Pvt. Ltd., Kangeyam, both in 2025.",
  certifications: "Python Foundation — Infosys Springboard; Introduction to IoT and Digital Transformation — Cisco & NASSCOM; SAP S/4HANA Sales Essentials; Joule Studio in SAP Build; and ServiceNow Agentic AI Executive.",
  achievements: "Cash Prize in SENSONICS 2024 Paper Presentation, Capgemini Brand Quest Campus Ambassador (2024), and NSS Member with college club leadership experience.",
  languages: "Tamil, English and Hindi.",
  interests: "Electric Vehicle technology, Software Development, IoT Application Development and Embedded Systems.",
  contact: "Email: mgirinath05@gmail.com. Phone: +91 81225 20060. LinkedIn: linkedin.com/in/mgirinath05. GitHub: github.com/mgirinath.",
};

function answerQuestion(question) {
  const q = question.toLowerCase().trim();
  if (/\b(hello|hi|hey|vanakkam)\b/.test(q)) return "Hi! Ask me about Girinath's education, skills, projects, internships, certifications, achievements or contact details.";
  if (/about|who is|introduce|profile/.test(q) && !/project/.test(q)) return "Girinath M is an Electrical & Electronics Engineering undergraduate who combines hardware-level systems thinking with software development, IoT and embedded-system skills. He is seeking an entry-level software development role where embedded knowledge and programming ability intersect.";
  if (/education|college|cgpa|degree|hsc|school/.test(q)) return profile.education;
  if (/skill|technology|tech|programming|tool/.test(q)) return profile.skills;
  if (/project|work|built/.test(q)) return profile.projects;
  if (/paper|publication|ieee|grass/.test(q)) return profile.publication;
  if (/intern|experience|tnpl|poppys/.test(q)) return profile.internships;
  if (/certif|course|learning/.test(q)) return profile.certifications;
  if (/achievement|award|prize|ambassador|nss/.test(q)) return profile.achievements;
  if (/language|speak/.test(q)) return `Languages known: ${profile.languages}`;
  if (/interest|ev|electric vehicle/.test(q)) return `Interests: ${profile.interests}`;
  if (/contact|email|phone|linkedin|github|reach/.test(q)) return profile.contact;
  if (/hire|why should|strength|fit|candidate/.test(q)) return "Girinath combines electrical-engineering fundamentals with practical software and IoT experience. His embedded projects, industrial internships, IEEE publication, certifications and cross-domain learning show hands-on problem solving, adaptability and a strong foundation for entry-level software, IoT and engineering-technology roles.";
  return "I can answer questions about Girinath's education, technical skills, projects, IEEE publication, internships, certifications, achievements, interests, languages and contact details.";
}

function toggleChat(open) {
  chatbox.classList.toggle("chatbox--open", open);
  chatbox.setAttribute("aria-hidden", String(!open));
  if (open) setTimeout(() => chatInput.focus(), 150);
}

function addChatMessage(text, type) {
  const message = document.createElement("div");
  message.className = `chatbox__message chatbox__message--${type}`;
  message.textContent = text;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function askChat(question) {
  const text = question.trim();
  if (!text) return;
  addChatMessage(text, "user");
  chatInput.value = "";
  setTimeout(() => addChatMessage(answerQuestion(text), "bot"), 220);
}

chatOpen.addEventListener("click", (event) => {
  event.preventDefault();
  toggleChat(true);
});
chatClose.addEventListener("click", () => toggleChat(false));
chatbox.addEventListener("click", (event) => {
  if (event.target === chatbox) toggleChat(false);
});
chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  askChat(chatInput.value);
});
quickButtons.forEach((button) => {
  button.addEventListener("click", () => askChat(button.dataset.question));
});

/*=============== RESUME PREVIEW MODAL ===============*/
const resumePreviewOpen = document.getElementById("resume-preview-open");
const resumeModal = document.getElementById("resume-modal");
const resumeModalClose = document.getElementById("resume-modal-close");

function toggleResumeModal(open) {
  resumeModal.classList.toggle("resume__modal--open", open);
  resumeModal.setAttribute("aria-hidden", String(!open));
}

resumePreviewOpen.addEventListener("click", () => toggleResumeModal(true));
resumeModalClose.addEventListener("click", () => toggleResumeModal(false));
resumeModal.addEventListener("click", (event) => {
  if (event.target === resumeModal) toggleResumeModal(false);
});

/*=============== CONTACT FORM ===============*/
const contactForm = document.getElementById("contact-form");
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("contact-name").value.trim();
  const mail = document.getElementById("contact-mail").value.trim();
  const message = document.getElementById("contact-message").value.trim();
  const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
  const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${mail}`);
  window.location.href = `mailto:mgirinath05@gmail.com?subject=${subject}&body=${body}`;
});

/* Close overlays with Escape */
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    modalViews.forEach((mv) => mv.classList.remove("active-modal"));
    projectModal.classList.remove("active-modal");
    projectModal.setAttribute("aria-hidden", "true");
    toggleResumeModal(false);
    toggleChat(false);
  }
});

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 400,
  reset: true,
});

sr.reveal(`.nav__menu`, {
  delay: 100,
  scale: 0.1,
  origin: "bottom",
  distance: "300px",
});

sr.reveal(`.home__data`);
sr.reveal(`.home__handle`, { delay: 100 });
sr.reveal(`.home__social, .home__scroll`, { delay: 100, origin: "bottom" });
sr.reveal(`.about__img`, { delay: 100, origin: "left", scale: 0.9, distance: "30px" });
sr.reveal(`.about__data, .about__description, .about__button-contact`, { delay: 100, scale: 0.9, origin: "right", distance: "30px" });
sr.reveal(`.skills__content`, { delay: 100, scale: 0.9, origin: "bottom", distance: "30px" });
sr.reveal(`.services__title, .services__button`, { delay: 100, scale: 0.9, origin: "top", distance: "30px" });
sr.reveal(`.work__card`, { delay: 100, scale: 0.9, origin: "bottom", distance: "30px" });
sr.reveal(`.publication__container`, { delay: 100, scale: 0.9, origin: "bottom", distance: "30px" });
sr.reveal(`.testimonial__container`, { delay: 100, scale: 0.9, origin: "bottom", distance: "30px" });
sr.reveal(`.resume__container`, { delay: 100, scale: 0.9, origin: "bottom", distance: "30px" });
sr.reveal(`.contact__info, .contact__title-info`, { delay: 100, scale: 0.9, origin: "left", distance: "30px" });
sr.reveal(`.contact__form, .contact__title-form`, { delay: 100, scale: 0.9, origin: "right", distance: "30px" });
sr.reveal(`.footer, .footer__container`, { delay: 100, scale: 0.9, origin: "bottom", distance: "30px" });
