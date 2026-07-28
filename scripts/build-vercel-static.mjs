import { mkdir, readFile, rm, writeFile } from "node:fs/promises";

const html = String.raw`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Studio Atlas</title>
    <meta
      name="description"
      content="Studio Atlas is an independent design studio shaping product, brand, packaging, software, and hardware."
    />
    <link rel="stylesheet" href="/styles.css" />
  </head>
  <body>
    <main>
      <section class="atlasSection" aria-label="Studio Atlas introduction">
        <nav class="atlasNav" aria-label="Primary navigation">
          <a href="#top">• Home</a>
          <a href="mailto:hello@studioatlas.work">Work</a>
          <span class="atlasMark" aria-hidden="true"></span>
          <a href="mailto:hello@studioatlas.work">About</a>
          <a href="mailto:hello@studioatlas.work">Contact</a>
        </nav>

        <div class="wordmark" id="top" aria-label="Studio Atlas">
          Studio Atlas
        </div>

        <div class="statementRow">
          <h1>
            Where precise ideas
            <br />
            become lasting objects
          </h1>
          <p>
            Studio Atlas is an independent design studio shaping product,
            brand, packaging, software, and hardware into one coherent market
            presence.
          </p>
        </div>

        <div class="projectStrip" aria-label="Studio Atlas visual range">
          <figure class="projectTile tileOne">
            <figcaption>Brand campaign system</figcaption>
          </figure>
          <figure class="projectTile tileTwo">
            <figcaption>Hardware material study</figcaption>
          </figure>
          <figure class="projectTile tileThree">
            <figcaption>Packaging and print suite</figcaption>
          </figure>
          <figure class="projectTile tileFour">
            <figcaption>Launch packaging prototype</figcaption>
          </figure>
          <figure class="projectTile tileFive">
            <figcaption>Software and campaign wall</figcaption>
          </figure>
          <figure class="projectTile tileSix">
            <figcaption>Studio mark exploration</figcaption>
          </figure>
        </div>
      </section>
    </main>
  </body>
</html>
`;

const appCss = await readFile("app/globals.css", "utf8");
const css = appCss
  .replace(/^@import "tailwindcss";\n\n/, "")
  .replace(/@theme inline \{[\s\S]*?\}\n\n/, "");

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
