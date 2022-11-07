import { Grid } from "@mui/material";
import Head from "next/head";
import { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import HeaderSidebar from "../components/header-navbar";
import { getUpdateSchuduleAction } from "../redux/actions/home";
import { formatAMPM } from "../utils/commonFunctions";

const UpdateShedule = (props) => {
  useEffect(() => {
    props.getUpdateSchuduleAction();
  }, []);
  return (
    <Fragment>
      <Head>
        <title>Update Schedule</title>
        <meta name="description" content="Market Rite side" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderSidebar>
        <Grid className="card-wrap">
          <Grid className="card-body">
            <h4 className="update-schedule-title">Update Schedule</h4>
            <table className="update-schedule-table">
              <thead>
                <tr>
                  <th>Update</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {props.schedules?.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td translate="no">
                      {item.type == "Time"
                        ? formatAMPM(item.value)
                        : item.value}{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Grid>
        </Grid>
      </HeaderSidebar>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  schedules: state.home.schedules,
});
export default connect(mapStateToProps, {
  getUpdateSchuduleAction,
})(UpdateShedule);
