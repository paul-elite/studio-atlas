const navItems = [
  {
    href: "#work",
    title: "What we make",
    copy: "Brand systems, launch pages, product surfaces, and campaign worlds.",
  },
  {
    href: "#services",
    title: "Services",
    copy: "Strategy, identity, web design, product design, and creative direction.",
  },
  {
    href: "#proof",
    title: "Studio proof",
    copy: "Built for founders who need sharp positioning and a clear market story.",
  },
  {
    href: "#contact",
    title: "Start",
    copy: "Bring the rough idea. We will shape the first version into something useful.",
  },
];

const proof = [
  {
    name: "Atlas AI",
    result: "Repositioned from tooling to category-defining workflow platform.",
    metric: "Seed to Series A-ready",
  },
  {
    name: "Northstar Labs",
    result: "Created a launch identity and website for a technical founder team.",
    metric: "4-week public launch",
  },
  {
    name: "Signal Works",
    result: "Turned a dense enterprise product into a simple buying narrative.",
    metric: "3x demo clarity",
  },
];

const services = [
  "Brand strategy",
  "Identity systems",
  "Web design",
  "Product UI",
  "Launch campaigns",
  "Creative systems",
];

const gallery = [
  "Launch identity",
  "Product narrative",
  "Investor story",
  "Website system",
  "Campaign world",
  "Founder deck",
];

export default function Home() {
  return (
    <main>
      <section className="hero" id="top">
        <nav className="nav" aria-label="Main navigation">
          <a className="brand" href="#top" aria-label="Go to homepage">
            Studio Atlas
          </a>
          <a className="navCta" href="#contact">
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

      <section className="intro section">
        <div className="sectionKicker">Our point of view</div>
        <div className="introCopy">
          <h2>
            Great design work starts by getting uncomfortably close to the problem.
          </h2>
          <p>
            Studio Atlas works with founders, operators, and product teams building
            things that are hard to explain at first glance. We study the market,
            the user, the technology, and the decision path, then turn that into
            brand, web, product, and launch systems people can understand quickly.
          </p>
          <p>
            You get a focused senior creative relationship, not a bloated process.
            The result is a sharper story, a more distinctive visual world, and a
            website that can keep evolving after launch.
          </p>
        </div>
      </section>

      <section className="proof section" id="proof">
        <div className="sectionHeader">
          <p className="eyebrow">Early partners</p>
          <h2>Built for teams that need to look as serious as the thing they are building.</h2>
        </div>
        <div className="proofGrid">
          {proof.map((item) => (
            <article className="proofCard" key={item.name}>
              <div>
                <h3>{item.name}</h3>
                <p>{item.result}</p>
              </div>
              <strong>{item.metric}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="servicesBand" id="services">
        <div className="servicesIntro">
          <p className="eyebrow">Services</p>
          <h2>Strategy is the anchor. Visual craft is how people feel it.</h2>
        </div>
        <div className="serviceList">
          {services.map((service) => (
            <span key={service}>{service}</span>
          ))}
        </div>
      </section>

      <section className="gallery section" id="work">
        <div className="sectionHeader">
          <p className="eyebrow">What we make</p>
          <h2>Systems, pages, and launch materials that make the work easier to believe.</h2>
        </div>
        <div className="visualGrid">
          {gallery.map((item, index) => (
            <article className={`visualTile tile${index + 1}`} key={item}>
              <span>{item}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="quoteBand">
        <blockquote>
          "The job is not to make advanced work feel smaller. It is to make it
          legible enough that the right people can step toward it."
        </blockquote>
        <p>Studio Atlas</p>
      </section>

      <section className="contact section" id="contact">
        <p className="eyebrow">Let us build the first version</p>
        <h2>Bring the product, the audience, and the messy notes. We will turn them into a site people can understand.</h2>
        <a className="primaryButton" href="mailto:hello@studioatlas.work">
          hello@studioatlas.work
        </a>
      </section>
    </main>
  );
}
