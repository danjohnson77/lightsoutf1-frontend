const News = ({ data }) => {
  return (
    <>
      <h1>LATEST NEWS</h1>
      <section className="w-full font-secondary ">
        <div className="p-5 flex flex-col bg-offBlack">
          <a href={data[0].link} target="_blank">
            <h2 className="text-3xl mb-2">{data[0].title}</h2>
            <p>{data[0].description}</p>

            <p className="justify-end w-full text-right mt-2">MORE...</p>

            <div className="flex flex-col text-xs mt-4 text-right">
              <p className="">{data[0].pubDate}</p>
              <p>{data[0].source}</p>
            </div>
          </a>
        </div>
        <div className="mt-5">
          <h2 className="w-full font-heading text-center">MORE NEWS</h2>
          <ul className="alt-list news-list bg-offBlack">
            {data.map((item, index) => {
              const { title, pubDate, source } = item;
              if (index === 0) {
                return;
              } else {
                return (
                  <li className="flex flex-col" key={index}>
                    <a href={item.link} target="_blank">
                      {title}
                    </a>
                    <div className="flex flex-col text-xs mt-4 text-right">
                      <p className="">{pubDate}</p>
                      <p>{source}</p>
                    </div>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </section>
    </>
  );
};

export default News;
