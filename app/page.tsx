export default function Home() {
  return (
    <main className="home">
      <h1 className="screenWordmark" data-fit-wordmark>
        <span data-fit-line>studio</span>
        <span
          className="desktopDash"
          aria-hidden="true"
          style={{ display: "none" }}
        >
          —
        </span>
        <span data-fit-line>atlas</span>
      </h1>
      <script
        dangerouslySetInnerHTML={{
          __html: `
(() => {
  const desktopQuery = window.matchMedia("(min-width: 901px) and (hover: hover) and (pointer: fine)");

  const updateDash = () => {
    const dash = document.querySelector("[data-fit-wordmark] .desktopDash");
    if (dash) {
      const hasTouch = navigator.maxTouchPoints > 0;
      dash.style.display = desktopQuery.matches && !hasTouch ? "block" : "none";
    }
  };

  const fit = () => {
    const wordmark = document.querySelector("[data-fit-wordmark]");
    if (!wordmark) return;
    updateDash();
    wordmark.style.setProperty("--wordmark-scale", "1");
    const home = wordmark.closest(".home");
    const style = home ? window.getComputedStyle(home) : null;
    const availableWidth = home && style
      ? home.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight)
      : window.innerWidth;
    const isDesktop = desktopQuery.matches && navigator.maxTouchPoints === 0;
    const edgeBuffer = isDesktop && style ? parseFloat(style.paddingRight) : 0;
    const width = wordmark.scrollWidth;
    if (width > 0) {
      wordmark.style.setProperty("--wordmark-scale", String((availableWidth - edgeBuffer) / width));
    }
  };
  document.fonts?.ready.then(fit);
  window.addEventListener("resize", fit, { passive: true });
  desktopQuery.addEventListener("change", fit);
  fit();
})();
`,
        }}
      />
    </main>
  );
}
