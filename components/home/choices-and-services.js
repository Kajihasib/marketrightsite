import { Grid } from "@mui/material";

const ChoicesAndService = (props) => {
  return (
    <Grid className="choices-area">
      <Grid className="public-container container">
        <Grid className="choices-title">
          <h2 className="title">
            Our powerful own choices and services to wealth your trading
          </h2>
          <p>Trading warning for thousands of traders</p>
          <h3 className="subtitle">Who we are?</h3>
        </Grid>
        <Grid className="row">
          <Grid className="col-lg-6">
            <ul className="choices-items">
              <li translate="no">
                <img src="/images/choices/icon1.svg" alt="" /> Stocks, Indices,
                Commodities, ETF, Forex, etc
              </li>
              <li>
                <img src="/images/choices/icon2.svg" alt="" /> Bear, Bull or
                Sideways Structure and Alerts
              </li>
              <li translate="no">
                <img src="/images/choices/icon3.svg" alt="" /> Swing trade,
                Position trade, Long Term Investor, and Tailor Solutions
              </li>
              <li>
                <img src="/images/choices/icon4.svg" alt="" /> Weekly, Quarterly
                & Yearly Forecast
              </li>
            </ul>
          </Grid>
          <Grid className="col-lg-6">
            <ul className="choices-items">
              <li translate="no">
                <img src="/images/choices/icon5.svg" alt="" /> Position size and
                Risk/Reward Calculator
              </li>
              <li>
                <img src="/images/choices/icon6.png" alt="" /> Our Strategy
              </li>
              <li translate="no">
                <img src="/images/choices/icon7.svg" alt="" /> Market and
                Trading News
              </li>
              <li>
                <img src="/images/choices/icon4.svg" alt="" /> Economic Calendar
              </li>
            </ul>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default ChoicesAndService;
