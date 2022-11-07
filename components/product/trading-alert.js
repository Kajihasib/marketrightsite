import { Button, Grid } from "@mui/material";
import Link from "next/link";
const TradingAlert = (props) => {
  return (
    <Grid className="trading-alert-area">
      <Grid className="public-container container">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-8">
            <Grid className="product-title">
              <h2 className="title">
                <img src="/images/market.svg" alt="" />
                <span translate="no">Trading Alert</span>
              </h2>
              <p>
                Our experts share alerts when correlations with the market and
                enough consistent data are available
              </p>
            </Grid>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col-lg-5">
            <div className="trading-alert-wrap">
              <h3 className="title">
                Trading the Right Side with higher direction probabilities
              </h3>
              <p>
                To be updated with higher direction probabilities. You can join
                with us and take your own trading decisions.
              </p>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="trading-alert-img">
              <img
                src="/images/alert-shape.svg"
                alt="shape"
                className="shape up-down"
              />
              <img className="image" src="/images/alert.png" alt="alert" />
            </div>
          </div>
        </div>
        <h3 className="consistent-title">
          We always share <span>Consistent</span> alerts!
        </h3>
        <div className="row">
          <div className="col-12 col-lg-6">
            <div className="trading-img">
              <img src="/images/swing.jpg" alt="swing" />
              <p className="label">Swing Trading alert</p>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="trading-img">
              <img src="/images/position.jpg" alt="position" />
              <p className="label">
                Position Trading and Long Term Investment alert
              </p>
            </div>
          </div>
        </div>
        <h3 className="alert-title">
          Get instant access to our Trading Alerts
        </h3>
        <div className="text-center">
          <Link href="/signup?mode=trial">
            <Button className="trial-btn" component="a">
              Start 7 days Free trial
            </Button>
          </Link>
        </div>
      </Grid>
    </Grid>
  );
};
export default TradingAlert;
