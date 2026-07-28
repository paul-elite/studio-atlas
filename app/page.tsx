export default function Home() {
  return (
    <main className="home">
      <h1 className="screenWordmark" data-fit-wordmark>
        studio atlas
      </h1>
      <script
        dangerouslySetInnerHTML={{
          __html: `
(() => {
  const fit = () => {
    const wordmark = document.querySelector("[data-fit-wordmark]");
    if (!wordmark) return;
    wordmark.style.setProperty("--wordmark-scale", "1");
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
