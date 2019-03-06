const isInViewPort = el => {
  let y = el.getBoundingClientRect().top;

  let vh = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );

  let h = el.clientHeight;

  return y < vh && y + h > 0;
};

export const init = () => {
  const elements = [...document.querySelectorAll("[data-parallax]")];

  if (!elements.length) return;

  window.addEventListener("scroll", e => {
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();

      if (!isInViewPort(el)) return;

      if (el.dataset.initial === undefined) el.dataset.initial = rect.top;

      const y = (rect.top - el.dataset.initial) / 10;

      el.style.backgroundPosition = `center calc(50% + ${y}px)`;
    });
  });
};
