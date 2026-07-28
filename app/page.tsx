const updates = [
  {
    title: "Brand systems for technical products",
    action: "See approach",
  },
  {
    title: "Launch pages that make the pitch clear",
    action: "View format",
  },
  {
    title: "Product surfaces for complex workflows",
    action: "Start a project",
  },
];

export default function Home() {
  return (
    <main>
      <section className="hero" id="top">
        <nav className="nav" aria-label="Main navigation">
          <a className="brand" href="#top" aria-label="Go to homepage">
            Studio Atlas
          </a>
          <a className="navCta" href="mailto:hello@studioatlas.work">
            Work with us
          </a>
        </nav>

        <div className="heroGrid">
          <div className="introBlock">
            <p className="eyebrow">Introduction</p>
            <h1>
              We help frontier companies make complex ideas feel obvious,
              credible, and worth caring about.
            </h1>
          </div>

          <aside className="proofBlock" aria-label="Studio credibility">
            <p>
              "Trusted to turn technical products into clear brands, launch
              pages, and digital systems."
            </p>
            <span>Studio Atlas</span>
          </aside>

          <a className="latestBlock" href="mailto:hello@studioatlas.work">
            <span>Latest</span>
            <strong>Now shaping Studio Atlas for launch</strong>
            <em>Learn more</em>
          </a>

          <div className="updatesBlock" aria-label="Updates">
            <span>Updates</span>
            <div className="updatesList">
              {updates.map((item) => (
                <a href="mailto:hello@studioatlas.work" key={item.title}>
                  <strong>{item.title}</strong>
                  <em>{item.action}</em>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
