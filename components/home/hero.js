import { Button, Grid } from "@mui/material";
import Link from "next/link";
import { Reveal } from "react-awesome-reveal";
import { Parallax } from "react-scroll-parallax";
import SpacewormsLeft from "../spacewormsLeft";
const Hero = (props) => {
  return (
    <Parallax speed={10} className="hero-area">
      <Grid className="public-container container">
        <Grid className="row">
          <Grid className="col-lg-6">
            <Grid className="hero-content">
              <Reveal className="fadeInUp" triggerOnce>
                <h1 className="title">
                  Stay one step ahead of the Market Knowing our right side of
                  the Market
                </h1>
              </Reveal>
              <Reveal className="fadeInUp" triggerOnce>
                <p className="text">
                  Based on advanced technical analysis, knowing at all times the
                  momentum direction
                </p>
              </Reveal>
              <Reveal className="fadeInUp" triggerOnce>
                <h4 className="subtitle" translate="no">
                  RIGHT SIDE OF THE MARKET
                </h4>
              </Reveal>
              <Reveal className="fadeInUp" triggerOnce>
                <h3 className="sale-buy">TO BUY, SELL OR STAY AWAY</h3>
              </Reveal>
              <ul className="hero-btns">
                <li>
                  <Reveal className="fadeInUp" triggerOnce>
                    <Link href="/product">
                      <Button component="a">Check our products</Button>
                    </Link>
                  </Reveal>
                </li>
                <li>
                  <Reveal className="fadeInUp" triggerOnce>
                    <Link href="/signup?mode=trial">
                      <Button className="trial" component="a">
                        Start 7 days Free trial
                      </Button>
                    </Link>
                  </Reveal>
                </li>
              </ul>
            </Grid>
          </Grid>
          <Grid className="col-lg-6">
            <Reveal className="fadeInRight" triggerOnce>
              <Parallax speed={-10}>
                <Grid className="hero-img">
                  <img
                    src="/images/hero.svg"
                    alt="Stay one step ahead of the Market Knowing our right side of the Market"
                  />
                </Grid>
              </Parallax>
            </Reveal>
          </Grid>
        </Grid>
      </Grid>
      <SpacewormsLeft className="hero-shape">
        <img src="/images/hero-shape.png" alt="" />
      </SpacewormsLeft>
    </Parallax>
  );
};
export default Hero;
