const services = [
  {
    title: "Brand Positioning",
    copy: "Clarify your offer, message, and market point of view before the first pixel is designed.",
  },
  {
    title: "Web Experience",
    copy: "Premium page structure, responsive layouts, and conversion-ready sections built for iteration.",
  },
  {
    title: "Launch Support",
    copy: "A practical handoff for domains, analytics, updates, and the next round of content edits.",
  },
];

const work = [
  "Executive advisory site",
  "Boutique studio portfolio",
  "Professional services launch",
];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <nav className="nav" aria-label="Main navigation">
          <a className="brand" href="#top" aria-label="Go to homepage">
            Northline Studio
          </a>
          <div className="navLinks">
            <a href="#services">Services</a>
            <a href="#work">Work</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>

        <div className="heroGrid" id="top">
          <div className="heroCopy">
            <p className="eyebrow">Portfolio and business website starter</p>
            <h1>A refined web presence for experts, founders, and service brands.</h1>
            <p className="lead">
              This first version gives you a clean premium structure that is ready
              for domain setup, copy edits, imagery, and deeper customization.
            </p>
            <div className="actions">
              <a className="primaryButton" href="#contact">
                Start editing
              </a>
              <a className="secondaryButton" href="#work">
                View structure
              </a>
            </div>
          </div>

          <aside className="heroPanel" aria-label="Website launch snapshot">
            <p className="panelLabel">Launch snapshot</p>
            <div className="metric">
              <span>01</span>
              <strong>Editable starter live</strong>
            </div>
            <div className="metric">
              <span>02</span>
              <strong>Domain connection ready</strong>
            </div>
            <div className="metric">
              <span>03</span>
              <strong>Built for iterative polish</strong>
            </div>
          </aside>
        </div>
      </section>

      <section className="section" id="services">
        <div className="sectionHeader">
          <p className="eyebrow">Core sections</p>
          <h2>Everything needed for a credible first launch.</h2>
        </div>
        <div className="serviceGrid">
          {services.map((service) => (
            <article className="serviceCard" key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="featureBand" id="work">
        <div>
          <p className="eyebrow">Selected work placeholders</p>
          <h2>Structured for case studies, proof points, and trust signals.</h2>
        </div>
        <div className="workList">
          {work.map((item) => (
            <div className="workItem" key={item}>
              <span>{item}</span>
              <small>Ready to customize</small>
            </div>
          ))}
        </div>
      </section>

      <section className="section split">
        <div>
          <p className="eyebrow">Process</p>
          <h2>A practical path from starter site to polished brand home.</h2>
        </div>
        <ol className="steps">
          <li>
            <span>1</span>
            <p>Replace placeholder content with the real business name, offers, and audience.</p>
          </li>
          <li>
            <span>2</span>
            <p>Add final imagery, testimonials, case studies, and conversion goals.</p>
          </li>
          <li>
            <span>3</span>
            <p>Connect the domain after the registrar and DNS records are confirmed.</p>
          </li>
        </ol>
      </section>

      <section className="cta" id="contact">
        <p className="eyebrow">Next edit</p>
        <h2>Send the domain name and registrar when you are ready to connect it.</h2>
        <p>
          No DNS records need to be changed yet. Once the domain details are known,
          the site can provide the exact records to add.
        </p>
        <a className="primaryButton" href="mailto:hello@example.com">
          hello@example.com
        </a>
      </section>
    </main>
  );
}
