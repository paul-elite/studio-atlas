export default function Home() {
  return (
    <main className="home">
      <h1 className="screenWordmark" data-fit-wordmark>
        <span data-fit-line>studio</span>
        <span className="desktopDash" aria-hidden="true">
          —
        </span>
        <span data-fit-line>atlas</span>
      </h1>
      <script
        dangerouslySetInnerHTML={{
          __html: `
(() => {
  const mobileQuery = window.matchMedia("(max-width: 760px)");

  const fit = () => {
    const wordmark = document.querySelector("[data-fit-wordmark]");
    if (!wordmark) return;
    wordmark.style.setProperty("--wordmark-scale", "1");
    const lines = [...wordmark.querySelectorAll("[data-fit-line]")];
    lines.forEach((line) => line.style.setProperty("--line-scale", "1"));

    if (mobileQuery.matches) {
      lines.forEach((line) => {
        const width = line.scrollWidth;
        if (width > 0) {
          line.style.setProperty("--line-scale", String(window.innerWidth / width));
        }
      });
      return;
    }

    const width = wordmark.scrollWidth;
    if (width > 0) {
      wordmark.style.setProperty("--wordmark-scale", String(window.innerWidth / width));
    }
  };
  document.fonts?.ready.then(fit);
  window.addEventListener("resize", fit, { passive: true });
  fit();
})();
`,
        }}
      />
    </main>
  );
}
