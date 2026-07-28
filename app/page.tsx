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
      dash.style.display = desktopQuery.matches ? "block" : "none";
    }
  };

  const fit = () => {
    const wordmark = document.querySelector("[data-fit-wordmark]");
    if (!wordmark) return;
    updateDash();
    wordmark.style.setProperty("--wordmark-scale", "1");
    const width = wordmark.scrollWidth;
    if (width > 0) {
      wordmark.style.setProperty("--wordmark-scale", String(window.innerWidth / width));
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
