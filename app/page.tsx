const navItems = [
  {
    href: "mailto:hello@studioatlas.work",
    title: "What we make",
    copy: "Brand systems, launch pages, product surfaces, and campaign worlds.",
  },
  {
    href: "mailto:hello@studioatlas.work",
    title: "Services",
    copy: "Strategy, identity, web design, product design, and creative direction.",
  },
  {
    href: "mailto:hello@studioatlas.work",
    title: "Studio proof",
    copy: "Built for founders who need sharp positioning and a clear market story.",
  },
  {
    href: "mailto:hello@studioatlas.work",
    title: "Start",
    copy: "Bring the rough idea. We will shape the first version into something useful.",
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

        <div className="heroStatement">
          <p className="eyebrow">Design studio for ambitious technical teams</p>
          <h1>
            We help frontier companies make complex ideas feel obvious, credible,
            and worth caring about.
          </h1>
        </div>

        <div className="navCards" aria-label="Page sections">
          {navItems.map((item) => (
            <a className="navCard" href={item.href} key={item.title}>
              <strong>{item.title}</strong>
              <span>{item.copy}</span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
