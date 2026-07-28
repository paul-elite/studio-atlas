import { mkdir, copyFile, writeFile } from "node:fs/promises";

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

        <div class="heroStatement">
          <p class="eyebrow">Design studio for ambitious technical teams</p>
          <h1>
            We help frontier companies make complex ideas feel obvious, credible,
            and worth caring about.
          </h1>
        </div>

        <div class="navCards" aria-label="Page sections">
          <a class="navCard" href="mailto:hello@studioatlas.work">
            <strong>What we make</strong>
            <span>Brand systems, launch pages, product surfaces, and campaign worlds.</span>
          </a>
          <a class="navCard" href="mailto:hello@studioatlas.work">
            <strong>Services</strong>
            <span>Strategy, identity, web design, product design, and creative direction.</span>
          </a>
          <a class="navCard" href="mailto:hello@studioatlas.work">
            <strong>Studio proof</strong>
            <span>Built for founders who need sharp positioning and a clear market story.</span>
          </a>
          <a class="navCard" href="mailto:hello@studioatlas.work">
            <strong>Start</strong>
            <span>Bring the rough idea. We will shape the first version into something useful.</span>
          </a>
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
  grid-template-rows: auto 1fr auto;
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

.heroStatement {
  align-self: center;
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding: 64px 0;
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
p {
  margin-top: 0;
}

h1 {
  max-width: 1220px;
  margin-bottom: 0;
  font-size: var(--text-display);
  font-weight: 500;
  line-height: 0.92;
  letter-spacing: 0;
}

.navCards {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
}

.navCard {
  display: grid;
  align-content: space-between;
  min-height: 160px;
  padding: 18px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--paper);
  transition:
    transform 180ms ease,
    border-color 180ms ease,
    background 180ms ease;
}

.navCard:hover,
.navCard:focus-visible {
  transform: translateY(-3px);
  border-color: var(--foreground);
  outline: none;
}

.navCard strong {
  font-size: var(--text-base);
  font-weight: 500;
}

.navCard span {
  align-self: end;
  color: var(--muted);
  font-size: var(--text-small);
  font-weight: 400;
  line-height: 1.35;
}

@media (max-width: 900px) {
  .hero {
    min-height: auto;
    padding: 18px;
  }

  .heroStatement {
    padding: 58px 0;
  }

  h1 {
    font-size: var(--text-display);
  }

  .navCards {
    grid-template-columns: 1fr;
  }

  .navCard {
    min-height: 128px;
  }
}
`;

await mkdir("vercel-static", { recursive: true });
await writeFile("vercel-static/index.html", html);
await writeFile("vercel-static/styles.css", css);
await copyFile("public/og.png", "vercel-static/og.png");
await copyFile("public/favicon.svg", "vercel-static/favicon.svg");
