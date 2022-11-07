import Head from "next/head";
import { Fragment } from "react";
import { connect } from "react-redux";
import HeaderSidebar from "../components/header-navbar";
const Dashboard = (props) => {
  return (
    <Fragment>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Market Rite side" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderSidebar>
        <div className="card-wrap">
          <div className="card-body">
            <h4 className="update-schedule-title">Dashboard</h4>
          </div>
        </div>
      </HeaderSidebar>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, {})(Dashboard);
