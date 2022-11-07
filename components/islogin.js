import { Button, Grid } from "@mui/material";
import Link from "next/link";
import { Fragment } from "react";

const IsLogin = (props) => {
  return (
    <Fragment>
      <Grid className="no-login-wrap islogin-wrap">
        <h3 className="title">
          To continue reading the market's weekly Overview & Forecast you need
          to upgrade your membership to <span>Universal Plan</span>
        </h3>

        <Link href="/change-plan">
          <Button className="no-login-btn" component="a">
            Upgrade Membership
          </Button>
        </Link>
        <Grid className="text-center">
          <Link href="/plans-pricing">
            <a className="view-plan">
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.71 15.99C8.17063 15.9172 6.71846 15.2542 5.65514 14.1388C4.59181 13.0233 3.99905 11.5411 4 10C4 6.69 6.69 4 10 4C13.22 4 15.84 6.53 15.99 9.71L13.89 9.08C13.7266 8.38678 13.3809 7.74979 12.8889 7.23488C12.3968 6.71996 11.7761 6.34581 11.091 6.15108C10.4059 5.95636 9.68128 5.94814 8.99195 6.12728C8.30262 6.30641 7.67363 6.66639 7.17001 7.17001C6.66639 7.67363 6.30641 8.30262 6.12728 8.99195C5.94814 9.68128 5.95636 10.4059 6.15108 11.091C6.34581 11.7761 6.71996 12.3968 7.23488 12.8889C7.74979 13.3809 8.38678 13.7266 9.08 13.89L9.71 15.99ZM20 10C20 10.3 19.99 10.6 19.96 10.9L17.99 10.31C18 10.21 18 10.1 18 10C18 5.58 14.42 2 10 2C5.58 2 2 5.58 2 10C2 14.42 5.58 18 10 18C10.1 18 10.21 18 10.31 17.99L10.9 19.96C10.6 19.99 10.3 20 10 20C4.48 20 0 15.52 0 10C0 4.48 4.48 0 10 0C15.52 0 20 4.48 20 10ZM16.23 14.26L20 13L10 10L13 20L14.26 16.23L18.53 20.5L20.51 18.52L16.23 14.26Z"
                  fill="#52D305"
                />
              </svg>
              view Our plans & pricing
            </a>
          </Link>
        </Grid>
      </Grid>
    </Fragment>
  );
};
export default IsLogin;
