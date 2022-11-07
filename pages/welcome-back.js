import { Button, Grid } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import Cookies from "universal-cookie";
import Footer from "../components/footer";
import Header from "../components/header";

const WelcomeBack = (props) => {
  const router = useRouter();
  const cookie = new Cookies();
  const [userInfo, setUserInfo] = useState(null);
  const user_token = cookie.get("user_token");

  useEffect(() => {
    if (cookie.get("access") == "true") {
      router.back();
    }
    setUserInfo(cookie.get("user_info"));
  }, [cookie.get("access")]);
  useEffect(() => {
    if (!user_token) {
      router.push("/");
    }
  }, [user_token]);
  return (
    <Fragment>
      <Head>
        <title>Welcome Back</title>
        <meta name="description" content="Market Rite side" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Grid className="no-access-area">
        <Grid className="container" container justifyContent="center">
          <Grid item xs={12}>
            <Grid className="welcome-back-wrap">
              <Grid className="welcome-back-body">
                <h4 className="subtitle">Welcome Back, {userInfo?.name}!</h4>
                <h2 className="title">
                  Get global access to our{" "}
                  <span translate="no">Right Side</span>,{" "}
                  <span translate="no">Alerts</span>,{" "}
                  <span translate="no">Charts</span>,{" "}
                  <span translate="no">Forecasts</span> and{" "}
                  <span translate="no">Analysis of Current Structure</span> from
                  a single membership
                </h2>
                <p>No commitments cancel anytime</p>
                <Link href="/update-plan">
                  <Button className="welcome-btn">
                    Restart Your Membership
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Footer className="container" classNameParent="no-position" />
    </Fragment>
  );
};
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, {})(WelcomeBack);
