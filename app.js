import { animate, inView, stagger } from "https://cdn.jsdelivr.net/npm/motion@12.23.24/+esm";

const prefersReducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion) {
  animate(
    ".hero-copy > *",
    { opacity: [0, 1], y: [28, 0], rotate: [-1.5, 0] },
    { delay: stagger(0.1), duration: 0.6, easing: "ease-out" }
  );

  inView(".section", (element) => {
    const targets = element.querySelectorAll(".section-head, .card, .work-item, .bars, .site-meter, .testimonial figure, .contact-inner");
    animate(targets, { opacity: [0, 1], y: [42, 0], rotate: [-0.7, 0] }, {
      delay: stagger(0.08),
      duration: 0.55,
      easing: "ease-out"
    });
  }, { amount: 0.2 });
}

const alarmButton = document.querySelector("[data-crab-alarm]");
const alarmMessage = document.querySelector(".alarm-message");
const alarmMessages = [
  "ALLARME: granchio non autorizzato sul solaio.",
  "Livello pericolo: arancione fluo. Casco obbligatorio.",
  "Il geometra è stato avvisato. Ha risposto con un vocale di 8 minuti.",
  "Emergenza rientrata: Michele ha trovato un altro granchio."
];

alarmButton?.addEventListener("click", () => {
  const message = alarmMessages[Math.floor(Math.random() * alarmMessages.length)];
  alarmMessage.textContent = message;
  document.body.classList.add("crab-panic");
  animate(alarmButton, { rotate: [0, -6, 6, -4, 0], scale: [1, 1.08, 1] }, { duration: 0.45 });
  setTimeout(() => document.body.classList.remove("crab-panic"), 900);
});

const recalculateButton = document.querySelector("[data-recalculate]");
const stability = document.querySelector("[data-stability]");

recalculateButton?.addEventListener("click", () => {
  const result = Math.floor(Math.random() * 91) + 10;
  stability.textContent = `${result}%`;
  animate(".meter-dial", { rotate: [0, 360], scale: [1, 1.18, 1] }, { duration: 0.65, easing: "ease-in-out" });
  animate(stability, { scale: [1, 1.3, 1], color: ["#ffd400", "#ff3ec8", "#ffd400"] }, { duration: 0.5 });
});
