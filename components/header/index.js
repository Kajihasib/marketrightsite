import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, Grid, Menu } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Cookies from "universal-cookie";
import LanguageSwitcher from "../language-switcher";

const cookie = new Cookies();

const Header = (props) => {
  const router = useRouter();

  const [openProfile, setOpenProfile] = useState(null);
  const profile = Boolean(openProfile);
  const [token, setToken] = useState("");
  const [access, setAccess] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const handleOpenProfile = (event) => {
    setOpenProfile(event.currentTarget);
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };

  useEffect(() => {
    setToken(cookie.get("user_token"));
    setAccess(cookie.get("access"));
    setUserInfo(cookie.get("user_info"));
    if (!cookie.get("user_token")) {
      router.push("/");
    }
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
    <header className="header-area-admin">
      <span onClick={props.openSidebar} className="menu-trigger">
        <MenuIcon />
      </span>
      <Grid className="header-left">
        <Link href="/">
          <a className="logo">
            <img src="/images/logo.svg" alt="logo" />
          </a>
        </Link>
      </Grid>
      <ul className="header-right">
        <li>
          {token ? (
            <Grid onClick={handleOpenProfile} className="short-profile">
              <span className="name">{userInfo.name?.charAt(0)}</span>
              {userInfo.name} <ArrowDropDownIcon />
            </Grid>
          ) : (
            <ul className="login-btns">
              <li>
                <Link href="/signin">
                  <Button className="login" component="a">
                    Sign In
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/signup">
                  <Button className="signup" component="a">
                    Sign Up
                  </Button>
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <LanguageSwitcher />
        </li>
      </ul>
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
  );
};
export default connect(null, {})(Header);
