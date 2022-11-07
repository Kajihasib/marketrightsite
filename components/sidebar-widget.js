import { Button, Grid } from "@mui/material";
import Link from "next/link";
import { useEffect } from "react";
import { connect } from "react-redux";
import { getSidebarWidgetAction } from "../redux/actions/public";

const SidebarWidget = (props) => {
  useEffect(() => {
    props.getSidebarWidgetAction();
  }, []);
  return (
    <Grid className="sidebar-widget-wrap">
      <h2 className="sidebar-title">LEARN TO TRADE WITH RIGHT SIDE</h2>
      <ul className="widget-items">
        {props.sidebar_widget?.map((item) => (
          <li key={item.id}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.8124 9.9375C16.1874 13.0625 13.8312 16.005 10.5249 16.6625C8.9124 16.9836 7.23968 16.7878 5.74492 16.103C4.25016 15.4181 3.00956 14.2792 2.19978 12.8482C1.39 11.4173 1.05231 9.76736 1.2348 8.13334C1.41729 6.49932 2.11065 4.96453 3.21616 3.7475C5.48366 1.25 9.31241 0.562496 12.4374 1.8125"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.1875 8.6875L9.3125 11.8125L16.8125 3.6875"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {item.text}
          </li>
        ))}
      </ul>
      <Link href="/signup?mode=trial">
        <Button className="widget-btn" component="a">
          <h4>Start 7 Days</h4>
          <span className="trial">free trial</span>
        </Button>
      </Link>
    </Grid>
  );
};
const mapStateToProps = (state) => ({
  sidebar_widget: state.public.sidebar_widget,
});
export default connect(mapStateToProps, {
  getSidebarWidgetAction,
})(SidebarWidget);
