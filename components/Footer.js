const Footer = () => {
  const d = new Date();
  const year = d.getFullYear();
  return (
    <footer className="flex flex-col justify-between w-full p-5 border-t items-end text-center lg:flex-row">
      <div className="flex">
        <p>
          This site would not be possible without the{" "}
          <a
            href="https://ergast.com/mrd"
            target="_blank"
            className="underline"
            rel="noopener"
          >
            Ergast Motor Racing API.
          </a>
        </p>
      </div>
      <div className="flex mt-5 lg:m-0">
        <p>
          &copy; {year} DFJ Development -{" "}
          <a
            href="mailto:dfjdeveloper@gmail.com?subject=LightsOutF1 Inquiry"
            target="_blank"
            className="underline"
            rel="noopener"
          >
            Contact the Developer
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
