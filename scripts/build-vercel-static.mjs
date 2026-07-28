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
      <h1 class="screenWordmark" aria-label="studio atlas">
        <svg
          viewBox="0 0 1000 180"
          preserveAspectRatio="none"
          role="presentation"
        >
          <text x="0" y="148" textLength="1000" lengthAdjust="spacingAndGlyphs">
            studio atlas
          </text>
        </svg>
      </h1>
    </main>
  </body>
</html>
`;

const css = String.raw`@import url("https://fonts.googleapis.com/css2?family=Geist:wght@900&display=swap");

:root {
  --background: #41de03;
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
  align-items: center;
  min-height: 100vh;
  overflow: hidden;
}

.screenWordmark {
  width: 100%;
  margin: 0;
}

.screenWordmark svg {
  display: block;
  width: 100%;
  height: 180px;
  fill: var(--foreground);
}

.screenWordmark text {
  font-family: "Geist", Arial, Helvetica, sans-serif;
  font-size: 166px;
  font-weight: 900;
  letter-spacing: 0;
}

@media (max-width: 760px) {
  .screenWordmark svg {
    height: 110px;
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
