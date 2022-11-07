import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Button, Grid, Menu } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import Cookies from "universal-cookie";
import LanguageSwitcher from "../language-switcher";
import StickyMenu from "./sticky";
const PublicLayout = (props) => {
  const cookie = new Cookies();

  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [openProfile, setOpenProfile] = useState(null);
  const [access, setAccess] = useState(true);

  const profile = Boolean(openProfile);
  const handleOpenProfile = (event) => {
    setOpenProfile(event.currentTarget);
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };

  const router = useRouter();

  useEffect(() => {
    setToken(cookie.get("user_token"));
    setUserInfo(cookie.get("user_info"));
    setAccess(cookie.get("access"));
  }, [cookie.get("user_token")]);
  const logoutHandler = () => {
    cookie.remove("user_token", {
      path: "/",
      expires: new Date(Date.now() + 2592000111),
    });
    cookie.remove("user_info", {
      path: "/",
      expires: new Date(Date.now() + 2592000111),
    });
    setTimeout(() => {
      router.reload();
    }, 1200);
    router.push("/");
  };
  return (
    <Fragment>
      <header
        className={`public-header-area ${
          props.headerClassName ? props.headerClassName : ""
        }`}
      >
        <Grid className="public-container container">
          <Grid className="row align-items-center">
            <Grid className="col-lg-2 col-md-4 col-5">
              <Link href="/">
                <a className="logo">
                  <img src="/images/logo.svg" alt="logo" />
                </a>
              </Link>
            </Grid>
            <Grid className="col-lg-10 col-md-8 col-7">
              <Grid className="public-header-right">
                <ul className="public-mainmenu">
                  <li>
                    <Link href="/">
                      <a className={router.pathname == "/" ? "active" : ""}>
                        Home
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/product">
                      <a
                        className={
                          router.pathname == "/product" ? "active" : ""
                        }
                      >
                        Product
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/news">
                      <a className={router.pathname == "/news" ? "active" : ""}>
                        News
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/plans-pricing">
                      <a
                        className={
                          router.pathname == "/plans-pricing" ? "active" : ""
                        }
                      >
                        Plans & Pricing
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/resource">
                      <a
                        className={
                          router.pathname == "/plans-pricing" ||
                          router.pathname == "/strategy" ||
                          router.pathname == "/education" ||
                          router.pathname == "/calculator"
                            ? "active sub"
                            : "sub"
                        }
                      >
                        Resources <ArrowDropDownIcon />
                      </a>
                    </Link>
                    <ul className="submenu">
                      <li>
                        <Link href="/strategy">
                          <a
                            className={
                              router.pathname == "/strategy" ? "active" : ""
                            }
                          >
                            Strategy
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/education">
                          <a
                            className={
                              router.pathname == "/education" ? "active" : ""
                            }
                          >
                            Education
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/calculator">
                          <a
                            className={
                              router.pathname == "/calculator" ? "active" : ""
                            }
                          >
                            Position Size Calculator
                          </a>
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li>
                    <Link href="/about-us">
                      <a
                        className={
                          router.pathname == "/about-us" ? "active" : ""
                        }
                      >
                        About Us
                      </a>
                    </Link>
                  </li>
                </ul>
                <ul className="header-right">
                  <li>
                    <LanguageSwitcher />
                  </li>
                  <li>
                    {token ? (
                      <Grid
                        onClick={handleOpenProfile}
                        className="short-profile"
                      >
                        <span className="name">{userInfo.name?.charAt(0)}</span>
                        {userInfo.name} <ArrowDropDownIcon />
                      </Grid>
                    ) : (
                      <ul className="login-btns">
                        <li>
                          <Link href="/signin">
                            <Button className="login" component="a">
                              <span className="name">sign in</span>
                              <LoginIcon className="icon" />
                            </Button>
                          </Link>
                        </li>
                        <li>
                          <Link href="/signup?mode=trial">
                            <Button className="signup" component="a">
                              <span className="name">Free Trial</span>
                              <AppRegistrationIcon className="icon" />
                            </Button>
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                </ul>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Menu
          classes={{
            root: "profile-dropdown",
            paper: "profile-dropdown-paper",
            list: "profile-dropdown-list",
          }}
          anchorEl={openProfile}
          open={profile}
          onClose={handleCloseProfile}
        >
          {access == "true" ? (
            <li>
              <Link href="/plan-management">
                <a>
                  <ManageAccountsIcon /> Account
                </a>
              </Link>
            </li>
          ) : null}

          <li onClick={logoutHandler}>
            <a>
              <LogoutIcon /> Logout
            </a>
          </li>
        </Menu>
      </header>
      <Fragment>{props.children}</Fragment>
      <footer className="public-footer-area">
        <Grid className="public-container container">
          <Grid className="row">
            <Grid className="col-md-6 col-12">
              <Grid className="footer-content">
                <h2 className="title">Ready to get started</h2>
                <p className="subtitle">
                  Get global access to our Right Side, Alerts, Charts, Forecasts
                  and Analysis of Current Structure from a single membership
                </p>
              </Grid>
            </Grid>
            <Grid className="col-md-6 col-12">
              <Grid className="text-right">
                <Link href="/signup?mode=trial">
                  <Button className="trail-btn" component="a">
                    Start 7 days Free trial
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid className="public-container container">
          <Grid className="row align-items-center">
            <Grid className="col-md-6 col-12">
              <ul className="footer-menu">
                <li>
                  <Link href="/terms-conditions">
                    <a>Terms & Conditions</a>
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy">
                    <a>Privacy Policy</a>
                  </Link>
                </li>
                <li>
                  <Link href="/disclaimer">
                    <a>Disclaimer</a>
                  </Link>
                </li>
              </ul>
            </Grid>
            <Grid className="col-md-6 col-12">
              <ul className="follow-footer">
                <li className="title">Stay connected</li>
                <li>
                  <a href="#">
                    <svg
                      width="40"
                      height="39"
                      viewBox="0 0 40 39"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 0.352539C8.95536 0.352539 0 8.86013 0 19.3525C0 29.8449 8.95536 38.3525 20 38.3525C31.0446 38.3525 40 29.8449 40 19.3525C40 8.86013 31.0446 0.352539 20 0.352539ZM29.6116 14.6746C29.625 14.874 29.625 15.0818 29.625 15.2854C29.625 21.5112 24.6339 28.6829 15.5134 28.6829C12.7009 28.6829 10.0938 27.9068 7.89732 26.5708C8.29911 26.6133 8.68304 26.6302 9.09375 26.6302C11.4152 26.6302 13.5491 25.8838 15.25 24.6199C13.0714 24.5775 11.2411 23.2204 10.6161 21.3543C11.3795 21.4604 12.067 21.4604 12.8527 21.2695C11.7309 21.053 10.7227 20.4742 9.99918 19.6315C9.2757 18.7888 8.88164 17.7342 8.88393 16.6467V16.5874C9.54018 16.9394 10.3125 17.1557 11.1205 17.1854C10.4413 16.7553 9.88419 16.1726 9.49871 15.489C9.11323 14.8055 8.91127 14.0421 8.91072 13.2666C8.91072 12.3887 9.15179 11.5871 9.58482 10.8916C10.8299 12.3477 12.3836 13.5386 14.1449 14.3869C15.9062 15.2353 17.8357 15.722 19.808 15.8155C19.1071 12.6135 21.625 10.0222 24.6518 10.0222C26.0804 10.0222 27.3661 10.5905 28.2723 11.5066C29.3929 11.3072 30.4643 10.9086 31.4196 10.3742C31.0491 11.4641 30.2723 12.3845 29.2411 12.9655C30.2411 12.8637 31.2054 12.6008 32.0982 12.2318C31.4241 13.1733 30.5804 14.0088 29.6116 14.6746Z"
                        fill="white"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <svg
                      width="41"
                      height="39"
                      viewBox="0 0 41 39"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M40.9354 19.4689C40.9354 8.91097 31.9815 0.352539 20.9379 0.352539C9.8893 0.354914 0.935425 8.91097 0.935425 19.4713C0.935425 29.0105 8.24951 36.9182 17.8083 38.3525V24.9948H12.7339V19.4713H17.8133V15.2562C17.8133 10.4664 20.8004 7.82098 25.3674 7.82098C27.5571 7.82098 29.8443 8.19381 29.8443 8.19381V12.8957H27.3221C24.8399 12.8957 24.065 14.3704 24.065 15.8831V19.4689H29.6093L28.7244 24.9925H24.0625V38.3502C33.6213 36.9158 40.9354 29.0081 40.9354 19.4689Z"
                        fill="white"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <svg
                      width="41"
                      height="41"
                      viewBox="0 0 41 41"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.8656 13.683C17.1932 13.683 14.1962 16.6801 14.1962 20.3525C14.1962 24.025 17.1932 27.022 20.8656 27.022C24.538 27.022 27.535 24.025 27.535 20.3525C27.535 16.6801 24.538 13.683 20.8656 13.683ZM40.8687 20.3525C40.8687 17.5907 40.8938 14.8538 40.7387 12.097C40.5836 8.8948 39.8531 6.05288 37.5115 3.7113C35.165 1.36471 32.3281 0.63922 29.126 0.484115C26.3642 0.32901 23.6274 0.354027 20.8706 0.354027C18.1088 0.354027 15.372 0.32901 12.6152 0.484115C9.41307 0.63922 6.5712 1.36971 4.22967 3.7113C1.88312 6.05788 1.15765 8.8948 1.00255 12.097C0.847443 14.8588 0.87246 17.5957 0.87246 20.3525C0.87246 23.1094 0.847443 25.8513 1.00255 28.6081C1.15765 31.8103 1.88813 34.6522 4.22967 36.9938C6.57621 39.3404 9.41307 40.0659 12.6152 40.221C15.377 40.3761 18.1138 40.3511 20.8706 40.3511C23.6324 40.3511 26.3692 40.3761 29.126 40.221C32.3281 40.0659 35.17 39.3354 37.5115 36.9938C39.8581 34.6472 40.5836 31.8103 40.7387 28.6081C40.8988 25.8513 40.8687 23.1144 40.8687 20.3525V20.3525ZM20.8656 30.6145C15.1869 30.6145 10.6039 26.0314 10.6039 20.3525C10.6039 14.6737 15.1869 10.0906 20.8656 10.0906C26.5443 10.0906 31.1273 14.6737 31.1273 20.3525C31.1273 26.0314 26.5443 30.6145 20.8656 30.6145ZM31.5476 12.0669C30.2217 12.0669 29.151 10.9962 29.151 9.67032C29.151 8.34443 30.2217 7.2737 31.5476 7.2737C32.8735 7.2737 33.9442 8.34443 33.9442 9.67032C33.9446 9.98516 33.8829 10.297 33.7626 10.5879C33.6423 10.8789 33.4658 11.1432 33.2431 11.3659C33.0205 11.5885 32.7562 11.765 32.4652 11.8853C32.1743 12.0056 31.8624 12.0673 31.5476 12.0669V12.0669Z"
                        fill="white"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </Grid>
          </Grid>
        </Grid>
        <Grid className="public-footer-buttom">
          <Grid className="public-container container">
            <p className="copyright text-center">
              &copy;{new Date().getFullYear()} Market Right Side. All Rights
              Reserved.
            </p>
          </Grid>
        </Grid>
      </footer>
      <StickyMenu />
    </Fragment>
  );
};

export default PublicLayout;
