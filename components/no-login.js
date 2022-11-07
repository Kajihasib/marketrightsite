import { Button, Grid } from "@mui/material";
import Link from "next/link";
import { Fragment } from "react";

const NoLogin = (props) => {
  return (
    <Fragment>
      <Grid
        className={`no-login-wrap ${props.className ? props.className : ""}`}
      >
        <span className="member-label">
          Already a member?{" "}
          <Link href="/signin">
            <a>Sign In</a>
          </Link>
        </span>
        <h3 className="title">Continue reading with one of the</h3>
        <h4 className="subtitle">
          {" "}
          options below to get <span>Unlimited access</span>{" "}
        </h4>
        <Link href="/signup?mode=trial">
          <Button className="no-login-btn" component="a">
            Start 7 days free trial
          </Button>
        </Link>
        <span className="or-label">
          <span>OR</span>
        </span>
        <h5 className="subscribe">Subscribe & become a member today </h5>
        <Link href="/plans-pricing">
          <Button className="no-login-btn" component="a">
            View Plans & Membership
          </Button>
        </Link>
        <span className="cancel-label">You can cancel any time.</span>
      </Grid>
    </Fragment>
  );
};
export default NoLogin;
