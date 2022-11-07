import CancelIcon from "@mui/icons-material/Cancel";
import FeedIcon from "@mui/icons-material/Feed";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import { Grid } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
const StickyMenu = (props) => {
  const router = useRouter();
  const [moreMenu, setMoreMenu] = useState(false);
  const handleClickMoreMenu = () => {
    setMoreMenu(!moreMenu);
  };
  return (
    <Fragment>
      <ul className="stickyMenuWrap">
        <li>
          <Link href="/">
            <a className={router.asPath == `/` ? "active" : ""}>
              <HomeIcon className="icon" />
              <span className="name">Home</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/product">
            <a className={router.pathname == "/product" ? "active" : ""}>
              <ProductionQuantityLimitsIcon className="icon" />
              <span className="name">Product</span>
            </a>
          </Link>
        </li>

        <li>
          <Link href="/news">
            <a className={router.pathname == "/news" ? "active" : ""}>
              <FeedIcon className="icon" />
              <span className="name">News</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/plans-pricing">
            <a className={router.pathname == "/plans-pricing" ? "active" : ""}>
              <LocalAtmIcon className="icon" />
              <span className="name">Plans & Pricing</span>
            </a>
          </Link>
        </li>
        <li>
          <a
            onClick={handleClickMoreMenu}
            className={`more  ${moreMenu ? "active" : ""}`}
          >
            <MoreHorizIcon className="icon" />
            <span className="name">More</span>
          </a>
        </li>
      </ul>
      <Grid className={`moreStickyMenu ${moreMenu ? "active" : ""}`}>
        <span onClick={handleClickMoreMenu} className="closeMenu">
          <CancelIcon />
        </span>
        <ul>
          <li>
            <Link href="/">
              <a className={router.asPath == `/` ? "active" : ""}>
                <HomeIcon className="icon" />
                <span className="name">Home</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/product">
              <a className={router.pathname == "/product" ? "active" : ""}>
                <ProductionQuantityLimitsIcon className="icon" />
                <span className="name">Product</span>
              </a>
            </Link>
          </li>

          <li>
            <Link href="/news">
              <a className={router.pathname == "/news" ? "active" : ""}>
                <FeedIcon className="icon" />
                <span className="name">News</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/plans-pricing">
              <a
                className={router.pathname == "/plans-pricing" ? "active" : ""}
              >
                <LocalAtmIcon className="icon" />
                <span className="name">Plans & Pricing</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/about-us">
              <a className={router.pathname == "/about-us" ? "active" : ""}>
                <InfoIcon className="icon" />
                <span className="name">About Us</span>
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
                <svg
                  version="1.1"
                  className="res"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 700 700"
                  xmlSpace="preserve"
                >
                  <path
                    d="M348,178.9c-36.7,0-72.5,11.5-102.3,32.9c-29.8,21.4-52.1,51.7-63.7,86.6c-11.6,34.8-12,72.4-1,107.5
	c11,35,32.7,65.7,62,87.8v0.3h0.4c30.1,22.7,66.8,35,104.6,35s74.4-12.3,104.6-35h0.4v-0.3c29.4-22,51.1-52.7,62-87.8
	c11-35,10.6-72.6-1-107.5c-11.6-34.8-33.9-65.1-63.7-86.6C420.5,190.4,384.7,178.8,348,178.9L348,178.9z M371.3,307.2v11.7
	c0,8.3-4.4,16-11.7,20.2s-16.1,4.2-23.3,0s-11.7-11.9-11.7-20.2v-11.7H371.3z M324.7,283.9L324.7,283.9c0-8.3,4.4-16,11.7-20.2
	s16.1-4.2,23.3,0s11.7,11.9,11.7,20.2H324.7z M328.3,388.3c4.8-1.6,8-6.1,8-11.1v-13.3c7.6,2.2,15.7,2.2,23.3,0v13.3
	c0,5,3.2,9.5,8,11.1l36.8,12.3c7.4,2.4,13.7,7.1,18.3,13.4c4.5,6.3,7,13.8,7,21.6v45.9v0c-21,13.5-45.1,21.6-70,23.5v-81.1h11.7
	l0-23.3h-46.7v23.3h11.7V505h0c-24.9-1.9-49-10-70-23.5v-45.9c0-7.7,2.4-15.3,7-21.6c4.5-6.3,10.9-11,18.3-13.4L328.3,388.3z
	 M453,463.1v-27.5c0-12.6-3.9-25-11.3-35.2c-7.4-10.3-17.8-17.9-29.8-21.9l-28.8-9.6v-19.4c7.5-8.4,11.6-19.3,11.7-30.5v-11.7H418
	v-23.3h-23.3c0-16.7-8.9-32.1-23.3-40.4c-14.4-8.3-32.2-8.3-46.7,0c-14.4,8.3-23.3,23.7-23.3,40.4H278v23.3h23.3v11.7
	c0,11.3,4.2,22.1,11.7,30.5v19.4l-28.8,9.6c-12,4-22.4,11.7-29.8,21.9c-7.4,10.3-11.4,22.6-11.3,35.2v27.5v0
	c-29.3-28.1-46.1-66.8-46.7-107.4c-0.6-40.6,15.2-79.7,43.7-108.6c28.5-28.9,67.4-45.2,108-45.2s79.5,16.3,108,45.2
	c28.5,28.9,44.2,68,43.7,108.6C499.1,396.3,482.3,435,453,463.1L453,463.1z"
                  />
                  <path
                    d="M617.6,295.6l-57.8-6.4c-4.2-13.6-9.6-26.8-16.3-39.4l36.3-45.4c3.7-4.6,3.4-11.3-0.8-15.5l-66-66
	c-4.2-4.2-10.9-4.6-15.5-0.9l-45.4,36.3c-12.6-6.7-25.8-12.2-39.4-16.3l-6.4-57.7c-0.7-5.9-5.6-10.4-11.6-10.4h-93.3
	c-5.9,0-10.9,4.5-11.6,10.4l-6.4,57.8c-13.6,4.2-26.8,9.6-39.4,16.3L198.5,122c-4.6-3.7-11.3-3.4-15.5,0.9l-66,66
	c-4.2,4.2-4.6,10.9-0.9,15.5l36.3,45.4c-6.7,12.6-12.2,25.8-16.3,39.4l-57.8,6.4c-5.9,0.7-10.3,5.7-10.3,11.6v93.3
	c0,5.9,4.5,10.9,10.4,11.6l57.8,6.4c4.2,13.6,9.6,26.8,16.3,39.4l-36.4,45.4c-3.7,4.6-3.3,11.3,0.9,15.5l66,66
	c4.2,4.2,10.9,4.6,15.5,0.9l45.4-36.3c12.6,6.7,25.8,12.2,39.4,16.3l6.4,57.8c0.7,5.9,5.7,10.3,11.6,10.3h93.3
	c5.9,0,10.9-4.5,11.6-10.4l6.4-57.8c13.6-4.2,26.8-9.6,39.4-16.3l45.4,36.3c4.6,3.7,11.3,3.3,15.5-0.9l66-65.9
	c4.2-4.2,4.6-10.9,0.9-15.5L543.5,458c6.7-12.6,12.2-25.8,16.3-39.4l57.8-6.4c5.9-0.7,10.3-5.7,10.3-11.6v-93.3
	C628,301.3,623.5,296.3,617.6,295.6L617.6,295.6z M604.7,390.1l-55.2,6.1c-4.8,0.5-8.8,3.9-10,8.6c-4.5,17-11.2,33.2-20,48.4
	c-2.4,4.2-2,9.4,1,13.1l34.7,43.4L503.9,561l-43.3-34.7l0,0c-3.8-3-9-3.4-13.1-1c-15.2,8.8-31.5,15.5-48.4,20
	c-4.7,1.2-8.1,5.2-8.6,10l-6.1,55.2h-72.4l-6.1-55.2c-0.5-4.8-3.9-8.8-8.6-10c-17-4.5-33.3-11.2-48.5-20c-4.2-2.4-9.4-2-13.1,1
	l-43.3,34.7l-51.2-51.3l34.7-43.4v0c3-3.8,3.4-9,1-13.1c-8.8-15.2-15.5-31.5-20-48.4c-1.2-4.7-5.2-8.1-10-8.6l-55.2-6.1v-72.4
	l55.2-6.1c4.8-0.5,8.8-3.9,10-8.6c4.5-17,11.2-33.2,20-48.4c2.4-4.2,2-9.4-1-13.1L140.9,198l51.2-51.2l43.3,34.7h0
	c3.8,3,9,3.4,13.1,1c15.2-8.8,31.5-15.5,48.4-20c4.7-1.2,8.1-5.2,8.6-10l6.2-55.2h72.4l6.1,55.2h0c0.5,4.8,3.9,8.8,8.6,10
	c17,4.5,33.2,11.2,48.4,20c4.2,2.4,9.4,2,13.1-1l43.3-34.7l51.2,51.2l-34.7,43.4l0,0c-3,3.8-3.4,9-1,13.1
	c8.8,15.2,15.5,31.5,20,48.4c1.2,4.7,5.2,8.1,10,8.6l55.1,6.2L604.7,390.1z"
                  />
                </svg>

                <span className="name">Resources</span>
              </a>
            </Link>
            <ul className="submenu">
              <li>
                <Link href="/strategy">
                  <a className={router.pathname == "/strategy" ? "active" : ""}>
                    Strategy
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/education">
                  <a
                    className={router.pathname == "/education" ? "active" : ""}
                  >
                    Education
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/calculator">
                  <a
                    className={router.pathname == "/calculator" ? "active" : ""}
                  >
                    Position Size Calculator
                  </a>
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </Grid>
    </Fragment>
  );
};
export default StickyMenu;
