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

test("server-renders a blank page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<body[^>]*>\s*(?:<script\b[\s\S]*)?<\/body>/i);
  assert.doesNotMatch(html, /Studio Atlas|StudioAtlas|projectStrip|wordmark/);
  assert.doesNotMatch(html, /<main|<section|<nav|<h1|<p|<svg/i);
});

test("keeps the app and static deployment blank", async () => {
  const [page, layout, css, staticBuilder] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(
      new URL("../scripts/build-vercel-static.mjs", import.meta.url),
      "utf8",
    ),
  ]);

  assert.match(page, /return null/);
  assert.match(layout, /const title = ""/);
  assert.doesNotMatch(css, /wordmark|projectStrip|atlasSection/i);
  assert.doesNotMatch(
    `${page}\n${layout}\n${css}\n${staticBuilder}`,
    /Studio Atlas|StudioAtlas|projectStrip|wordmark/,
  );
});
