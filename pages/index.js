import Countdown from "../components/Countdown";
import News from "../components/News";
import Standings from "../components/Standings";
import TopPredictors from "../components/TopPredictors";
import UserPredict from "../components/UserPredict";

export default function Home() {
  return (
    <div className="flex flex-col justify-center lg:grid lg:grid-cols-6 lg:grid-rows-12 lg:gap-4">
      <div className="lg:col-span-full lg:row-span-1 pt-5 lg:py-0">
        <Countdown />
      </div>

      <div className="lg:col-span-4 lg:row-span-5  pt-5 lg:pt-0">
        <News />
      </div>

      <div className="lg:col-span-2 lg:col-start-5  lg:row-span-12 pt-5 lg:pt-0 text-center">
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
