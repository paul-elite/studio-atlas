import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders a single full-screen wordmark", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<h1(?=[^>]*class="screenWordmark")(?=[^>]*data-fit-wordmark)[^>]*>/);
  assert.match(html, /<span[^>]*data-fit-line[^>]*>\s*studio\s*<\/span>/);
  assert.match(html, /class="desktopDash"/);
  assert.match(html, /<span[^>]*data-fit-line[^>]*>\s*atlas\s*<\/span>/);
  assert.match(html, /class="screenWordmark"/);
  assert.match(html, /--wordmark-scale/);
  assert.doesNotMatch(html, /projectStrip|atlasSection|StudioAtlas|Studio Atlas/);
  assert.doesNotMatch(html, /textLength|lengthAdjust|<svg|<section|<nav|<p/i);
});

test("keeps the app and static deployment aligned", async () => {
  const [page, layout, css, staticBuilder] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(
      new URL("../scripts/build-vercel-static.mjs", import.meta.url),
      "utf8",
    ),
  ]);

  assert.match(page, /studio/);
  assert.match(page, /atlas/);
  assert.doesNotMatch(page, /textLength|lengthAdjust|<svg/);
  assert.match(page, /data-fit-wordmark/);
  assert.match(page, /data-fit-line/);
  assert.match(layout, /const title = ""/);
  assert.match(layout, /Geist,/);
  assert.match(css, /--background:\s*#b6ff29/);
  assert.match(css, /font-family:\s*var\(--font-geist/);
  assert.match(css, /font-size:\s*160px/);
  assert.match(css, /font-weight:\s*600/);
  assert.match(css, /align-items:\s*start/);
  assert.match(css, /justify-items:\s*center/);
  assert.match(css, /letter-spacing:\s*-0\.06em/);
  assert.match(css, /word-spacing:\s*-0\.12em/);
  assert.match(css, /transform-origin:\s*center top/);
  assert.match(css, /@media \(max-width:\s*760px\)/);
  assert.match(css, /flex-direction:\s*column/);
  assert.match(css, /--line-scale/);
  assert.match(css, /\.desktopDash/);
  assert.match(css, /display:\s*none/);
  assert.match(css, /transform:\s*scale\(var\(--wordmark-scale,\s*1\)\)/);
  assert.doesNotMatch(css, /font-size:\s*[^;]*vw/);
  assert.match(css, /\.screenWordmark\s*\{/);
  assert.match(staticBuilder, /--background:\s*#b6ff29/);
  assert.match(staticBuilder, /data-fit-line>\s*studio/);
  assert.match(staticBuilder, /desktopDash/);
  assert.match(staticBuilder, /data-fit-line>\s*atlas/);
  assert.match(staticBuilder, /--wordmark-scale/);
  assert.match(staticBuilder, /--line-scale/);
  assert.match(staticBuilder, /fonts\.googleapis\.com\/css2\?family=Geist:wght@600/);
  assert.doesNotMatch(staticBuilder, /textLength|lengthAdjust|<svg/);
  assert.doesNotMatch(css, /projectStrip|atlasSection/i);
  assert.doesNotMatch(
    `${page}\n${layout}\n${css}\n${staticBuilder}`,
    /Studio Atlas|StudioAtlas|projectStrip|atlasSection/,
  );
});
