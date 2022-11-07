import { Grid } from "@mui/material";

const Advantages = (props) => {
  return (
    <Grid className="advantage-area pb-100">
      <Grid className="public-container container">
        <Grid className="row">
          <Grid className="col-12">
            <Grid className="choices-title">
              <h2 className="title">
                Discover the Advantages of Signing With Us
              </h2>
              <p className="mb-0">Why you should join with us?</p>
            </Grid>
          </Grid>
          <Grid className="col-lg-4 col-md-6 col-12">
            <Grid className="advantage-wrap">
              <span className="icon">
                <img src="/images/advantages/icon1.svg" alt="" />
              </span>
              <h4 className="title">
                Trading the Right Side with higher direction probabilities
              </h4>
              <p>
                Knowing the right side in the time frames that we trade can help
                us to do less mistake in trading as the right side is always one
                direction probability.
              </p>
            </Grid>
          </Grid>

          <Grid className="col-lg-4 col-md-6 col-12">
            <Grid className="advantage-wrap">
              <span className="icon">
                <img src="/images/advantages/icon2.svg" alt="" />
              </span>
              <h4 className="title">Trading Alert</h4>
              <p>
                Our experienced analysts always work hard in different time
                frames of 70+ instruments to identify the possible trading
                opportunities.
              </p>
            </Grid>
          </Grid>
          <Grid className="col-lg-4 col-md-6 col-12">
            <Grid className="advantage-wrap">
              <span className="icon">
                <img src="/images/advantages/icon3.svg" alt="" />
              </span>
              <h4 className="title">70+ Instruments</h4>
              <p>
                Get access to our professional learning platform that is
                developed by experienced analysts and trading experts
              </p>
            </Grid>
          </Grid>
          <Grid className="col-lg-4 col-md-6 col-12">
            <Grid className="advantage-wrap">
              <span className="icon">
                <img src="/images/advantages/icon4.svg" alt="" />
              </span>
              <h4 className="title">24/7 Client Support</h4>
              <p>
                Our target is to help you succeed and our support team is
                available to answer you 24/7.
              </p>
            </Grid>
          </Grid>
          <Grid className="col-lg-4 col-md-6 col-12">
            <Grid className="advantage-wrap">
              <span className="icon">
                <img src="/images/advantages/icon5.svg" alt="" />
              </span>
              <h4 className="title"> Daily Update</h4>
              <p>
                We'll do our markets complex analysis and choices daily and
                share with you.
              </p>
            </Grid>
          </Grid>
          <Grid className="col-lg-4 col-md-6 col-12">
            <Grid className="advantage-wrap">
              <span className="icon">
                <img src="/images/advantages/icon6.svg" alt="" />
              </span>
              <h4 className="title">Leading Technical Strategy & Education</h4>
              <p>
                We share detailed analysis of technical and fundamental
                structures with the aim of helping and educating traders.
              </p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid className="advantage-shape">
        <img src="/images/cap.png" alt="cap" />
      </Grid>
    </Grid>
  );
};
export default Advantages;
