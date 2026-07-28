export default function Home() {
  return (
    <main>
      <section className="atlasSection" aria-label="Studio Atlas introduction">
        <div className="wordmark" id="top" aria-label="Studio Atlas">
          Studio Atlas
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
