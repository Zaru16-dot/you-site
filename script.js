const root = document.documentElement;
const coverReveal = document.getElementById("coverReveal");
const ring = coverReveal.querySelector(".target-ring");

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

window.addEventListener("pointermove", (event) => {
  root.style.setProperty("--page-x", `${event.clientX}px`);
  root.style.setProperty("--page-y", `${event.clientY}px`);
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

coverReveal.addEventListener(
  "touchmove",
  (event) => {
    const touch = event.touches[0];

    if (touch) {
      setCoverPosition(touch.clientX, touch.clientY);
    }
  },
  { passive: true }
);

window.addEventListener("resize", centerReveal);

centerReveal();
