import { Grid } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import HeaderSidebar from "../components/header-navbar";
import { getCurrentPlanInfoAction } from "../redux/actions/home";
import { getPublicOverviewAction } from "../redux/actions/public";

const MarketOverview = (props) => {
  const [activeClass, setActiveClass] = useState(1);
  const [overview, setOverview] = useState("");
  const router = useRouter();

  useEffect(() => {
    props.getPublicOverviewAction();
  }, []);
  const handleGetData = (id, data) => {
    setActiveClass(id);
    setOverview(data);
  };
  const new_data = props.overviews
    ?.filter((el) => el.overview_types?.id === 1)
    .map((item) => item.overview);
  useEffect(() => {
    if (props.current_plan_info?.is_universal == "No") {
      router.push("/change-plan");
    }
  }, [props.current_plan_info]);
  return (
    <Fragment>
      <Head>
        <title>Market Overview</title>
        <meta name="description" content="Market Rite side" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderSidebar>
        <Grid className="card-wrap">
          <Grid className="card-body">
            <ul className="overview-filter">
              {props.overviews?.map((item) => (
                <li
                  key={item.overview_types?.id}
                  onClick={() =>
                    handleGetData(item.overview_types?.id, item.overview)
                  }
                  className={
                    activeClass === item.overview_types?.id ? "active" : ""
                  }
                >
                  {item.overview_types?.name}
                </li>
              ))}
            </ul>
            {overview ? (
              <Grid className="public-overview-wrap">
                <div
                  className="description"
                  dangerouslySetInnerHTML={{
                    __html: overview,
                  }}
                />
              </Grid>
            ) : (
              <Grid className="public-overview-wrap">
                <div
                  className="description"
                  dangerouslySetInnerHTML={{
                    __html: new_data,
                  }}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
      </HeaderSidebar>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  overviews: state.public.overviews,
  current_plan_info: state.home.current_plan_info,
});
export default connect(mapStateToProps, {
  getPublicOverviewAction,
  getCurrentPlanInfoAction,
})(MarketOverview);
