import { Grid } from "@mui/material";
const StructureAnalysis = (props) => {
  return (
    <Grid className="structure-analysis-area">
      <Grid className="public-container container">
        <Grid className="row justify-content-center">
          <Grid className="col-xl-9 col-lg-10 col-12">
            <Grid className="product-title">
              <h2 className="title">
                <img src="/images/market.svg" alt="" />
                <span translate="no">Structure Analysis</span>
              </h2>
              <p>
                Our experts share structure update everyday in order to let you
                know the instruments and the time frames(H1, H4, D, W etc.)
                which are Bullish or Bearish.
              </p>
            </Grid>
            <img
              className="analysis-image"
              src="/images/analysis.png"
              alt="analysis"
            />
          </Grid>
        </Grid>
        <Grid className="warning-wrap">
          <span className="label">WARNING</span>
          <p>
            According to our knowledge and experience we only must trade Bullish
            (Buy) and Bearish(Sell) Structures if we want to be consistent in
            trading.
          </p>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default StructureAnalysis;
