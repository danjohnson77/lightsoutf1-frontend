import Head from "next/head";
import Footer from "./Footer";
import Nav from "./Nav";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>LightsOutF1 Racing</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>
      <Nav />
      <main className="lg:max-w-6xl lg:px-10 px-5 font-heading mx-auto mb-24 pb-10">
        {children}
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
