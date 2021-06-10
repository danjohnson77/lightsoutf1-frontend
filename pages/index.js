import Countdown from "../components/Countdown";
import News from "../components/News";
import Standings from "../components/Standings";
import TopPredictors from "../components/TopPredictors";
import UserPredict from "../components/UserPredict";

export default function Home({ countdown, news }) {
  return (
    <>
      <div className="my-5">
        <Countdown race={countdown} />
      </div>
      <div className="flex flex-col justify-center lg:grid lg:grid-cols-6 lg:grid-rows-2 lg:gap-4">
        <div className="lg:col-span-4 pt-5 lg:pt-0 lg:row-span-2">
          <News data={news} />
        </div>

        <div className="lg:col-span-2 lg:col-start-5  pt-5 lg:pt-0 text-center">
          <Standings />
        </div>

        <div className="lg:col-span-2 lg:col-start-5 pt-5 lg:pt-0  ">
          <TopPredictors />
        </div>

        <div className="lg:col-span-1 pt-5 lg:pt-0 lg:row-span-6"></div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const countdownRes = await fetch(`http://localhost:3000/api/countdown`);
  const countdown = await countdownRes.json();

  const newsRes = await fetch(`http://localhost:3000/api/news`);

  const news = await newsRes.json();

  if (!countdown) {
    return {
      notFound: true,
    };
  }

  return {
    props: { countdown, news }, // will be passed to the page component as props
  };
}
