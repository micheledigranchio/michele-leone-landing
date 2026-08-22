import { animate, inView, stagger } from "https://cdn.jsdelivr.net/npm/motion@12.23.24/+esm";

const prefersReducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

const emojiLayer = document.querySelector(".ambient-emoji");
const ambientEmojis = ["🦀", "🏗️", "🧱", "🚧", "📐", "🪜", "💥", "🍺", "🦺", "⚠️"];

if (emojiLayer) {
  Array.from({ length: 28 }, (_, index) => {
    const emoji = document.createElement("span");
    emoji.textContent = ambientEmojis[index % ambientEmojis.length];
    emoji.style.left = `${(index * 17 + 4) % 100}%`;
    emoji.style.top = `${(index * 29 + 7) % 94}%`;
    emoji.style.setProperty("--size", `${18 + (index % 5) * 8}px`);
    emoji.style.setProperty("--speed", `${2.4 + (index % 7) * 0.52}s`);
    emoji.style.setProperty("--delay", `${-(index % 6) * 0.7}s`);
    emoji.style.setProperty("--drift-x", `${-70 + (index % 8) * 20}px`);
    emoji.style.setProperty("--drift-y", `${-55 + (index % 6) * 24}px`);
    emojiLayer.append(emoji);
    return emoji;
  });

  setInterval(() => {
    const spark = document.createElement("span");
    spark.className = "chaos-confetti";
    spark.textContent = ambientEmojis[Math.floor(Math.random() * ambientEmojis.length)];
    spark.style.left = `${Math.random() * 92 + 4}%`;
    spark.style.top = `${Math.random() * 82 + 8}%`;
    document.body.append(spark);
    animate(spark, {
      y: [0, -100, 220],
      x: [0, (Math.random() - 0.5) * 180],
      rotate: [0, 1080],
      scale: [0, 1.8, 0],
      opacity: [0, 1, 0]
    }, { duration: 1.5, easing: "ease-in-out" });
    setTimeout(() => spark.remove(), 1600);
  }, 900);
}

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

const gameCanvas = document.querySelector(".ostrich-game");
const gameStart = document.querySelector("[data-game-start]");
const gameScore = document.querySelector("[data-game-score]");
const gameTime = document.querySelector("[data-game-time]");
const gameStatus = document.querySelector("[data-game-status]");

if (gameCanvas) {
  const context = gameCanvas.getContext("2d");
  const world = { width: gameCanvas.width, height: gameCanvas.height };
  const keys = new Set();
  let running = false;
  let score = 0;
  let timeLeft = 30;
  let lastTime = performance.now();
  let lastSecond = performance.now();
  let player;
  let helmets;
  let ostriches;

  const randomPoint = (padding = 50) => ({
    x: padding + Math.random() * (world.width - padding * 2),
    y: padding + Math.random() * (world.height - padding * 2)
  });

  const resetGame = () => {
    player = { x: 110, y: world.height / 2, radius: 20, speed: 240, heading: 0 };
    helmets = Array.from({ length: 8 }, () => ({ ...randomPoint(74), collected: false, bob: Math.random() * Math.PI * 2 }));
    ostriches = Array.from({ length: 5 }, (_, index) => ({ ...randomPoint(80), direction: Math.random() * Math.PI * 2, speed: 46 + index * 9, phase: index }));
    score = 0;
    timeLeft = 30;
    gameScore.textContent = score;
    gameTime.textContent = timeLeft;
  };

  const drawPlayer = () => {
    context.save();
    context.translate(player.x, player.y);
    context.rotate(player.heading);
    context.font = "40px sans-serif";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText("🦀", 0, -13);
    context.font = "30px sans-serif";
    context.fillText("👷", 0, 14);
    context.restore();
  };

  const drawOstrich = (ostrich, elapsed) => {
    context.save();
    context.translate(ostrich.x, ostrich.y + Math.sin(elapsed / 150 + ostrich.phase) * 4);
    context.scale(Math.cos(ostrich.direction) >= 0 ? 1 : -1, 1);
    context.font = "42px sans-serif";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText("🪿", 0, 0);
    context.restore();
  };

  const draw = (elapsed) => {
    const sky = context.createLinearGradient(0, 0, 0, world.height);
    sky.addColorStop(0, "#41d9ff");
    sky.addColorStop(0.45, "#ffbe57");
    sky.addColorStop(0.46, "#e18b35");
    sky.addColorStop(1, "#bd5727");
    context.fillStyle = sky;
    context.fillRect(0, 0, world.width, world.height);

    context.font = "82px sans-serif";
    context.fillText("🏗️", 70, 90);
    context.fillText("🏗️", 710, 100);

    context.fillStyle = "rgba(255, 212, 0, 0.88)";
    for (let x = -40; x < world.width + 80; x += 95) {
      context.fillRect(x, world.height - 42, 55, 12);
    }

    helmets.filter((helmet) => !helmet.collected).forEach((helmet) => {
      context.save();
      context.translate(helmet.x, helmet.y + Math.sin(elapsed / 220 + helmet.bob) * 7);
      context.font = "30px sans-serif";
      context.textAlign = "center";
      context.fillText("⛑️", 0, 0);
      context.restore();
    });
    ostriches.forEach((ostrich) => drawOstrich(ostrich, elapsed));
    drawPlayer();
  };

  const update = (delta) => {
    if (!running) return;
    let moveX = 0;
    let moveY = 0;
    if (keys.has("ArrowUp") || keys.has("w")) moveY -= 1;
    if (keys.has("ArrowDown") || keys.has("s")) moveY += 1;
    if (keys.has("ArrowLeft") || keys.has("a")) moveX -= 1;
    if (keys.has("ArrowRight") || keys.has("d")) moveX += 1;
    if (moveX || moveY) {
      const magnitude = Math.hypot(moveX, moveY);
      player.x += moveX / magnitude * player.speed * delta;
      player.y += moveY / magnitude * player.speed * delta;
      player.heading = Math.atan2(moveY, moveX);
    }
    player.x = Math.max(25, Math.min(world.width - 25, player.x));
    player.y = Math.max(35, Math.min(world.height - 25, player.y));

    ostriches.forEach((ostrich) => {
      if (Math.random() < 0.018) ostrich.direction += (Math.random() - 0.5) * 1.8;
      ostrich.x += Math.cos(ostrich.direction) * ostrich.speed * delta;
      ostrich.y += Math.sin(ostrich.direction) * ostrich.speed * delta;
      if (ostrich.x < 20 || ostrich.x > world.width - 20) ostrich.direction = Math.PI - ostrich.direction;
      if (ostrich.y < 30 || ostrich.y > world.height - 24) ostrich.direction = -ostrich.direction;
    });

    helmets.forEach((helmet) => {
      if (!helmet.collected && Math.hypot(player.x - helmet.x, player.y - helmet.y) < 32) {
        helmet.collected = true;
        score += 1;
        gameScore.textContent = score;
        gameStatus.textContent = `Casco recuperato. Michele esulta: ${score}/8.`;
      }
    });
    if (score === helmets.length) {
      running = false;
      gameStatus.textContent = "VITTORIA! Gli struzzi applaudono e Michele riceve un casco nuovo.";
      gameStart.textContent = "Rigioca 🦀";
    }
  };

  const gameLoop = (now) => {
    const delta = Math.min((now - lastTime) / 1000, 0.04);
    lastTime = now;
    if (running && now - lastSecond >= 1000) {
      timeLeft -= 1;
      lastSecond = now;
      gameTime.textContent = timeLeft;
      if (timeLeft <= 0) {
        running = false;
        gameStatus.textContent = `Tempo finito: ${score}/8 caschi. Gli struzzi vincono una pizza.`;
        gameStart.textContent = "Riprova 🦀";
      }
    }
    update(delta);
    draw(now);
    requestAnimationFrame(gameLoop);
  };

  const startGame = () => {
    resetGame();
    running = true;
    lastSecond = performance.now();
    gameStatus.textContent = "VAI! Michele corre. Gli struzzi fanno finta di non guardarlo.";
    gameStart.textContent = "Ricomincia 🦀";
  };

  addEventListener("keydown", (event) => {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "a", "s", "d"].includes(event.key)) {
      keys.add(event.key);
      event.preventDefault();
    }
  });
  addEventListener("keyup", (event) => keys.delete(event.key));
  document.querySelectorAll("[data-game-move]").forEach((button) => {
    const keyMap = { up: "ArrowUp", down: "ArrowDown", left: "ArrowLeft", right: "ArrowRight" };
    const key = keyMap[button.dataset.gameMove];
    button.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      keys.add(key);
    });
    ["pointerup", "pointerleave", "pointercancel"].forEach((eventName) => button.addEventListener(eventName, () => keys.delete(key)));
  });
  gameStart.addEventListener("click", startGame);
  resetGame();
  requestAnimationFrame(gameLoop);
}
