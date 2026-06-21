const root = document.documentElement;
const coverReveal = document.getElementById("coverReveal");
const ring = coverReveal.querySelector(".target-ring");
const siteCursor = document.querySelector(".site-cursor");

function setCoverPosition(clientX, clientY) {
  const rect = coverReveal.getBoundingClientRect();

  const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
  const y = Math.max(0, Math.min(clientY - rect.top, rect.height));

  coverReveal.style.setProperty("--mx", `${x}px`);
  coverReveal.style.setProperty("--my", `${y}px`);
}

function centerReveal() {
  const rect = coverReveal.getBoundingClientRect();

  coverReveal.style.setProperty("--mx", `${rect.width / 2}px`);
  coverReveal.style.setProperty("--my", `${rect.height / 2}px`);
}

function updateMobileDecode() {
  const rect = coverReveal.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  const start = viewportHeight * 0.95;
  const end = viewportHeight * 0.28;

  const progress = (start - rect.top) / (start - end);
  const clamped = Math.max(0, Math.min(progress, 1));

  root.style.setProperty("--scrollDecode", clamped.toFixed(3));
}

window.addEventListener("pointermove", (event) => {
  root.style.setProperty("--page-x", `${event.clientX}px`);
  root.style.setProperty("--page-y", `${event.clientY}px`);

  if (siteCursor) {
    siteCursor.style.opacity = "0.72";
  }
});

window.addEventListener("pointerleave", () => {
  if (siteCursor) {
    siteCursor.style.opacity = "0";
  }
});

coverReveal.addEventListener("pointermove", (event) => {
  setCoverPosition(event.clientX, event.clientY);
});

coverReveal.addEventListener("pointerenter", (event) => {
  ring.style.opacity = "0.95";
  setCoverPosition(event.clientX, event.clientY);
});

coverReveal.addEventListener("pointerleave", () => {
  ring.style.opacity = "0.45";
});

window.addEventListener("scroll", updateMobileDecode, { passive: true });
window.addEventListener("resize", () => {
  centerReveal();
  updateMobileDecode();
});

centerReveal();
updateMobileDecode();
