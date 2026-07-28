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

test("server-renders the Studio Atlas homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(
    html,
    /<title>Studio Atlas \| Design Studio for Frontier Teams<\/title>/i,
  );
  assert.match(html, /We help frontier companies/);
  assert.match(html, /Studio range/);
  assert.match(html, /product, packaging, software, and hardware/);
  assert.match(html, /Packaging systems/);
  assert.match(html, /Hardware market entry/);
  assert.doesNotMatch(html, /Codex/);
  assert.doesNotMatch(html, /Your site is taking shape/);
});

test("keeps the Studio Atlas content and styling in sync", async () => {
  const [css, page, layout] = await Promise.all([
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(page, /const disciplines = \[/);
  assert.match(page, /name: "Product"/);
  assert.match(page, /name: "Brand"/);
  assert.match(page, /name: "Packaging"/);
  assert.match(page, /name: "Software"/);
  assert.match(page, /name: "Hardware"/);
  assert.match(css, /\.capabilities\s*\{/);
  assert.match(css, /\.disciplineGrid\s*\{/);
  assert.match(css, /@media \(max-width: 900px\)/);
  assert.match(layout, /Studio Atlas \| Design Studio for Frontier Teams/);
  assert.doesNotMatch(page, /SkeletonPreview|react-loading-skeleton/);
  assert.doesNotMatch(css, /gradient|bokeh|orb/i);
});
