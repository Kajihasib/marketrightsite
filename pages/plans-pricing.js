import { Button, Grid } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { Fragment } from "react";
import { connect } from "react-redux";
import { ParallaxProvider } from "react-scroll-parallax";
import PublicLayout from "../components/public-layout";
const Pricing = (props) => {
  return (
    <Fragment>
      <Head>
        <title>Choose the best plan for you</title>
        <meta name="description" content="Market Rite side" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ParallaxProvider>
        <PublicLayout>
          <Grid className="pricing-area">
            <Grid className="container public-container">
              <Grid className="row justify-content-center">
                <Grid className="col-lg-10 col-12">
                  <Grid className="pricing-title">
                    <h1 className="title">
                      <svg
                        width="63"
                        height="63"
                        viewBox="0 0 63 63"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M55.6198 42.818C55.606 42.794 55.587 42.7745 55.5719 42.7518L55.5732 42.7512L38.623 13.3938L38.6136 13.3988C38.4737 13.1756 38.2697 12.9998 38.0283 12.8942L38.0523 12.8804L33.0211 9.97479L38.6098 19.6547L51.3219 41.6726L51.3207 41.6732C51.3358 41.6959 51.3547 41.7155 51.3686 41.7394C51.543 42.0419 51.5902 42.4012 51.4999 42.7385C51.4095 43.0757 51.1889 43.3633 50.8866 43.538L50.8954 43.5538L32.083 54.415L32.8976 55.8256C32.914 55.8602 32.9253 55.8961 32.9448 55.9301C33.1147 56.2232 33.3912 56.4393 33.7166 56.5333C34.0421 56.6274 34.3912 56.5921 34.6912 56.4348L34.6944 56.4398L55.1473 44.6317L55.1385 44.616C55.4406 44.4413 55.6611 44.1537 55.7513 43.8166C55.8416 43.4794 55.7943 43.1202 55.6198 42.818Z"
                          fill="#007BFF"
                        />
                        <path
                          d="M46.5441 42.3001C46.8464 42.1254 47.067 41.8378 47.1573 41.5005C47.2477 41.1633 47.2005 40.8039 47.0261 40.5014C47.0122 40.4775 46.9933 40.458 46.9782 40.4353L46.9794 40.4347L30.0293 11.0773L30.0198 11.0823C29.8799 10.8591 29.6759 10.6833 29.4346 10.5777L29.4585 10.5638L22.5222 6.55893V6.58665C22.3466 6.48659 22.1503 6.42845 21.9486 6.41675C21.7469 6.40506 21.5452 6.44013 21.3592 6.51924L21.3517 6.50601L21.2219 6.58098C21.2194 6.58287 21.2162 6.58287 21.2137 6.58476C21.2112 6.58665 21.2093 6.58854 21.2061 6.5898L7.86084 14.2947C7.66532 14.4078 7.5024 14.5696 7.38792 14.7644C7.27344 14.9591 7.2113 15.1802 7.20753 15.406L7.20312 15.4035V23.4133L7.21635 23.4058C7.18674 23.6748 7.23525 23.9551 7.38078 24.2078C7.3896 24.2229 7.40094 24.2342 7.41039 24.2487L24.3038 53.5097C24.3202 53.5443 24.3316 53.5802 24.3511 53.6143C24.521 53.9073 24.7975 54.1234 25.1229 54.2175C25.4483 54.3115 25.7975 54.2762 26.0975 54.1189L26.1006 54.1239L46.5536 42.3158L46.5441 42.3001V42.3001ZM18.6131 17.3389C18.196 17.5797 17.7168 17.6914 17.2363 17.6599C16.7557 17.6284 16.2952 17.4551 15.9132 17.1619C15.5311 16.8687 15.2445 16.4688 15.0898 16.0127C14.935 15.5566 14.9189 15.0649 15.0436 14.5997C15.1683 14.1345 15.4281 13.7168 15.7903 13.3993C16.1524 13.0818 16.6006 12.8788 17.0781 12.816C17.5556 12.7532 18.041 12.8334 18.4729 13.0465C18.9048 13.2596 19.2638 13.596 19.5045 14.0131C19.6646 14.2899 19.7685 14.5956 19.8103 14.9127C19.8521 15.2297 19.831 15.5519 19.7482 15.8608C19.6654 16.1697 19.5226 16.4592 19.3278 16.7128C19.133 16.9664 18.8901 17.1792 18.6131 17.3389Z"
                          fill="#007BFF"
                        />
                      </svg>
                      Choose the best plan for you
                    </h1>
                    <p>
                      Below you will see what's included in each subscription
                      level and a comparison between different plans. This
                      should help you decide which Subscription level would best
                      serve you. If you have any further questions please do not
                      hesitate to contact our Support.
                    </p>
                  </Grid>
                </Grid>
              </Grid>

              <ul className="pricing-tab">
                <li className="active">
                  <img src="/images/tab.svg" alt="" /> Basic
                </li>
                <li>
                  <img src="/images/tab.svg" alt="" />
                  Advance
                </li>
                <li>
                  <img src="/images/tab.svg" alt="" />
                  Universal
                </li>
                <li>
                  <img src="/images/tab.svg" alt="" />
                  Trailor Made
                </li>
              </ul>
              <div className="pricing-wrapper">
                <div className="text-center">
                  <ul className="pricing-quantity-tab">
                    <li className="active">Monthly</li>
                    <li>Quaterly</li>
                    <li>Half Yearly</li>
                    <li>Half Yearly</li>
                  </ul>
                </div>
                <div className="pricing-wrap">
                  <div className="pricing-card">
                    <h4 className="price">$15</h4>
                    <h3 className="title">
                      <svg
                        width="33"
                        height="30"
                        viewBox="0 0 33 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M32.6562 26.9318H3.09375V0.340909C3.09375 0.153409 2.93906 0 2.75 0H0.34375C0.154687 0 0 0.153409 0 0.340909V29.6591C0 29.8466 0.154687 30 0.34375 30H32.6562C32.8453 30 33 29.8466 33 29.6591V27.2727C33 27.0852 32.8453 26.9318 32.6562 26.9318ZM6.1875 24.2045H29.2187C29.4078 24.2045 29.5625 24.0511 29.5625 23.8636V5.28409C29.5625 4.97727 29.1887 4.82812 28.9738 5.04119L19.9375 14.0028L14.5492 8.71875C14.4846 8.65531 14.3974 8.61972 14.3064 8.61972C14.2155 8.61972 14.1283 8.65531 14.0637 8.71875L5.94258 16.7983C5.91104 16.8296 5.88606 16.8669 5.8691 16.9078C5.85214 16.9488 5.84352 16.9927 5.84375 17.0369V23.8636C5.84375 24.0511 5.99844 24.2045 6.1875 24.2045Z"
                          fill="#041C5C"
                        />
                      </svg>
                      Swing Traders
                    </h3>
                    <p className="text">What You’ll Get</p>
                    <ul className="list">
                      <li>15 instrument</li>
                      <li>H1,H4,D,W Swing Trading alert</li>
                      <li>Market Overview</li>
                      <li>Bear, Bull, Stracture</li>
                      <li>24 Hour Support</li>
                      <li>Economic Calender</li>
                      <li>Sequential analysis</li>
                      <li>Consistent signals</li>
                      <li>Technical analysis</li>
                    </ul>
                    <Link href="/">
                      <Button component="a" className="pricing-btn">
                        Choose Plan
                      </Button>
                    </Link>
                  </div>
                  <div className="pricing-card">
                    <h4 className="price">$15</h4>
                    <h3 className="title">
                      <svg
                        width="33"
                        height="30"
                        viewBox="0 0 33 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M32.6562 26.9318H3.09375V0.340909C3.09375 0.153409 2.93906 0 2.75 0H0.34375C0.154687 0 0 0.153409 0 0.340909V29.6591C0 29.8466 0.154687 30 0.34375 30H32.6562C32.8453 30 33 29.8466 33 29.6591V27.2727C33 27.0852 32.8453 26.9318 32.6562 26.9318ZM6.1875 24.2045H29.2187C29.4078 24.2045 29.5625 24.0511 29.5625 23.8636V5.28409C29.5625 4.97727 29.1887 4.82812 28.9738 5.04119L19.9375 14.0028L14.5492 8.71875C14.4846 8.65531 14.3974 8.61972 14.3064 8.61972C14.2155 8.61972 14.1283 8.65531 14.0637 8.71875L5.94258 16.7983C5.91104 16.8296 5.88606 16.8669 5.8691 16.9078C5.85214 16.9488 5.84352 16.9927 5.84375 17.0369V23.8636C5.84375 24.0511 5.99844 24.2045 6.1875 24.2045Z"
                          fill="#041C5C"
                        />
                      </svg>
                      Long/ Position Traders
                    </h3>
                    <p className="text">What You’ll Get</p>
                    <ul className="list">
                      <li>15 instrument</li>
                      <li>H1,H4,D,W Swing Trading alert</li>
                      <li>Market Overview</li>
                      <li>Bear, Bull, Stracture</li>
                      <li>24 Hour Support</li>
                      <li>Economic Calender</li>
                      <li>Sequential analysis</li>
                      <li>Consistent signals</li>
                      <li>Technical analysis</li>
                    </ul>
                    <Link href="/">
                      <Button component="a" className="pricing-btn">
                        Choose Plan
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </PublicLayout>
      </ParallaxProvider>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, {})(Pricing);
