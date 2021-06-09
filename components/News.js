const News = () => {
  return (
    <>
      <h1>LATEST NEWS</h1>
      <section className="w-full font-secondary">
        <div className="p-5 flex flex-col bg-offBlack">
          <h2 className="text-3xl mb-2">VETTEL TO SIGN WITH MERCEDES</h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam
            placeat beatae culpa illo natus vel facere aut ex totam dolorum!
          </p>
          <p className="justify-end w-full text-right mt-2">MORE...</p>
        </div>
        <div className="mt-5">
          <h2 className="w-full font-heading text-center">MORE NEWS</h2>
          <ul className="alt-list news-list bg-offBlack">
            <li>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem, ad.
            </li>
            <li>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem, ad.
            </li>
            <li>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem, ad.
            </li>
            <li>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem, ad.
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default News;
