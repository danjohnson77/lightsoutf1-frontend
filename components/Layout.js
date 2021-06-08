import Head from "next/head";
import Footer from "./Footer";
import Nav from "./Nav";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>LightsOutF1 Racing</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <main className="w-11/12 max-w-6xl mx-auto font-heading">{children}</main>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
