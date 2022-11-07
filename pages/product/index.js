import Head from "next/head";
import { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { ParallaxProvider } from "react-scroll-parallax";
import TechnicalChart from "../../components/product/chart";
import ProductHero from "../../components/product/hero";
import OverviewForcast from "../../components/product/overview-forcast";
import StructureAnalysis from "../../components/product/structure-analysis";
import TradingAlert from "../../components/product/trading-alert";
import PublicLayout from "../../components/public-layout";
const Home = (props) => {
  
  return (
    <Fragment>
      <Head>
        <title>Product</title>
        <meta name="description" content="Market Rite side" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ParallaxProvider>
        <PublicLayout>
          <ProductHero />
          <StructureAnalysis />
          <TechnicalChart />
          <TradingAlert />
          <OverviewForcast />
        </PublicLayout>
      </ParallaxProvider>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, {})(Home);
