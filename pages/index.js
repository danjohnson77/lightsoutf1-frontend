import Countdown from "../components/Countdown";
import News from "../components/News";
import Standings from "../components/Standings";
import TopPredictors from "../components/TopPredictors";
import UserPredict from "../components/UserPredict";

export default function Home({ countdown }) {
  return (
    <div className="flex flex-col justify-center lg:grid lg:grid-cols-6 lg:grid-rows-12 lg:gap-4">
      <div className="lg:col-span-full lg:row-span-1 pt-5 lg:pt-0">
        <Countdown race={countdown} />
      </div>

      <div className="lg:col-span-4 lg:row-span-4  pt-5 lg:pt-0">
        <News />
      </div>

      <div className="lg:col-span-2 lg:col-start-5 lg:row-span-12 pt-5 lg:pt-0 text-center">
        <Standings />
      </div>

      <div className="lg:col-span-3 pt-5 lg:pt-0 lg:row-span-6 h-full">
        <TopPredictors />
      </div>

      <div className="lg:col-span-1 pt-5 lg:pt-0 lg:row-span-6">
        <UserPredict />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const countdownRes = await fetch(`http://localhost:3000/api/countdown`);
  const countdown = await countdownRes.json();

  if (!countdown) {
    return {
      notFound: true,
    };
  }

  return {
    props: { countdown }, // will be passed to the page component as props
  };
}
