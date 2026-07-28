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

test("server-renders the single-section Studio Atlas layout", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Studio Atlas<\/title>/i);
  assert.match(html, /class="atlasSection"/);
  assert.match(html, /Studio Atlas/);
  assert.match(html, /class="projectStrip"/);
  assert.doesNotMatch(html, /Where precise ideas|become lasting objects/);
  assert.doesNotMatch(html, /Home|Work|About|Contact/);
  assert.doesNotMatch(html, /frontier companies|Studio range/);
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

  assert.match(page, /className="atlasSection"/);
  assert.match(page, /className="wordmark"/);
  assert.match(page, /className="projectStrip"/);
  assert.doesNotMatch(page, /atlasNav|statementRow/);
  assert.match(layout, /const title = "Studio Atlas"/);
  assert.match(staticBuilder, /class="atlasSection"/);
  assert.doesNotMatch(staticBuilder, /atlasNav|statementRow/);
  assert.match(staticBuilder, /readFile\("app\/globals\.css"/);
  assert.match(css, /\.wordmark\s*\{/);
  assert.match(css, /\.projectStrip\s*\{/);
  assert.doesNotMatch(css, /atlasNav|statementRow|atlasMark/);
  assert.doesNotMatch(css, /letter-spacing:\s*-/);
  assert.doesNotMatch(css, /font-size:\s*[^;]*vw/);
  assert.doesNotMatch(`${page}\n${css}\n${staticBuilder}`, /Goodside/);
});
