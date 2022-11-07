import Head from "next/head";
import { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { ParallaxProvider } from "react-scroll-parallax";
import Advantages from "../components/home/advantages";
import BrakingNews from "../components/home/braking";
import ChoicesAndService from "../components/home/choices-and-services";
import Hero from "../components/home/hero";
import RightSideHub from "../components/home/right-side-hub";
import Testmonial from "../components/home/testmonial";
import Trading from "../components/home/trading";
import PublicLayout from "../components/public-layout";
import {
  getBrakingNewsAction,
  getClientReviewAction,
  getTradingDetailsAction,
} from "../redux/actions/public";
const Home = (props) => {
  useEffect(() => {
    props.getBrakingNewsAction();
    props.getTradingDetailsAction();
    props.getClientReviewAction();
  }, []);

  return (
    <Fragment>
      <Head>
        <title>Home</title>
        <meta name="description" content="Market Rite side" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ParallaxProvider>
        <PublicLayout>
          <Hero />
          <Trading trading={props.trading} />
          <BrakingNews news={props.braking_news} />
          <ChoicesAndService />
          <Advantages />
          <RightSideHub />
          <Testmonial clients={props.clients} />
        </PublicLayout>
      </ParallaxProvider>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  braking_news: state.public.braking_news,
  trading: state.public.trading,
  clients: state.public.clients,
});
export default connect(mapStateToProps, {
  getBrakingNewsAction,
  getTradingDetailsAction,
  getClientReviewAction,
})(Home);
