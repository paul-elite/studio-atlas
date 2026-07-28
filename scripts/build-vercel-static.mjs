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
            const edgeBuffer = style ? parseFloat(style.paddingRight) : 16;
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
  --page-inset: clamp(8px, 1vw, 16px);
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
    justify-items: center;
    padding: 0;
    width: 100%;
  }

  .screenWordmark {
    flex-direction: column;
    align-items: flex-start;
    line-height: 0.88;
    text-align: left;
    transform-origin: center top;
  }

  .desktopDash + span {
    margin-top: -0.03em;
    margin-left: 0;
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
