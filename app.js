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

const chaosButton = document.querySelector("[data-chaos-mode]");

chaosButton?.addEventListener("click", () => {
  document.body.classList.add("chaos-mode");
  alarmMessage.textContent = "COLLAUDO COMPLETATO: il solaio ora balla techno. Risultato: boh.";

  const emojis = ["🦀", "🏗️", "🧱", "🚧", "📐", "💥"];
  const confetti = Array.from({ length: 36 }, () => {
    const particle = document.createElement("span");
    particle.className = "chaos-confetti";
    particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 35 + 10}%`;
    document.body.append(particle);
    return particle;
  });

  animate(confetti, {
    x: () => (Math.random() - 0.5) * innerWidth,
    y: () => innerHeight * (Math.random() * 0.75 + 0.4),
    rotate: () => Math.random() * 1440 - 720,
    scale: [0, 1.6, 0.4],
    opacity: [0, 1, 0]
  }, { duration: 1.7, easing: "ease-out" });

  animate(".chaos-button", { rotate: [0, -10, 10, -7, 0], scale: [1, 1.25, 1] }, { duration: 0.7 });
  setTimeout(() => {
    document.body.classList.remove("chaos-mode");
    confetti.forEach((particle) => particle.remove());
  }, 3900);
});
