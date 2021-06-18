import { useEffect, useState } from "react";
import "../styles/globals.css";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import { Provider } from "next-auth/client";

function MyApp({ Component, pageProps, router }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);

  return (
    <Provider session={pageProps.session}>
      <Layout route={router.route.replace(/\W/g, "")}>
        {loading ? (
          <div className="min-h-screen flex flex-col justify-center">
            <Loading />
          </div>
        ) : (
          <Component {...pageProps} />
        )}
      </Layout>
    </Provider>
  );
}

export default MyApp;
