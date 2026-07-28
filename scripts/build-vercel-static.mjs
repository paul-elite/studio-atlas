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
        <span class="desktopDash" aria-hidden="true">—</span>
        <span data-fit-line>atlas</span>
      </h1>
      <script>
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
      </script>
    </main>
  </body>
</html>
`;

const css = String.raw`@import url("https://fonts.googleapis.com/css2?family=Geist:wght@600&display=swap");

:root {
  --background: #b6ff29;
  --foreground: #111111;
}

html,
body {
  min-height: 100%;
}

body {
  margin: 0;
  background: var(--background);
  color: var(--foreground);
}

.home {
  display: grid;
  align-items: start;
  justify-items: center;
  min-height: 100vh;
  overflow: hidden;
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
  transform-origin: center top;
}

.screenWordmark span {
  display: block;
}

.desktopDash {
  margin-inline: 0.04em;
}

.desktopDash + span {
  margin-left: 0;
}

@media (max-width: 900px) {
  .screenWordmark {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .desktopDash {
    display: none;
  }

  .desktopDash + span {
    margin-top: -0.08em;
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
