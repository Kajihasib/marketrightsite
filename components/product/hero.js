import { Button, Grid } from "@mui/material";
import Link from "next/link";
import { Parallax } from "react-scroll-parallax";
const ProductHero = (props) => {
  return (
    <Grid className="product-hero-area">
      <Grid className="public-container container">
        <Grid className="row align-items-center">
          <Grid className="col-lg-7 col-12">
            <Grid className="product-hero-content">
              <h1 className="title">
                Grasp the markets with{" "}
                <span translate="no">Market Right Side</span>
              </h1>
              <p className="text">
                Stay one step ahead of the Market Knowing our right side of the
                Market. Our strategy is to help - Position Traders, Swing
                Traders & Long Term Investors.
              </p>
            </Grid>
          </Grid>
          <Grid className="col-lg-5 text-right">
            <Parallax speed={10}>
              <img
                src="/images/product/hero.svg"
                alt="Grasp the markets with Market Right Side"
                className="product-hero-img"
              />
            </Parallax>
          </Grid>
        </Grid>
        <Grid className="row mt-50 align-items-center">
          <Grid className="col-12">
            <Grid className="product-title">
              <h2 className="title">
                <img src="/images/market.svg" alt="" />
                <span translate="no">Market Right Side</span>
              </h2>
              <p>
                Our experts share <span translate="no">market right side</span>{" "}
                everyday
              </p>
            </Grid>
            <p className="right-side-info">
              For us the most important thing in trading is always to know the
              market right side of the time frame(H1, H4, D, W etc) that we
              trade. If we don't know the market right side you can easily lose
              a lot in trading and it can also take months to recover from Long
              Term Investments.
            </p>
          </Grid>
          <Grid className="col-lg-6">
            <Grid className="market-img">
              <img src="/images/right-side.jpg" alt="" />
            </Grid>
          </Grid>
          <Grid className="col-lg-6">
            <Grid className="market-content">
              <h3 className="title">
                Do you want to get access to our Direction Right Side of the
                markets?
              </h3>
              <Link href="/signup?mode=trial">
                <Button className="trial-btn" component="a">
                  Start 7 days Free trial
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default ProductHero;
