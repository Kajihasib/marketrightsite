import { Grid } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import Cookies from "universal-cookie";
import { getCurrentPlanInfoAction } from "../../redux/actions/home";
import { getPublicOverviewAction } from "../../redux/actions/public";
import IsLogin from "../islogin";
import NoLogin from "../no-login";
const OverviewForcast = (props) => {
  const [activeClass, setActiveClass] = useState(1);
  const [overview, setOverview] = useState("");
  const [token, setToken] = useState("");
  const cookie = new Cookies();

  useEffect(() => {
    props.getPublicOverviewAction();
  }, []);
  useEffect(() => {
    setToken(cookie.get("user_token"));
    props.getCurrentPlanInfoAction();
  }, [cookie.get("user_token")]);
  const handleGetData = (id, data) => {
    setActiveClass(id);
    setOverview(data);
  };
  const new_data = props.overviews
    ?.filter((el) => el.overview_types?.id === 1)
    .map((item) => item.overview);

  return (
    <Fragment>
      <Grid className="overview-forcast-area">
        <Grid className="public-container container">
          <Grid className="plr-15">
            <Grid className="product-title">
              <h2 className="title mb-30">
                <img src="/images/market.svg" alt="" />
                <span translate="no">Overview & Forecast</span>
              </h2>
              <p className="text-left">
                You will get market overview and forecast here. Don’t need to be
                panic about market news. Normally once if they are not
                structural (Example - Central Banks Interest Rates and Big
                Bankruptcy Group or Company etc.) the news comes after to
                justify the chart price actions and they do not forecast the
                markets.
              </p>
            </Grid>
            <ul className="overview-forcast-filtar">
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
          {token ? (
            props.current_plan_info?.is_universal == "No" ? (
              <IsLogin />
            ) : null
          ) : (
            <NoLogin />
          )}
        </Grid>
      </Grid>
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
})(OverviewForcast);
