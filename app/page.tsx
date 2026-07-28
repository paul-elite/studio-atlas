const updates = [
  {
    title: "Brand systems for technical products",
    action: "See approach",
  },
  {
    title: "Packaging that carries the product story",
    action: "View format",
  },
  {
    title: "Interfaces for complex workflows",
    action: "Start a project",
  },
];

const disciplines = [
  {
    number: "01",
    name: "Product",
    summary:
      "Positioning, experience architecture, launch narratives, and systems for products that need to be understood quickly.",
  },
  {
    number: "02",
    name: "Brand",
    summary:
      "Identity, language, campaign direction, and visual systems built to hold up across product, sales, and investor moments.",
  },
  {
    number: "03",
    name: "Packaging",
    summary:
      "Structure, shelf presence, unboxing, labeling, and production-ready assets for physical products entering the market.",
  },
  {
    number: "04",
    name: "Software",
    summary:
      "Interfaces, prototypes, dashboards, websites, and design systems for workflows where clarity is a competitive advantage.",
  },
  {
    number: "05",
    name: "Hardware",
    summary:
      "Industrial design direction, product storytelling, environmental moments, and launch surfaces around technical objects.",
  },
];

const modes = [
  "New venture identities",
  "Product and web launches",
  "Packaging systems",
  "Software experience design",
  "Hardware market entry",
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
              Trusted to turn technical products into clear brands, launch
              pages, and digital systems.
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

      <section className="capabilities" id="capabilities">
        <div className="sectionHeader">
          <p className="eyebrow">Studio range</p>
          <h2>
            One studio for the moments where brand, product, packaging,
            software, and hardware have to move together.
          </h2>
        </div>

        <div className="disciplineGrid" aria-label="Studio disciplines">
          {disciplines.map((discipline) => (
            <article className="discipline" key={discipline.name}>
              <span>{discipline.number}</span>
              <h3>{discipline.name}</h3>
              <p>{discipline.summary}</p>
            </article>
          ))}
        </div>

        <div className="engagement">
          <div>
            <p className="eyebrow">Engagements</p>
            <h2>Built for technical teams moving from invention to market.</h2>
          </div>
          <ul aria-label="Common Studio Atlas engagement types">
            {modes.map((mode) => (
              <li key={mode}>{mode}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
