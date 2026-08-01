import { mkdir, rm, writeFile } from "node:fs/promises";

const html = String.raw`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title></title>
    <link rel="stylesheet" href="/styles.css" />
  </head>
  <body>
    <main class="home">
      <h1 class="screenWordmark" data-fit-wordmark>
        <span data-fit-line>studio</span>
        <span class="desktopDash" aria-hidden="true" style="display: none">—</span>
        <span data-fit-line>atlas</span>
      </h1>
      <nav class="homeMenu" aria-label="Studio sections">
        <a href="#case-studies">Case studies</a>
        <a href="#gallery">Gallery</a>
        <a href="#pricing">Pricing</a>
      </nav>
      <script>
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
      </script>
    </main>
  </body>
</html>
`;

const css = String.raw`@import url("https://fonts.googleapis.com/css2?family=Geist:wght@600&display=swap");

:root {
  --background: #b6ff29;
  --foreground: #111111;
  --page-inset: 24px;
  --mobile-title-inset: 12px;
}

html,
body {
  min-height: 100%;
  overflow-x: hidden;
}

body {
  margin: 0;
  background: var(--background);
  color: var(--foreground);
}

.home {
  display: grid;
  align-items: start;
  justify-items: start;
  min-height: 100vh;
  overflow: hidden;
  padding: 0 var(--page-inset) var(--page-inset) 0;
  width: 100%;
}

.screenWordmark {
  display: flex;
  width: max-content;
  margin: 0;
  font-family: "Geist", Arial, Helvetica, sans-serif;
  font-size: 160px;
  font-weight: 600;
  letter-spacing: -0.06em;
  line-height: 0.82;
  white-space: nowrap;
  word-spacing: -0.12em;
  transform: scale(var(--wordmark-scale, 1));
  transform-origin: left top;
}

.screenWordmark span {
  display: block;
}

.homeMenu {
  display: grid;
  gap: 8px;
  margin-top: 22px;
  padding-left: 6px;
}

.homeMenu a {
  color: var(--foreground);
  font-family: "Geist", Arial, Helvetica, sans-serif;
  font-size: clamp(18px, 2.5vw, 30px);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 0.95;
  text-decoration: none;
  width: fit-content;
}

.homeMenu a:hover,
.homeMenu a:focus-visible {
  text-decoration: underline;
  text-decoration-thickness: 0.08em;
  text-underline-offset: 0.18em;
}

.desktopDash {
  display: none;
  margin-inline: 0.04em;
}

.desktopDash + span {
  margin-left: 0;
}

@media (min-width: 901px) and (hover: hover) and (pointer: fine) {
  .desktopDash + span {
    margin-left: -0.02em;
  }
}

@media (max-width: 900px), (hover: none), (any-pointer: coarse) {
  .home {
    justify-items: start;
    padding: 0 var(--mobile-title-inset);
    width: 100%;
  }

  .screenWordmark {
    flex-direction: column;
    align-items: flex-start;
    line-height: 0.88;
    text-align: left;
    transform-origin: left top;
  }

  .desktopDash + span {
    margin-top: -0.03em;
    margin-left: 0;
  }

  .homeMenu {
    margin-top: 18px;
    padding-left: 2px;
  }
}
`;

await rm(".vercel/output", { recursive: true, force: true });
await rm("vercel-static", { recursive: true, force: true });
await mkdir("vercel-static", { recursive: true });
await mkdir(".vercel/output/static", { recursive: true });
await writeFile("vercel-static/index.html", html);
await writeFile("vercel-static/styles.css", css);
await writeFile(".vercel/output/static/index.html", html);
await writeFile(".vercel/output/static/styles.css", css);
await writeFile(
  ".vercel/output/config.json",
  `${JSON.stringify({ version: 3 }, null, 2)}\n`,
);
