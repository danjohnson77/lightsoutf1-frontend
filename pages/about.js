import Link from "next/link";

const about = () => {
  return (
    <div className="flex flex-col justify-center h-screen">
      <h1 className="text-3xl mb-5">About LightsOut F1</h1>
      <section className="alt-text">
        <p>
          Welcome to LightsOut F1! I've created this site as an exercise to
          improve my web development skills, in addition to building something
          that highlights the greatest motor racing series on the planet,
          Formula One!
        </p>
        <p className="mt-5">
          This site would not be possible without the{" "}
          <a
            href="https://ergast.com/mrd"
            target="_blank"
            className="underline"
          >
            Ergast Motor Racing API.
          </a>{" "}
          Thanks so much to Ergast for creating such a great resource!
        </p>
        <p className="text-right mt-10">
          Sincerely,
          <br />
          <a
            href="https://www.linkedin.com/in/danjohnson77"
            target="_blank"
            className="underline"
          >
            Daniel Johnson
          </a>
        </p>
      </section>
      <button className="mt-5">
        <a
          href="mailto:dfjdeveloper@gmail.com?subject=LightsOutF1 Inquiry"
          target="blank"
        >
          Contact The Developer
        </a>
      </button>
    </div>
  );
};

export default about;
