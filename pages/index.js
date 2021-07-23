import axios from "axios";
import Countdown from "../components/Countdown";
import News from "../components/News";
import Standings from "../components/Standings";
import TopPredictors from "../components/TopPredictors";
import UserPredict from "../components/UserPredict";

export default function Home({ countdown, news }) {
  return (
    <>
      <Countdown race={countdown} />

      <div className="flex flex-col justify-center lg:grid lg:grid-cols-6 lg:grid-rows-2 lg:gap-4 mt-10">
        <div className="lg:col-span-4 pt-10 lg:pt-0 lg:row-span-2">
          <News data={news} />
        </div>

        <div className="lg:col-span-2 lg:col-start-5  pt-10 lg:pt-0 text-center">
          <Standings />
        </div>

        <div className="lg:col-span-2 pt-10 lg:pt-0 lg:row-span-1 lg:col-start-5 lg:row-start-2">
          <div className="mb-5">
            <UserPredict />
          </div>
          <TopPredictors />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const countdownRes = axios.get(`${process.env.VERCEL_URL}/api/countdown`);

  const newsRes = axios.get(`${process.env.VERCEL_URL}/api/news`);

  const allRes = await axios.all([countdownRes, newsRes]);

  const countdown = allRes[0].data;
  const news = allRes[1].data;

  if (!countdown) {
    return {
      notFound: true,
    };
  }

  return {
    props: { countdown, news },
  };
}
