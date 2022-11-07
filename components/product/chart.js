import { Grid } from "@mui/material";
const TechnicalChart = (props) => {
  return (
    <Grid className="technical-chart-area">
      <Grid className="public-container container">
        <Grid className="product-title">
          <h2 className="title">
            <img src="/images/market.svg" alt="" />
            <span>Advanced Technical Chart</span>
          </h2>
          <p>
            Don’t loose your money by trading blindly. Join with us to get our
            analysis and alerts
          </p>
        </Grid>
        <Grid className="structure-analysis-wrap">
          <strong>
            Market right side is the most significant tool for trading. The
            system of Market Right Side alerts is highly beneficial for the
            beginner as well as advanced traders. The topnotch systems of Market
            Right Side is not only include the prediction of market direction in
            trading but also suggest detailed area to Buy, Sell, Take profits
            and Stop-Loss.
          </strong>
          <p>
            On our system we share education and ideas about how to trade more
            safely and minimise the risk in trading. Remember, you should talk
            with your personal financial advisor first to take trading
            decisions.
          </p>
          <Grid className="text-center">
            <img src="/images/chart.png" alt="" />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default TechnicalChart;
