import { Grid } from "@mui/material";
import Link from "next/link";
import { Fragment } from "react";
import LanguageSwitcher from "./language-switcher";

const PublicHeader = () => {
  return (
    <Fragment>
      <header className="headr-area">
        <Grid className="container public-container">
          <Grid className="row align-items-center">
            <Grid className="col-md-6 col-12">
              <Link href="/">
                <a className="logo">
                  <img src="/images/logo.svg" alt="logo" />
                </a>
              </Link>
            </Grid>
            <Grid className="col-md-6 col-12">
              <ul className="header-right">
                <li>
                  <LanguageSwitcher />
                </li>
              </ul>
            </Grid>
          </Grid>
        </Grid>
      </header>
    </Fragment>
  );
};
export default PublicHeader;
