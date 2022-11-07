import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import {
  Button,
  Dialog,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Form, Formik } from "formik";
import moment from "moment/moment";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import * as Yup from "yup";
import HeaderSidebar from "../../components/header-navbar";
import { cancleSubscriptionAction } from "../../redux/actions/auth";
import { getUserInfo } from "../../redux/actions/common";
import {
  getCurrentPlanInfoAction,
  membershipCancelQuestionAction,
} from "../../redux/actions/home";

const PlanManagment = (props) => {
  const validationSchema = Yup.object({
    reason: Yup.string().required(`reason can not be empty`),
    text: Yup.string().when("reason", {
      is: "others",
      then: Yup.string().required(`reason can not be empty`),
      otherwise: Yup.string(),
    }),
  });
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const cancleSubscriptionHandlar = () => {
    setOpen(true);
  };
  const initialState = {
    reason: "",
    text: "",
  };

  const submitHandler = (values, actions) => {
    if (values.reason == "others") {
      const data = {
        reason: values.text,
      };
      props.cancleSubscriptionAction(data, actions, setOpen, router);
    } else {
      const data = {
        reason: values.reason,
      };
      props.cancleSubscriptionAction(data, actions, setOpen, router);
    }
  };
  useEffect(() => {
    props.getCurrentPlanInfoAction();
    props.membershipCancelQuestionAction();
    props.getUserInfo();
  }, []);

  return (
    <Fragment>
      <Head>
        <title>plan management</title>
        <meta name="description" content="Market Rite side" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderSidebar>
        <Grid className="card-wrap">
          <Grid className="card-body">
            <ul className="account-menu">
              <li>
                <Link href="/plan-management">
                  <a
                    className={
                      router.pathname == "/plan-management" ? "active" : ""
                    }
                  >
                    plan management
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/account">
                  <a className={router.pathname == "/account" ? "active" : ""}>
                    profile management
                  </a>
                </Link>
              </li>

              <li>
                <Link href="/change-password">
                  <a
                    className={
                      router.pathname == "/change-password" ? "active" : ""
                    }
                  >
                    Change Password
                  </a>
                </Link>
              </li>
            </ul>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <h2 className="membership-title">Membership & Billing</h2>
              </Grid>
              <Grid item lg={4} xs={12}>
                <ul className="membership-menus">
                  <li>
                    <a onClick={cancleSubscriptionHandlar}>Cancel Membership</a>
                  </li>
                  <li>
                    <Link href="/change-plan">
                      <a>Change plan</a>
                    </Link>
                  </li>
                </ul>
              </Grid>
              <Grid item lg={6} xs={12}>
                <h4 className="plan-title">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 7C7.65685 7 9 5.65685 9 4C9 2.34315 7.65685 1 6 1C4.34315 1 3 2.34315 3 4C3 5.65685 4.34315 7 6 7Z"
                      stroke="#00AEF8"
                      strokeWidth="2"
                    />
                    <path
                      d="M9.00006 11H4.89806C4.16698 11.0002 3.46114 11.2674 2.91314 11.7513C2.36515 12.2352 2.01271 12.9026 1.92206 13.628L1.28106 18.752C1.24589 19.0334 1.27098 19.3191 1.35467 19.5901C1.43835 19.8611 1.57871 20.1112 1.76644 20.3238C1.95416 20.5364 2.18496 20.7066 2.44351 20.8232C2.70206 20.9398 2.98244 21.0001 3.26606 21H8.00006M20.7191 18.752L20.0791 13.628C19.9884 12.9022 19.6356 12.2346 19.0872 11.7506C18.5388 11.2667 17.8325 10.9997 17.1011 11H14.8971C14.166 11.0002 13.4601 11.2674 12.9121 11.7513C12.3641 12.2352 12.0117 12.9026 11.9211 13.628L11.2801 18.752C11.2449 19.0335 11.27 19.3193 11.3537 19.5903C11.4375 19.8614 11.5779 20.1116 11.7658 20.3242C11.9536 20.5368 12.1845 20.707 12.4432 20.8235C12.7019 20.94 12.9824 21.0002 13.2661 21H18.7341C19.0177 21.0001 19.2981 20.9398 19.5566 20.8232C19.8152 20.7066 20.046 20.5364 20.2337 20.3238C20.4214 20.1112 20.5618 19.8611 20.6455 19.5901C20.7291 19.3191 20.7542 19.0334 20.7191 18.752Z"
                      stroke="#00AEF8"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 7C17.6569 7 19 5.65685 19 4C19 2.34315 17.6569 1 16 1C14.3431 1 13 2.34315 13 4C13 5.65685 14.3431 7 16 7Z"
                      stroke="#00AEF8"
                      strokeWidth="2"
                    />
                  </svg>
                  Member since{" "}
                  {moment(props.user_info?.created_at).format("MMMM YYYY")}
                </h4>
                <Grid className="plan-wrap">
                  <ul className="plan-info">
                    <li>
                      <span className="label">Plan:</span>
                      <span className="plan-name">
                        {props.current_plan_info?.plan_name}
                      </span>
                    </li>
                    <li>
                      <span className="label">Membership:</span>
                      <span className="plan-membership">
                        <span>
                          {props.current_plan_info?.trading_type_name}
                        </span>
                        <span>
                          {props.current_plan_info?.prices}/
                          {props.current_plan_info?.payment_type_name}
                        </span>
                      </span>
                    </li>
                  </ul>
                  {props.current_plan_info?.payment_method == "paypal" ? (
                    <h4 className="plan-image">
                      <img
                        translate="no"
                        src="/images/paypal.svg"
                        alt="paypal"
                      />{" "}
                      Paypal
                    </h4>
                  ) : (
                    <h4 translate="no" className="plan-image">
                      <img src="/images/card-2.svg" alt="card" /> Debit / Credit
                      card
                    </h4>
                  )}

                  <p>
                    Your next billing date{" "}
                    {props.current_plan_info?.next_billing_time}
                  </p>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </HeaderSidebar>
      <Dialog
        classes={{
          root: "confirmation-modal",
          container: "confirmation-modal-container",
          paper: "confirmation-modal-paper",
        }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <span onClick={() => setOpen(false)} className="modalClose">
          <CancelOutlinedIcon />
        </span>
        <Formik
          enableReinitialize
          initialValues={initialState}
          validationSchema={validationSchema}
          onSubmit={submitHandler}
        >
          {({ setFieldValue, errors, touched, values }) => (
            <Form>
              <Grid className="confirmation-wrap">
                <h2 className="title">
                  Are you sure to cancel your current membership
                </h2>

                <h4 className="subtitle">
                  <svg
                    width="35"
                    height="35"
                    viewBox="0 0 35 35"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24.1354 32.8125L18.9583 27.6354L21 25.5937L24.099 28.6927L30.2969 22.4948L32.3385 24.5729L24.1354 32.8125ZM10.7917 24.7917L8.75 22.75L11.0833 20.4167L8.75 18.0833L10.7917 16.0417L13.125 18.375L15.4583 16.0417L17.5 18.0833L15.1667 20.4167L17.5 22.75L15.4583 24.7917L13.125 22.4583L10.7917 24.7917ZM7.29167 32.0833C6.48958 32.0833 5.80271 31.798 5.23104 31.2273C4.66035 30.6556 4.375 29.9687 4.375 29.1667V8.74999C4.375 7.94791 4.66035 7.26152 5.23104 6.69082C5.80271 6.11916 6.48958 5.83332 7.29167 5.83332H8.75V2.91666H11.6667V5.83332H23.3333V2.91666H26.25V5.83332H27.7083C28.5104 5.83332 29.1973 6.11916 29.769 6.69082C30.3397 7.26152 30.625 7.94791 30.625 8.74999V18.0104L27.7083 20.9635V14.5833H7.29167V29.1667H16.4062L19.2865 32.0833H7.29167ZM7.29167 11.6667H27.7083V8.74999H7.29167V11.6667ZM7.29167 11.6667V8.74999V11.6667Z"
                      fill="#FF0303"
                    />
                  </svg>
                  Tell us why you're leaving
                </h4>
                <RadioGroup
                  className="radio-btns confirmation-items"
                  name="reason"
                  id="reason"
                  value={values.reason}
                  onChange={(e) => {
                    setFieldValue("reason", e.target.value);
                  }}
                >
                  {props.questions?.map((item) => (
                    <FormControlLabel
                      key={item.id}
                      value={item.name}
                      control={<Radio />}
                      label={item.name}
                    />
                  ))}
                  <FormControlLabel
                    value="others"
                    control={<Radio />}
                    label="Others"
                  />
                </RadioGroup>
                {values.reason == "others" && (
                  <textarea
                    className="others-option"
                    placeholder="Type here"
                    onChange={(e) => {
                      setFieldValue("text", e.target.value);
                    }}
                  ></textarea>
                )}
                {errors.text && touched.text && (
                  <p className="errorMsg">{errors.text}</p>
                )}
                {errors.reason && touched.reason && (
                  <p className="errorMsg">{errors.reason}</p>
                )}
                <div className="text-right">
                  <Button type="submit" className="cancel">
                    Cancel subscriptions
                  </Button>
                </div>
              </Grid>
            </Form>
          )}
        </Formik>
      </Dialog>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  current_plan_info: state.home.current_plan_info,
  questions: state.home.questions,
  user_info: state.common.user_info,
});
export default connect(mapStateToProps, {
  cancleSubscriptionAction,
  getCurrentPlanInfoAction,
  membershipCancelQuestionAction,
  getUserInfo,
})(PlanManagment);
