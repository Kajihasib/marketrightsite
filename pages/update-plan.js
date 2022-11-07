import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
} from "@mui/material";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Field, FieldArray, Form, Formik } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import Cookies from "universal-cookie";
import * as Yup from "yup";
import Footer from "../components/footer";
import MultiCheckbox from "../components/formFields/multi_checkbox";
import SelectField from "../components/formFields/select";
import Header from "../components/header";
import ButtonWrapper from "../components/paypal-btn";
import { updatePlan } from "../redux/actions/auth";
import { getPaymentTypeAction } from "../redux/actions/common";
import { getServerApiRequest } from "../utils/serverApi";

const cookie = new Cookies();

const UpdatePlan = (props) => {
  const router = useRouter();

  const [activeStep, setActiveStep] = useState(0);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [expanded, setExpanded] = useState(props.markets[0].slug);
  const [planToken, setPlanToken] = useState("");
  const [getData, setData] = useState({});
  const [items, setItems] = useState(null);
  const user_token = cookie.get("user_token");
  const validationSchema = Yup.object({
    plan: Yup.string().required(`plan can not be empty`),
    instruments: Yup.array()
      .required(`instrument can not be empty`)
      .min(
        getData?.max_instruments,
        `please select minimum ${getData?.max_instruments} instrument`
      )
      .max(
        getData?.max_instruments,
        `please select maximum ${getData?.max_instruments} instrument`
      ),
    subscription: Yup.string().required(`subscription can not be empty`),
    trading: Yup.string().required(`trading can not be empty`),
    payment_method: Yup.string().required(`payment method can not be empty`),
  });
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
    setItems(cookie.get("items"));
  };
  const initialState = {
    instruments: items?.instruments ? items?.instruments : [],
    plan: items?.plan ? items?.plan : props.plans[0]?.id,
    subscription: items?.subscription
      ? items?.subscription
      : props.plans[0]?.duration_types_through[0]?.id,
    trading: items?.trading
      ? items?.trading
      : props.plans[0]?.trading_types_through[0]?.id,
    payment_method: items?.payment_method ? items?.payment_method : "",
  };
  const filter_by_get_data = props.plans.filter(
    (item) => item.id == props.plans[0]?.id
  )[0];

  useEffect(() => {
    setData(filter_by_get_data);
  }, [filter_by_get_data]);
  const _handleSubmit = (values, actions) => {
    setActiveStep(activeStep + 1);
    actions.setTouched({});
    actions.setSubmitting(false);
  };
  useEffect(() => {
    setItems(cookie.get("items"));
    setData(props.plans[0]);
  }, []);
  const handlePrice = (value, values, id) => {
    setData(value);
  };

  const onApproveSubscriptionHandler = (data, actions, values) => {
    const data_val = {
      plan: values.plan,
      payment_type: values.subscription,
      trading_type: values.trading,
      instrument: values.instruments,
      subscription_id: data.subscriptionID,
      order_id: data.orderID,
      payment_method: values.payment_method,
    };
    props.updatePlan(data_val, router);
  };
  const handleSetCookiesValue = (values) => {
    cookie.set("items", {
      subscription: values.subscription,
      plan: values.plan,
      trading: values.trading,
      instruments: values.instruments,
      payment_method: values.payment_method,
    });
  };

  const handleGetPlanId = (id) => {
    setPlanToken(id);
  };
  const handleChnagePrevious = () => {
    setActiveStep(activeStep - 1);
  };
  useEffect(() => {
    if (cookie.get("access") == "true") {
      router.back();
    }
  }, [cookie.get("access")]);
  useEffect(() => {
    if (!user_token) {
      router.push("/");
    }
  }, [user_token]);
  return (
    <Fragment>
      <Head>
        <title>Update Plan</title>
        <meta name="description" content="Market Rite side" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Grid className="no-access-area">
        <Grid className="container" container justifyContent="center">
          <Grid item xs={12} lg={10}>
            <Grid className="auth-wrap auth-signup">
              <Grid className="text-center auth-header">
                {activeStep === 1 && (
                  <img
                    className="plan-image"
                    src="/images/wallet.svg"
                    alt="wallet"
                  />
                )}
                <h1 className="title">
                  {activeStep == 0 && "Plan & Membership"}
                  {activeStep == 1 && "Payment"}
                </h1>

                {activeStep == 0 && (
                  <p>Please choose your preferred plan and membership</p>
                )}

                {activeStep == 1 && (
                  <p className="payment-subtitle">
                    Use your preferred payment method to
                    <span> pay & complete signup</span>
                  </p>
                )}
              </Grid>
              <Grid className="authForm">
                <Formik
                  enableReinitialize
                  initialValues={initialState}
                  validationSchema={validationSchema}
                  onSubmit={_handleSubmit}
                >
                  {({ setFieldValue, errors, touched, values }) => (
                    <Form id="createGroup">
                      <Grid container spacing={2}>
                        {activeStep === 0 && (
                          <Fragment>
                            <Grid item xs={12}>
                              <SelectField
                                className="profileInputStyle"
                                label="Select Plan"
                                name="plan"
                                fullWidth
                                FormHelperTextProps={{
                                  component: "div",
                                }}
                                select
                                onBlur={() => handleSetCookiesValue(values)}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                              >
                                <MenuItem selected disabled>
                                  Select Plan
                                </MenuItem>
                                {props.plans?.map((item) => (
                                  <MenuItem
                                    onClick={() => {
                                      handlePrice(item, values, item.id);
                                      setFieldValue("subscription", "");
                                      setFieldValue("trading", "");
                                    }}
                                    key={item.id}
                                    value={item.id}
                                  >
                                    {item.name}
                                  </MenuItem>
                                ))}
                              </SelectField>
                            </Grid>
                            <Grid item xs={12}>
                              <h2 className="choose-instrument-title">
                                <span className="image">
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M2.375 4.0625H13.625C14.2217 4.0625 14.794 4.29955 15.216 4.72151C15.6379 5.14347 15.875 5.71576 15.875 6.3125V9.6875C15.875 10.2842 15.6379 10.8565 15.216 11.2785C14.794 11.7004 14.2217 11.9375 13.625 11.9375H2.375C1.77826 11.9375 1.20597 11.7004 0.78401 11.2785C0.362053 10.8565 0.125 10.2842 0.125 9.6875V6.3125C0.125 5.71576 0.362053 5.14347 0.78401 4.72151C1.20597 4.29955 1.77826 4.0625 2.375 4.0625ZM2.375 5.1875C2.07663 5.1875 1.79048 5.30603 1.5795 5.517C1.36853 5.72798 1.25 6.01413 1.25 6.3125V9.6875C1.25 9.98587 1.36853 10.272 1.5795 10.483C1.79048 10.694 2.07663 10.8125 2.375 10.8125H13.625C13.9234 10.8125 14.2095 10.694 14.4205 10.483C14.6315 10.272 14.75 9.98587 14.75 9.6875V6.3125C14.75 6.01413 14.6315 5.72798 14.4205 5.517C14.2095 5.30603 13.9234 5.1875 13.625 5.1875H2.375ZM0.125 1.25C0.125 1.10082 0.184263 0.957742 0.289752 0.852252C0.395242 0.746763 0.538316 0.6875 0.6875 0.6875H15.3125C15.4617 0.6875 15.6048 0.746763 15.7102 0.852252C15.8157 0.957742 15.875 1.10082 15.875 1.25C15.875 1.39918 15.8157 1.54226 15.7102 1.64775C15.6048 1.75324 15.4617 1.8125 15.3125 1.8125H0.6875C0.538316 1.8125 0.395242 1.75324 0.289752 1.64775C0.184263 1.54226 0.125 1.39918 0.125 1.25ZM0.125 14.75C0.125 14.6008 0.184263 14.4577 0.289752 14.3523C0.395242 14.2468 0.538316 14.1875 0.6875 14.1875H15.3125C15.4617 14.1875 15.6048 14.2468 15.7102 14.3523C15.8157 14.4577 15.875 14.6008 15.875 14.75C15.875 14.8992 15.8157 15.0423 15.7102 15.1477C15.6048 15.2532 15.4617 15.3125 15.3125 15.3125H0.6875C0.538316 15.3125 0.395242 15.2532 0.289752 15.1477C0.184263 15.0423 0.125 14.8992 0.125 14.75Z"
                                      fill="#0074BC"
                                    />
                                  </svg>
                                </span>{" "}
                                Choose your preferred instruments{" "}
                              </h2>
                              <div className="text-center">
                                <span className="instruments-value">
                                  {values.instruments.length}/
                                  {getData?.max_instruments}
                                </span>
                              </div>
                              <FieldArray
                                name="instruments"
                                render={(arrayHelpers) => (
                                  <Fragment>
                                    {props.markets?.map((item, index) => (
                                      <Fragment key={index}>
                                        {item.instruments?.length > 0 ? (
                                          <Accordion
                                            expanded={expanded === item.slug}
                                            onChange={handleChange(item.slug)}
                                            classes={{
                                              root: "marketAccordion",
                                              expanded:
                                                "marketAccordionExpanded",
                                            }}
                                          >
                                            <AccordionSummary
                                              className="accordionSummary"
                                              id={item.slug}
                                            >
                                              <span
                                                translate="no"
                                                className="info"
                                              >
                                                <span className="image">
                                                  <img
                                                    src={
                                                      (item.slug == "bonds" &&
                                                        "/images/markets/bonds.svg") ||
                                                      (item.slug ==
                                                        "zn(-10-years-t---note)" &&
                                                        "/images/markets/zn.svg") ||
                                                      (item.slug == "etf" &&
                                                        "/images/markets/etf.svg") ||
                                                      (item.slug ==
                                                        "commodities" &&
                                                        "/images/markets/commodities.svg") ||
                                                      (item.slug == "stock" &&
                                                        "/images/markets/stock.svg") ||
                                                      (item.slug == "indices" &&
                                                        "/images/markets/indices.svg") ||
                                                      (item.slug == "forex" &&
                                                        "/images/markets/forex.svg") ||
                                                      (item.slug == "crypto" &&
                                                        "/images/markets/crypto.svg")
                                                    }
                                                    alt={item.name}
                                                  />
                                                </span>{" "}
                                                <span className="name">
                                                  {item.name}
                                                </span>
                                              </span>
                                              <span className="arrow">
                                                <ArrowRightIcon />
                                              </span>
                                            </AccordionSummary>
                                            <AccordionDetails className="accordionBody">
                                              {item.instruments?.length > 0 ? (
                                                <ul className="instrument-btns">
                                                  {item.instruments.map(
                                                    (data, i) => (
                                                      <li
                                                        key={i}
                                                        className="instrument-item"
                                                        translate="no"
                                                      >
                                                        <Field
                                                          component={
                                                            MultiCheckbox
                                                          }
                                                          name="instruments"
                                                          className="instrument"
                                                          value={data.id}
                                                          val={values}
                                                          label={data.name}
                                                          onBlur={() =>
                                                            handleSetCookiesValue(
                                                              values
                                                            )
                                                          }
                                                        />
                                                      </li>
                                                    )
                                                  )}
                                                </ul>
                                              ) : (
                                                <p>No Instrument Found</p>
                                              )}
                                            </AccordionDetails>
                                          </Accordion>
                                        ) : null}
                                      </Fragment>
                                    ))}
                                  </Fragment>
                                )}
                              />
                              {errors.instruments && touched.instruments && (
                                <p className="errorMsg">{errors.instruments}</p>
                              )}
                            </Grid>

                            <Grid item xs={12}>
                              <h2 className="choose-instrument-title">
                                <span className="image">
                                  <svg
                                    width="17"
                                    height="17"
                                    viewBox="0 0 17 17"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M8.59123 10.9692L8.70332 11.2579L9.01165 11.2861L9.62679 11.3426L9.13008 11.8076L8.92328 12.0012L8.98306 12.2781L9.12008 12.9127L8.65984 12.6109L8.38566 12.4311L8.11148 12.6109L7.65124 12.9127L7.78826 12.2781L7.84804 12.0012L7.64124 11.8076L7.14453 11.3426L7.75967 11.2861L8.068 11.2579L8.18009 10.9692L8.38566 10.4399L8.59123 10.9692ZM4.09385 0.5H12.6775V1.14706H4.09385V0.5ZM2.49658 3.79412H14.2747V4.44118H2.49658V3.79412Z"
                                      stroke="#0074BC"
                                    />
                                    <path
                                      d="M15.3197 8.66667V8.41667H15.0697H1.70175H1.45175V8.66667V15.3333V15.5833H1.70175H15.0697H15.3197V15.3333V8.66667ZM1.70175 7.25H15.0697C15.4467 7.25 15.8083 7.39941 16.0747 7.66516C16.3411 7.93089 16.4907 8.29115 16.4907 8.66667V15.3333C16.4907 15.7088 16.3411 16.0691 16.0747 16.3348C15.8083 16.6006 15.4467 16.75 15.0697 16.75H1.70175C1.32467 16.75 0.963169 16.6006 0.696731 16.3348C0.430315 16.0691 0.280762 15.7088 0.280762 15.3333V8.66667C0.280762 8.29115 0.430315 7.93089 0.696731 7.66516C0.963169 7.39941 1.32467 7.25 1.70175 7.25Z"
                                      stroke="#0074BC"
                                      strokeWidth="0.5"
                                    />
                                  </svg>
                                </span>{" "}
                                Select Membership
                              </h2>
                              <RadioGroup
                                className="radio-btns"
                                name="subscription"
                                row
                                id="subscription"
                                value={values.subscription}
                                onChange={(e) => {
                                  setFieldValue("subscription", e.target.value);
                                  setFieldValue("trading", "");
                                  cookie.set("items", {
                                    plan: values.plan,
                                    trading: values.trading,
                                    instruments: values.instruments,
                                    payment_method: values.payment_method,
                                    subscription: values.subscription,
                                  });
                                }}
                              >
                                {getData?.duration_types_through?.map(
                                  (item) => (
                                    <FormControlLabel
                                      key={item.id}
                                      value={item.id}
                                      control={<Radio />}
                                      label={item.name}
                                      onBlur={() =>
                                        handleSetCookiesValue(values)
                                      }
                                    />
                                  )
                                )}
                              </RadioGroup>
                              {errors.subscription && touched.subscription && (
                                <p className="errorMsg">
                                  {errors.subscription}
                                </p>
                              )}

                              <RadioGroup
                                className="radio-btns"
                                name="trading"
                                id="trading"
                                value={values.trading}
                                row
                                onChange={(e) => {
                                  setFieldValue("trading", e.target.value);
                                  cookie.set("items", {
                                    plan: values.plan,
                                    trading: values.trading,
                                    instruments: values.instruments,
                                    payment_method: values.payment_method,
                                    subscription: values.subscription,
                                  });
                                }}
                              >
                                {getData?.trading_types_through?.map((item) => (
                                  <Grid key={item.id}>
                                    <Grid className="time-feame">
                                      <FormControlLabel
                                        value={item.id}
                                        control={<Radio />}
                                        label={item.name}
                                        onBlur={() =>
                                          handleSetCookiesValue(values)
                                        }
                                        onClick={() =>
                                          handleGetPlanId(
                                            getData?.prices?.filter(
                                              (o) =>
                                                o.trading_type_id == item.id &&
                                                o.duration_type_id ==
                                                  values.subscription
                                            )[0]?.paypal_plan_id
                                          )
                                        }
                                      />
                                      <span className="time">
                                        (
                                        {item.time_frames?.map(
                                          (item) => `${item.short_name},`
                                        )}
                                        )
                                      </span>
                                    </Grid>

                                    <span className="price-label">
                                      $
                                      {
                                        getData?.prices?.filter(
                                          (o) =>
                                            o.trading_type_id == item.id &&
                                            o.duration_type_id ==
                                              values.subscription
                                        )[0]?.prices
                                      }
                                    </span>
                                  </Grid>
                                ))}
                              </RadioGroup>
                              {errors.trading && touched.trading && (
                                <p className="errorMsg">{errors.trading}</p>
                              )}
                            </Grid>
                            <Grid item xs={12}>
                              <h2 className="choose-instrument-title">
                                <span className="image">
                                  <svg
                                    width="23"
                                    height="18"
                                    viewBox="0 0 23 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M0 3.68182C0 2.70534 0.389444 1.76885 1.08266 1.07838C1.77587 0.387905 2.71607 0 3.69643 0H19.3036C20.2839 0 21.2241 0.387905 21.9173 1.07838C22.6106 1.76885 23 2.70534 23 3.68182V14.3182C23 15.2947 22.6106 16.2311 21.9173 16.9216C21.2241 17.6121 20.2839 18 19.3036 18H3.69643C2.71607 18 1.77587 17.6121 1.08266 16.9216C0.389444 16.2311 0 15.2947 0 14.3182V3.68182ZM3.69643 1.63636C3.15179 1.63636 2.62945 1.85187 2.24433 2.23546C1.85922 2.61906 1.64286 3.13933 1.64286 3.68182V4.90909H21.3571V3.68182C21.3571 3.13933 21.1408 2.61906 20.7557 2.23546C20.3705 1.85187 19.8482 1.63636 19.3036 1.63636H3.69643ZM1.64286 14.3182C1.64286 14.8607 1.85922 15.3809 2.24433 15.7645C2.62945 16.1481 3.15179 16.3636 3.69643 16.3636H19.3036C19.8482 16.3636 20.3705 16.1481 20.7557 15.7645C21.1408 15.3809 21.3571 14.8607 21.3571 14.3182V6.54545H1.64286V14.3182ZM15.6071 11.4545H18.0714C18.2893 11.4545 18.4982 11.5407 18.6523 11.6942C18.8063 11.8476 18.8929 12.0557 18.8929 12.2727C18.8929 12.4897 18.8063 12.6978 18.6523 12.8513C18.4982 13.0047 18.2893 13.0909 18.0714 13.0909H15.6071C15.3893 13.0909 15.1804 13.0047 15.0263 12.8513C14.8723 12.6978 14.7857 12.4897 14.7857 12.2727C14.7857 12.0557 14.8723 11.8476 15.0263 11.6942C15.1804 11.5407 15.3893 11.4545 15.6071 11.4545Z"
                                      fill="#5DA7D5"
                                    />
                                  </svg>
                                </span>{" "}
                                Payment Method:
                              </h2>
                              <RadioGroup
                                className="radio-btns"
                                name="payment_method"
                                row
                                id="payment_method"
                                value={values.payment_method}
                                onBlur={() => handleSetCookiesValue(values)}
                                onChange={(e) => {
                                  setFieldValue(
                                    "payment_method",
                                    e.target.value
                                  );
                                }}
                              >
                                <span className="payment-method-btn">
                                  <Radio
                                    value="paypal"
                                    id="paypal"
                                    onBlur={() => handleSetCookiesValue(values)}
                                  />
                                  <FormLabel htmlFor="paypal">
                                    <img
                                      src="/images/paypal.svg"
                                      alt="paypal"
                                    />
                                    <span>PayPal</span>
                                  </FormLabel>
                                </span>
                                <span className="payment-method-btn">
                                  <Radio
                                    value="card"
                                    id="card"
                                    onBlur={() => handleSetCookiesValue(values)}
                                  />
                                  <FormLabel htmlFor="card">
                                    <img src="/images/card-2.svg" alt="card" />
                                    <span>Debit/Credit Card</span>
                                  </FormLabel>
                                </span>
                              </RadioGroup>
                              {errors.payment_method &&
                                touched.payment_method && (
                                  <p className="errorMsg">
                                    {errors.payment_method}
                                  </p>
                                )}
                            </Grid>
                          </Fragment>
                        )}
                        {activeStep === 1 && (
                          <Grid xs={12} item>
                            <div className="payment-wrap">
                              <h4>You've selected </h4>
                              <div className="payment-managment">
                                <div className="payment-managment-left">
                                  <span className="price">
                                    $
                                    {values.mode == "trail"
                                      ? "0.00"
                                      : getData?.prices?.filter(
                                          (o) =>
                                            o.trading_type_id ==
                                              values.trading &&
                                            o.duration_type_id ==
                                              values.subscription
                                        )[0]?.prices}
                                  </span>

                                  <p>
                                    Will be charged today. You can cancel
                                    anytime.
                                  </p>
                                </div>
                                <ul className="payment-managment-right">
                                  <li>
                                    <span className="label">Plan</span>
                                    <span className="value">
                                      {props.plans
                                        ?.filter((ind) => ind.id == values.plan)
                                        .map((item) => (
                                          <Fragment key={item.id}>
                                            {item.name}
                                          </Fragment>
                                        ))}{" "}
                                    </span>
                                  </li>
                                  <li>
                                    <span className="label">Membership</span>
                                    <span className="value">
                                      {getData?.trading_types_through
                                        ?.filter(
                                          (ind) => ind.id == values.trading
                                        )
                                        .map((item) => (
                                          <Fragment key={item.id}>
                                            {item.name}
                                          </Fragment>
                                        ))}{" "}
                                      <span>
                                        /
                                        {getData?.duration_types_through
                                          ?.filter(
                                            (ind) =>
                                              ind.id == values.subscription
                                          )
                                          .map((item) => (
                                            <Fragment key={item.id}>
                                              {item.name}
                                            </Fragment>
                                          ))}
                                      </span>
                                    </span>
                                  </li>
                                  <li>
                                    <span className="label">
                                      Payment Method
                                    </span>
                                    <span className="value">
                                      <img
                                        src={
                                          values.payment_method == "card"
                                            ? "/images/card-2.svg"
                                            : "/images/paypal.svg"
                                        }
                                        alt=""
                                      />
                                    </span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <h2 className="payment-title">
                              <svg
                                width="29"
                                height="27"
                                viewBox="0 0 29 27"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M27.2419 6.5L15.6794 0.875H13.3669L1.80437 6.5L0.671249 8.1125V19.3625L1.80437 20.9562L13.3669 26.5812H15.6794L27.2419 20.9562L28.375 19.3625V8.1125L27.2419 6.5ZM13.3669 24.425L2.96062 19.3625V9.6875L13.3669 14.2812V24.425ZM3.56187 7.8125L14.5231 2.4875L25.4844 7.8125L14.5231 12.6687L3.56187 7.8125ZM26.0856 19.3625L15.6794 24.425V14.2812L26.0856 9.6875V19.3625Z"
                                  fill="#0074BC"
                                />
                              </svg>
                              Pay & Activate your membership
                            </h2>
                            <PayPalScriptProvider
                              options={{
                                "client-id": `${process.env.PAYPAL_CLIENT_ID}`,
                                intent: "subscription",
                                vault: true,
                                "disable-funding": "credit",
                              }}
                            >
                              <ButtonWrapper
                                type="subscription"
                                plan_id={planToken}
                                onApprove={(data, actions) =>
                                  onApproveSubscriptionHandler(
                                    data,
                                    actions,
                                    values
                                  )
                                }
                              />
                            </PayPalScriptProvider>
                          </Grid>
                        )}

                        <Grid item xs={12} className="text-center">
                          <ul
                            className={`signup-btns ${
                              activeStep == 0 && "d-block"
                            }`}
                          >
                            {activeStep == 1 && (
                              <li>
                                <Button
                                  type="button"
                                  fullWidth
                                  className="btnStyle btnStyleOutline"
                                  onClick={handleChnagePrevious}
                                >
                                  Previous
                                </Button>
                              </li>
                            )}

                            {activeStep == 0 && (
                              <li>
                                <Button
                                  type="submit"
                                  fullWidth
                                  className="btnStyle btnLg btnStyleThemeBg"
                                  disabled={btnDisabled}
                                >
                                  Next
                                </Button>
                              </li>
                            )}
                          </ul>
                        </Grid>
                      </Grid>
                    </Form>
                  )}
                </Formik>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Footer className="container" classNameParent="no-position" />
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  payment_type: state.common.payment_type,
});
UpdatePlan.getInitialProps = async (ctx) => {
  const plan_data = await getServerApiRequest(
    `get-plan-list`,
    null,
    ctx.req?.cookies?.user_token
  );
  const market_data = await getServerApiRequest(
    `get-market-list`,
    null,
    ctx.req?.cookies?.user_token
  );
  return {
    plans: plan_data.data.data.plans,
    markets: market_data.data.data.markets,
  };
};
export default connect(mapStateToProps, {
  getPaymentTypeAction,
  updatePlan,
})(UpdatePlan);
