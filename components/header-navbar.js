import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import Footer from "./footer";
import Header from "./header";
import SidebarMenu from "./sidebar";
const HeaderSidebar = (props) => {
  const cookie = new Cookies();
  const router = useRouter();
  const user_token = cookie.get("user_token");

  const [sidebar, setSidebar] = useState(false);
  const handleClickOpenSidebar = () => {
    setSidebar(!sidebar);
  };
  useEffect(() => {
    if (!user_token) {
      router.push('/');
    }
  }, [user_token]);
  useEffect(() => {
    if (cookie.get("access") !== "true") {
      router.push("/welcome-back");
    }
  }, [cookie.get("access")]);
  return (
    <Fragment>
      <Header openSidebar={handleClickOpenSidebar} />
      <Grid className="main-wrapper">
        <SidebarMenu onOpenSidebar={sidebar} setOpenSidebar={setSidebar} />
        <Grid className="admin-container">
          {props.children}
          <Footer />
        </Grid>
      </Grid>
    </Fragment>
  );
};
export default HeaderSidebar;
