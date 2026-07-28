export default function Home() {
  return (
    <main>
      <section className="atlasSection" aria-label="Studio Atlas introduction">
        <div className="wordmark" id="top" aria-label="Studio Atlas">
          <svg
            className="wordmarkDesktop"
            viewBox="0 0 1000 170"
            preserveAspectRatio="none"
            role="presentation"
          >
            <text x="0" y="142" textLength="1000" lengthAdjust="spacingAndGlyphs">
              StudioAtlas
            </text>
          </svg>
          <svg
            className="wordmarkMobile"
            viewBox="0 0 1000 340"
            preserveAspectRatio="none"
            role="presentation"
          >
            <text x="0" y="142" textLength="1000" lengthAdjust="spacingAndGlyphs">
              Studio
            </text>
            <text x="0" y="312" textLength="1000" lengthAdjust="spacingAndGlyphs">
              Atlas
            </text>
          </svg>
        </div>

        <div className="projectStrip" aria-label="Studio Atlas visual range">
          <figure className="projectTile tileOne">
            <figcaption>Brand campaign system</figcaption>
          </figure>
          <figure className="projectTile tileTwo">
            <figcaption>Hardware material study</figcaption>
          </figure>
          <figure className="projectTile tileThree">
            <figcaption>Packaging and print suite</figcaption>
          </figure>
          <figure className="projectTile tileFour">
            <figcaption>Launch packaging prototype</figcaption>
          </figure>
          <figure className="projectTile tileFive">
            <figcaption>Software and campaign wall</figcaption>
          </figure>
          <figure className="projectTile tileSix">
            <figcaption>Studio mark exploration</figcaption>
          </figure>
        </div>
      </section>
    </main>
  );
}
