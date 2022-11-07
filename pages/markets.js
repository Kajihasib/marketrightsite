import { Button, Grid, Tooltip } from "@mui/material";
import moment from "moment/moment";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import Cookies from "universal-cookie";
import HeaderSidebar from "../components/header-navbar";
import {
  getInstumentWithMarketAction,
  getTradingDataAction,
  getTradingImageAction,
} from "../redux/actions/home";

const cookie = new Cookies();

const Markets = (props) => {
  const router = useRouter();
  const [activeClass, setActiveClass] = useState(null);
  const [getInstruments, setInstruments] = useState("");
  const [activeInstrument, setActiveInstrument] = useState(1);
  const [activeTimeFrame, setActiveTimeFrame] = useState(1);
  const handleGetData = (id, data) => {
    setActiveClass(id);
    setInstruments(data);
    setActiveInstrument(0);
    props.getTradingImageAction();
    props.getTradingDataAction();
  };
  useEffect(() => {
    props.getInstumentWithMarketAction();
  }, []);
  useEffect(() => {
    if (props.trading?.timeFrames?.length > 0) {
      props.getTradingImageAction(
        activeInstrument,
        props.trading?.timeFrames[0]?.id
      );
    }
  }, [props.trading?.timeFrames]);

  useEffect(() => {
    setActiveClass(props.markets ? props.markets[0]?.id : 1);
    if (props.markets && props.markets[0]?.instruments[0]?.id) {
      props.getTradingDataAction(props.markets[0]?.instruments[0]?.id);
    }
  }, [props.markets]);
  const new_data = props.markets?.filter((el) => el.id === activeClass);
  const handleGetInstrument = (id) => {
    setActiveInstrument(id);
    props.getTradingDataAction(id);
    props.getTradingImageAction(id, activeTimeFrame);
    setActiveTimeFrame(0);
  };
  const handleTimeframe = (id) => {
    setActiveTimeFrame(id);
    props.getTradingImageAction(activeInstrument, id);
  };
  useEffect(() => {
    setTimeout(() => {
      setActiveClass(props.markets[0]?.id);
    }, 500);
  }, []);
  useEffect(() => {
    if (!cookie.get("user_token")) {
      router.push("/");
    }
  }, [cookie.get("user_token")]);
  return (
    <Fragment>
      <Head>
        <title>Markets</title>
        <meta name="description" content="Market Rite side" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderSidebar>
        <ul className="treding-markets">
          {props.markets?.map((item) => (
            <li key={item.id}>
              <Button
                onClick={() => handleGetData(item.id, item)}
                className={activeClass === item.id ? "active" : ""}
                component="a"
                translate="no"
              >
                <span className="icon">
                  <img
                    src={
                      (item.slug == "bonds" && "/images/markets/bonds.svg") ||
                      (item.slug == "zn(-10-years-t---note)" &&
                        "/images/markets/zn.svg") ||
                      (item.slug == "etf" && "/images/markets/etf.svg") ||
                      (item.slug == "commodities" &&
                        "/images/markets/commodities.svg") ||
                      (item.slug == "stock" && "/images/markets/stock.svg") ||
                      (item.slug == "indices" &&
                        "/images/markets/indices.svg") ||
                      (item.slug == "forex" && "/images/markets/forex.svg") ||
                      (item.slug == "crypto" && "/images/markets/crypto.svg")
                    }
                    alt={item.name}
                  />
                </span>{" "}
                {item.name}
              </Button>
            </li>
          ))}
        </ul>
        <Grid className="market-card-wrap">
          <ul className="currency-items">
            {getInstruments
              ? getInstruments?.instruments?.map((item, i) => (
                  <li key={item.id}>
                    <Button
                      onClick={() => handleGetInstrument(item.id)}
                      className={activeInstrument == item.id ? "active" : ""}
                      component="a"
                      translate="no"
                    >
                      {item.name}
                    </Button>
                  </li>
                ))
              : new_data !== undefined &&
                new_data[0]?.instruments.map((item) => (
                  <li key={item.id}>
                    <Button
                      onClick={() => handleGetInstrument(item.id)}
                      className={activeInstrument == item.id ? "active" : ""}
                      component="a"
                      translate="no"
                    >
                      {item.name}
                    </Button>
                  </li>
                ))}
          </ul>
          <Grid className="chart-wrap">
            <ul className="currency-filter">
              {props.trading?.timeFrames?.map((item) => (
                <li
                  className={activeTimeFrame == item.id ? "active" : ""}
                  key={item.id}
                  onClick={() => handleTimeframe(item.id)}
                  translate="no"
                >
                  {item.short_name}
                </li>
              ))}
            </ul>
            {props.trading_image?.path ? (
              <img
                src={props.trading_image?.path}
                alt={props.trading_image?.name}
              />
            ) : (
              <p className="nodata">No Chart Found</p>
            )}

            <Grid className="text-right update-time">
              Last Update:{" "}
              {moment(props.trading_image?.updated_at).format("DD.MM.YYYY")}
            </Grid>
          </Grid>
          <Grid className="market-card">
            <h4 className="table-title">
              <span translate="no"> Right Side </span>
              <Tooltip
                className="tooltip"
                title="Text here"
                arrow
                placement="right-end"
              >
                <img src="/images/info.png" alt="info" />
              </Tooltip>
            </h4>
            <Grid className="table-responsive">
              <table className="table-style">
                <thead>
                  <tr>
                    <th>Instrument</th>
                    <th>Time Frame</th>
                    <th>Right Side</th>
                    <th>Turning</th>
                    <th>Near Term</th>
                    <th>Last Update</th>
                  </tr>
                </thead>
                {props.trading?.marketUpdates?.length > 0 ? (
                  <tbody>
                    <tr>
                      <td rowSpan={7}>
                        <strong>{props.trading?.instrument?.name}</strong>
                      </td>
                    </tr>

                    {props.trading?.marketUpdates?.map((item) => (
                      <tr key={item.id}>
                        <td>
                          {props.trading?.timeFrames
                            ?.filter((ind) => ind.id == item.time_frame_id)
                            ?.map((item) => (
                              <Fragment key={item.id}>
                                {item.short_name}
                              </Fragment>
                            ))}
                        </td>
                        <td>{item.right_side ? item.right_side : "-"}</td>
                        <td>{item.turning ? item.turning : "-"}</td>
                        <td>{item.near_term ? item.near_term : "-"}</td>
                        <td translate="no">
                          {moment(item.right_side_update).format(
                            "DD MMM YYYY m:hA"
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <tbody>
                    <tr>
                      <td colSpan={7}>No Data Found</td>
                    </tr>
                  </tbody>
                )}
              </table>
            </Grid>
          </Grid>
          <Grid className="market-card">
            <h4 className="table-title">
              <span translate="no">Analysis of Current Structure </span>
              <Tooltip
                className="tooltip"
                title="Text here"
                arrow
                placement="right-end"
              >
                <img src="/images/info.png" alt="info" />
              </Tooltip>
            </h4>
            <Grid className="table-responsive">
              <table className="table-style">
                <thead>
                  <tr>
                    <th>Instrument</th>
                    <th>Time Frame</th>
                    <th>Direction</th>
                    <th>Target 2 Area</th>
                    <th>Last Update</th>
                  </tr>
                </thead>
                {props.trading?.marketUpdates?.length > 0 ? (
                  <tbody>
                    <tr>
                      <td rowSpan={6}>
                        <strong>{props.trading?.instrument?.name}</strong>
                      </td>
                    </tr>
                    {props.trading?.marketUpdates?.map((item) => (
                      <tr key={item.id}>
                        <td>
                          {props.trading?.timeFrames
                            ?.filter((ind) => ind.id == item.time_frame_id)
                            ?.map((item) => (
                              <Fragment key={item.id}>
                                {item.short_name}
                              </Fragment>
                            ))}
                        </td>
                        <td
                          className={`${
                            (item.direction == "Bullish" && "bullish") ||
                            (item.direction == "Bearish" && "bearish") ||
                            (item.direction == "Side way" && "side-way")
                          }`}
                        >
                          {item.direction ? item.direction : "-"}
                        </td>
                        <td>{item.target_2 ? item.target_2 : "-"}</td>
                        <td translate="no">
                          {moment(item.current_sequence_update).format(
                            "DD MMM YYYY m:hA"
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <tbody>
                    <tr>
                      <td colSpan={6}>No Data Found</td>
                    </tr>
                  </tbody>
                )}
              </table>
            </Grid>
          </Grid>
          <Grid className="market-card">
            <h4 className="table-title">
              <span translate="no">Trading Alert Area</span>
              <Tooltip
                className="tooltip"
                title="Text here"
                arrow
                placement="right-end"
              >
                <img src="/images/info.png" alt="info" />
              </Tooltip>
            </h4>
            <Grid className="table-responsive">
              <table className="table-style">
                <thead>
                  <tr>
                    <th>Instrument</th>
                    <th>Time Frame</th>
                    <th>Buy Area</th>
                    <th>Sell Area</th>
                    <th>Stop-Loss Area</th>
                    <th>Target 1 Area</th>
                    <th>Target 2 Area</th>
                    <th>Status</th>
                    <th>Last Update</th>
                  </tr>
                </thead>
                {props.trading?.marketUpdates?.length > 0 ? (
                  <tbody>
                    <tr>
                      <td rowSpan={7}>
                        <strong>{props.trading?.instrument?.name}</strong>
                      </td>
                    </tr>
                    {props.trading?.marketUpdates?.map((item) => (
                      <tr key={item.id}>
                        <td>
                          {props.trading?.timeFrames
                            ?.filter((ind) => ind.id == item.time_frame_id)
                            ?.map((item) => (
                              <Fragment key={item.id}>
                                {item.short_name}
                              </Fragment>
                            ))}
                        </td>
                        <td>{item.buy_entry ? item.buy_entry : "-"}</td>
                        <td>{item.sell_entry ? item.sell_entry : "-"}</td>
                        <td>
                          {item.stop_loss_entry ? item.stop_loss_entry : "-"}
                        </td>
                        <td>{item.target_1 ? item.target_1 : "-"}</td>
                        <td>{item.target_2 ? item.target_2 : "-"}</td>
                        <td>{item.status ? item.status : "-"}</td>
                        <td translate="no">
                          {moment(item.trading_signal_update).format(
                            "DD MMM YYYY m:hA"
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <tbody>
                    <tr>
                      <td colSpan={9}>No Data Found</td>
                    </tr>
                  </tbody>
                )}
              </table>
            </Grid>
          </Grid>
        </Grid>
      </HeaderSidebar>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  markets: state.home.markets,
  trading: state.home.trading_data,
  trading_image: state.home.trading_image,
});
export default connect(mapStateToProps, {
  getInstumentWithMarketAction,
  getTradingDataAction,
  getTradingImageAction,
})(Markets);
