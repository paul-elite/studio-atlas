import { mkdir, copyFile, rm, writeFile } from "node:fs/promises";

const html = String.raw`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Studio Atlas | Design Studio for Frontier Teams</title>
    <meta
      name="description"
      content="Studio Atlas helps ambitious technical teams turn complex products into clear brands, websites, and launch systems."
    />
    <meta property="og:title" content="Studio Atlas | Design Studio for Frontier Teams" />
    <meta
      property="og:description"
      content="Studio Atlas helps ambitious technical teams turn complex products into clear brands, websites, and launch systems."
    />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="/og.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="/og.png" />
    <link rel="icon" href="/favicon.svg" />
    <link rel="stylesheet" href="/styles.css" />
  </head>
  <body>
    <main>
      <section class="hero" id="top">
        <nav class="nav" aria-label="Main navigation">
          <a class="brand" href="#top" aria-label="Go to homepage">Studio Atlas</a>
          <a class="navCta" href="mailto:hello@studioatlas.work">Work with us</a>
        </nav>

        <div class="heroGrid">
          <div class="introBlock">
            <p class="eyebrow">Introduction</p>
            <h1>
              We help frontier companies make complex ideas feel obvious,
              credible, and worth caring about.
            </h1>
          </div>

          <aside class="proofBlock" aria-label="Studio credibility">
            <p>
              "Trusted to turn technical products into clear brands, launch
              pages, and digital systems."
            </p>
            <span>Studio Atlas</span>
          </aside>

          <a class="latestBlock" href="mailto:hello@studioatlas.work">
            <span>Latest</span>
            <strong>Now shaping Studio Atlas for launch</strong>
            <em>Learn more</em>
          </a>

          <div class="updatesBlock" aria-label="Updates">
            <span>Updates</span>
            <div class="updatesList">
              <a href="mailto:hello@studioatlas.work">
                <strong>Brand systems for technical products</strong>
                <em>See approach</em>
              </a>
              <a href="mailto:hello@studioatlas.work">
                <strong>Launch pages that make the pitch clear</strong>
                <em>View format</em>
              </a>
              <a href="mailto:hello@studioatlas.work">
                <strong>Product surfaces for complex workflows</strong>
                <em>Start a project</em>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  </body>
</html>
`;

const css = String.raw`@import url("https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500&display=swap");

:root {
  --background: #ffffff;
  --foreground: #111111;
  --muted: #6f6f6f;
  --line: #e7e7e7;
  --paper: #ffffff;
  --text-small: 0.875rem;
  --text-base: 1rem;
  --text-display: clamp(3.25rem, 8.6vw, 8.75rem);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  overflow-x: hidden;
  background: var(--background);
  color: var(--foreground);
  font-family: "Inter Tight", Arial, Helvetica, sans-serif;
  font-size: var(--text-base);
  font-weight: 400;
}

a {
  color: inherit;
  text-decoration: none;
}

main {
  min-height: 100vh;
  background: var(--background);
}

.hero {
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
  padding: 24px;
  background: var(--background);
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
}

.brand,
.navCta {
  font-size: var(--text-base);
  font-weight: 500;
  letter-spacing: 0;
}

.navCta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 0 14px;
  border: 1px solid var(--foreground);
  border-radius: 8px;
  background: var(--paper);
}

.navCta:hover,
.navCta:focus-visible {
  background: var(--foreground);
  color: var(--background);
  outline: none;
}

.heroGrid {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(280px, 0.45fr);
  grid-template-rows: 1fr auto;
  gap: 24px;
  align-items: end;
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding: 64px 0 0;
}

.eyebrow {
  margin: 0 0 18px;
  color: var(--muted);
  font-size: var(--text-small);
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

h1,
p,
em {
  margin-top: 0;
}

h1 {
  max-width: 1050px;
  margin-bottom: 0;
  font-size: var(--text-display);
  font-weight: 500;
  line-height: 0.94;
  letter-spacing: 0;
}

.proofBlock {
  display: grid;
  align-content: end;
  gap: 14px;
  max-width: 330px;
  padding-bottom: 10px;
}

.proofBlock p {
  margin-bottom: 0;
  color: var(--foreground);
  font-size: var(--text-base);
  font-weight: 400;
  line-height: 1.35;
}

.proofBlock span,
.latestBlock span,
.updatesBlock > span,
.latestBlock em,
.updatesList em {
  color: var(--muted);
  font-size: var(--text-small);
  font-style: normal;
  font-weight: 400;
  line-height: 1.25;
}

.latestBlock,
.updatesBlock {
  min-height: 180px;
  border-top: 1px solid var(--line);
  padding-top: 18px;
}

.latestBlock {
  display: grid;
  align-content: start;
  gap: 28px;
  background: var(--paper);
  transition:
    border-color 180ms ease,
    color 180ms ease;
}

.latestBlock:hover,
.latestBlock:focus-visible,
.updatesList a:hover,
.updatesList a:focus-visible {
  border-color: var(--foreground);
  outline: none;
}

.latestBlock strong,
.updatesList strong {
  font-size: var(--text-base);
  font-weight: 500;
  line-height: 1.15;
}

.updatesBlock {
  display: grid;
  grid-template-columns: 120px minmax(0, 1fr);
  gap: 18px;
}

.updatesList {
  display: grid;
  gap: 0;
}

.updatesList a {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 92px;
  gap: 18px;
  padding: 0 0 18px;
  border-bottom: 1px solid var(--line);
}

.updatesList a + a {
  padding-top: 18px;
}

@media (max-width: 900px) {
  .hero {
    min-height: auto;
    padding: 18px;
  }

  .heroGrid {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    align-items: start;
    padding: 58px 0;
  }

  h1 {
    font-size: var(--text-display);
  }

  .proofBlock {
    max-width: none;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--line);
  }

  .latestBlock,
  .updatesBlock {
    min-height: 0;
  }

  .updatesBlock,
  .updatesList a {
    grid-template-columns: 1fr;
  }

  .updatesList a {
    gap: 8px;
  }
}
`;

await rm(".vercel/output", { recursive: true, force: true });
await mkdir("vercel-static", { recursive: true });
await mkdir(".vercel/output/static", { recursive: true });
await writeFile("vercel-static/index.html", html);
await writeFile("vercel-static/styles.css", css);
await copyFile("public/og.png", "vercel-static/og.png");
await copyFile("public/favicon.svg", "vercel-static/favicon.svg");
await writeFile(".vercel/output/static/index.html", html);
await writeFile(".vercel/output/static/styles.css", css);
await copyFile("public/og.png", ".vercel/output/static/og.png");
await copyFile("public/favicon.svg", ".vercel/output/static/favicon.svg");
await writeFile(
  ".vercel/output/config.json",
  `${JSON.stringify({ version: 3 }, null, 2)}\n`,
);
