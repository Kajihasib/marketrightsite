import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  FormControlLabel,
  FormLabel,
  Grid,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Field, FieldArray, Form, Formik } from "formik";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import * as Yup from "yup";
import InputField from "../components/formFields/input";
import MultiCheckbox from "../components/formFields/multi_checkbox";
import SelectField from "../components/formFields/select";
import ButtonWrapper from "../components/paypal-btn";
import PublicFooter from "../components/public-footer";
import PublicHeader from "../components/public-header";
import { signupAction } from "../redux/actions/auth";
import {
  getCountryAction,
  getIntarestedInAction,
  getTradingExperienceAction,
} from "../redux/actions/common";
import { country_code } from "../utils/code";
import { getServerApiRequest } from "../utils/serverApi";
const cookie = new Cookies();

const ages = [
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
  "49",
  "50",
  "51",
  "52",
  "53",
  "54",
  "55",
  "56",
  "57",
  "58",
  "59",
  "60",
  "61",
  "62",
  "63",
  "64",
  "65",
  "66",
  "67",
  "68",
  "69",
  "70",
  "71",
  "72",
  "73",
  "74",
  "75",
  "76",
  "77",
  "78",
  "79",
  "80",
  "81",
  "82",
  "83",
  "84",
  "85",
  "86",
  "87",
  "89",
  "90",
  "91",
  "92",
  "93",
  "94",
  "95",
  "96",
  "97",
  "98",
  "99",
  "100",
];

const Signup = (props) => {
  const steps = ["Personal info", "Plan & Membership", "Payment"];
  const [getData, setData] = useState({});
  const [value, setValue] = useState();

  const validationSchema = [
    Yup.object().shape({
      full_name: Yup.string().required(`Full name can not be empty`),
      phone: Yup.string().required(`Phone can not be empty`),
      email: Yup.string()
        .email(`email must be a valid email`)
        .required(`Email can not be empty`),
      password: Yup.string()
        .required(`password can not be empty`)
        .min(8, `password must be at least 8 characters`),
      country: Yup.string().required(`Country can not be empty`),
      age: Yup.string().required(`Age can not be empty`),
      trading_experience: Yup.string().required(
        `Trading Experience can not be empty`
      ),
      interested_in: Yup.string().required(`Interested In can not be empty`),
      confirm_password: Yup.string()
        .required(`confirm password can not be empty`)
        .oneOf([Yup.ref("password"), null], `password dose not match`),
    }),

    Yup.object().shape({
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
      trems_ofus: Yup.bool().oneOf(
        [true],
        `Accept Terms & Conditions is required`
      ),
    }),
  ];
  const router = useRouter();

  const [activeStep, setActiveStep] = useState(0);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [planToken, setPlanToken] = useState("");
  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;
  const [state, setState] = useState({
    show_pass: false,
    con_pass: false,
  });
  const [items, setItems] = useState(null);
  const [expanded, setExpanded] = useState(props.markets[0].slug);
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
    setItems(cookie.get("items"));
  };
  const initialState = {
    full_name: items?.name ? items?.name : "",
    phone: items?.phone ? items?.phone : "",
    email: items?.email ? items?.email : "",
    password: items?.password ? items?.password : "",
    confirm_password: items?.confirm_password ? items?.confirm_password : "",
    country: items?.country ? items?.country : "",
    age: items?.age ? items?.age : "",
    instruments: items?.instruments ? items?.instruments : [],
    plan: items?.plan ? items?.plan : props.plans[0]?.id,
    subscription: items?.subscription
      ? items?.subscription
      : props.plans[0]?.duration_types_through[0]?.id,
    trading_experience: items?.trading_experience
      ? items?.trading_experience
      : "",
    interested_in: items?.interested_in ? items?.interested_in : "",
    trading: items?.trading
      ? items?.trading
      : props.plans[0]?.trading_types_through[0]?.id,
    mode: items?.mode ? items?.mode : "normal",
    payment_method: items?.payment_method ? items?.payment_method : "",
    trems_ofus: false,
  };

  async function _submitForm(values, actions) {
    actions.setSubmitting(false);
    setActiveStep(activeStep + 1);
    setBtnDisabled(true);
  }

  const _handleSubmit = (values, actions) => {
    if (isValidPhoneNumber(value)) {
      if (isLastStep) {
        _submitForm(values, actions);
        setActiveStep(0);
      } else {
        setActiveStep(activeStep + 1);
        actions.setTouched({});
        actions.setSubmitting(false);
      }
    } else {
      toast.error(`Invalid phone number`);
    }
  };
  const filter_by_get_data = props.plans.filter(
    (item) => item.id == items?.plan
  )[0];

  useEffect(() => {
    setData(filter_by_get_data);
  }, [filter_by_get_data]);
  useEffect(() => {
    props.getCountryAction();
    props.getTradingExperienceAction();
    props.getIntarestedInAction();
    setItems(cookie.get("items"));
    setData(props.plans[0]);
  }, []);
  useEffect(() => {
    setPlanToken(
      getData?.prices?.filter((o) =>
        o.trading_type_id == items?.trading
          ? items?.trading
          : props.plans[0]?.trading_types_through[0]?.id &&
            o.duration_type_id == items?.subscription
          ? items?.subscription
          : props.plans[0]?.duration_types_through[0]?.id
      )[0]?.paypal_plan_id
    );
  }, [getData]);
  const handlePrice = (value, values, id) => {
    setData(value);
    cookie.set("items", {
      name: values.full_name,
      email: values.email,
      phone: values.phone,
      country: values.country,
      age: values.age,
      password: values.password,
      confirm_password: values.confirm_password,
      trading_experience: values.trading_experience,
      interested_in: values.interested_in,
      subscription: values.subscription,
      plan: id,
      trading: values.trading,
      instruments: values.instruments,
      mode: values.mode,
      payment_method: values.payment_method,
      trems_ofus: values.trems_ofus,
    });
  };
  useEffect(() => {
    if (cookie.get("user_token")) {
      router.back();
    }
  }, []);
  const onApproveSubscriptionHandler = (data, actions, values) => {
    const data_val = {
      name: values.full_name,
      email: values.email,
      phone: values.phone,
      age: items?.age ? items?.age : "",
      country: values.country,
      password: values.password,
      password_confirmation: values.confirm_password,
      trading_experience: values.trading_experience,
      interested_in: values.interested_in,
      plan: values.plan,
      payment_type: values.subscription,
      trading_type: values.trading,
      instrument: values.instruments,
      mode: values.mode,
      subscription_id: data.subscriptionID,
      order_id: data.orderID,
      payment_method: values.payment_method,
    };
    props.signupAction(data_val, router);
  };
  const handleSetCookiesValue = (values) => {
    cookie.set("items", {
      name: values.full_name,
      email: values.email,
      phone: values.phone,
      country: values.country,
      age: values.age,
      password: values.password,
      confirm_password: values.confirm_password,
      trading_experience: values.trading_experience,
      interested_in: values.interested_in,
      subscription: values.subscription,
      plan: values.plan,
      trading: values.trading,
      instruments: values.instruments,
      mode: values.mode,
      payment_method: values.payment_method,
      trems_ofus: values.trems_ofus,
    });
    setItems(cookie.get("items"));
  };

  const handleGetPlanId = (id) => {
    setPlanToken(id);
  };
  const handleChnagePrevious = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Fragment>
      <Head>
        <title>Sign up</title>
        <meta name="description" content="Market Rite side" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PublicHeader />
      <main className="main-container">
        <Grid className="container public-container">
          <Grid className="row justify-content-center">
            <Grid className="col-lg-7 col-md-8 col-12">
              <Grid className="auth-wrap auth-signup">
                <Stepper
                  activeStep={activeStep}
                  className="signupStepMinWrap"
                  alternativeLabel
                >
                  {steps.map((label) => (
                    <Step className="signupStepWrap" key={label}>
                      <StepLabel
                        classes={{
                          active: "signupStepLabelActive",
                          root: "signupStepLabel",
                        }}
                      >
                        {label}
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
                <Grid className="text-center auth-header">
                  {activeStep === 2 && (
                    <img
                      className="plan-image"
                      src="/images/wallet.svg"
                      alt="wallet"
                    />
                  )}
                  <h1 className="title">
                    {activeStep == 0 && "Personal info"}
                    {activeStep == 1 && "Plan & Membership"}
                    {activeStep == 2 && "Payment"}
                  </h1>

                  {activeStep == 0 && (
                    <p>Please use your valid information below</p>
                  )}
                  {activeStep == 1 && (
                    <p>Please choose your preferred plan and membership</p>
                  )}

                  {activeStep == 2 && (
                    <p className="payment-subtitle">
                      Use your preferred payment method to{" "}
                      <span>pay & complete signup</span>
                    </p>
                  )}
                </Grid>
                <Grid className="authForm">
                  <Formik
                    enableReinitialize
                    initialValues={initialState}
                    validationSchema={currentValidationSchema}
                    onSubmit={_handleSubmit}
                  >
                    {({ setFieldValue, errors, touched, values }) => (
                      <Form id="createGroup">
                        <Grid container spacing={2}>
                          {activeStep === 0 && (
                            <Fragment>
                              <Grid item xs={12}>
                                <InputField
                                  className="profileInputStyle"
                                  label="Full Name"
                                  name="full_name"
                                  fullWidth
                                  FormHelperTextProps={{
                                    component: "div",
                                  }}
                                  onBlur={() => handleSetCookiesValue(values)}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <InputField
                                  className="profileInputStyle"
                                  label="Email"
                                  name="email"
                                  fullWidth
                                  FormHelperTextProps={{
                                    component: "div",
                                  }}
                                  onBlur={() => handleSetCookiesValue(values)}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <PhoneInput
                                  value={value}
                                  onChange={(e) => {
                                    setValue(e);
                                    setFieldValue("phone", e);
                                  }}
                                  defaultCountry="BD"
                                  international
                                  countryCallingCodeEditable={false}
                                  className="inputNumber"
                                  countries={country_code}
                                />
                                <span className="errorMessage">
                                  {value
                                    ? isValidPhoneNumber(value)
                                      ? undefined
                                      : "Invalid phone number"
                                    : "Phone number required"}
                                </span>
                              </Grid>
                              <Grid item sm={6} xs={12}>
                                <SelectField
                                  className="profileInputStyle"
                                  label="Age"
                                  name="age"
                                  fullWidth
                                  FormHelperTextProps={{
                                    component: "div",
                                  }}
                                  onBlur={() => handleSetCookiesValue(values)}
                                  select
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                >
                                  <MenuItem selected disabled>
                                    Select Age
                                  </MenuItem>
                                  {ages.map((item) => (
                                    <MenuItem key={item} value={item}>
                                      {item}
                                    </MenuItem>
                                  ))}
                                </SelectField>
                              </Grid>
                              <Grid item sm={6} xs={12}>
                                <SelectField
                                  className="profileInputStyle"
                                  label="Country"
                                  name="country"
                                  fullWidth
                                  FormHelperTextProps={{
                                    component: "div",
                                  }}
                                  onBlur={() => handleSetCookiesValue(values)}
                                  select
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                >
                                  <MenuItem selected disabled>
                                    Select Country
                                  </MenuItem>
                                  {Object.keys(props.countries).map((item) => (
                                    <MenuItem key={item} value={item}>
                                      {props.countries[item]}
                                    </MenuItem>
                                  ))}
                                </SelectField>
                              </Grid>
                              <Grid item sm={6} xs={12}>
                                <SelectField
                                  className="profileInputStyle"
                                  label="Trading Experience"
                                  name="trading_experience"
                                  fullWidth
                                  FormHelperTextProps={{
                                    component: "div",
                                  }}
                                  onBlur={() => handleSetCookiesValue(values)}
                                  select
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                >
                                  <MenuItem selected disabled>
                                    Select Experience
                                  </MenuItem>
                                  {props.tradings.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                      {item.name}
                                    </MenuItem>
                                  ))}
                                </SelectField>
                              </Grid>
                              <Grid item sm={6} xs={12}>
                                <SelectField
                                  className="profileInputStyle"
                                  label="Interested In"
                                  name="interested_in"
                                  fullWidth
                                  FormHelperTextProps={{
                                    component: "div",
                                  }}
                                  onBlur={() => handleSetCookiesValue(values)}
                                  select
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                >
                                  <MenuItem selected disabled>
                                    Select Interested In
                                  </MenuItem>
                                  {Object.keys(props.intarested).map((item) => (
                                    <MenuItem key={item} value={item}>
                                      {props.intarested[item]}
                                    </MenuItem>
                                  ))}
                                </SelectField>
                              </Grid>
                              <Grid item sm={6} xs={12}>
                                <InputField
                                  className="profileInputStyle"
                                  label="Password"
                                  name="password"
                                  FormHelperTextProps={{
                                    component: "div",
                                  }}
                                  onBlur={() => handleSetCookiesValue(values)}
                                  type={state.show_pass ? "text" : "password"}
                                  fullWidth
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  InputProps={{
                                    endAdornment: (
                                      <InputAdornment
                                        style={{ cursor: "pointer" }}
                                        onClick={() =>
                                          setState({
                                            ...state,
                                            show_pass: !state.show_pass,
                                          })
                                        }
                                        position="end"
                                      >
                                        {state.show_pass ? (
                                          <VisibilityIcon />
                                        ) : (
                                          <VisibilityOffIcon />
                                        )}
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                              </Grid>
                              <Grid item sm={6} xs={12}>
                                <InputField
                                  className="profileInputStyle"
                                  label="Confirm Password   "
                                  name="confirm_password"
                                  FormHelperTextProps={{
                                    component: "div",
                                  }}
                                  onBlur={() => handleSetCookiesValue(values)}
                                  type={state.con_pass ? "text" : "password"}
                                  fullWidth
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  InputProps={{
                                    endAdornment: (
                                      <InputAdornment
                                        style={{ cursor: "pointer" }}
                                        onClick={() =>
                                          setState({
                                            ...state,
                                            con_pass: !state.con_pass,
                                          })
                                        }
                                        position="end"
                                      >
                                        {state.con_pass ? (
                                          <VisibilityIcon />
                                        ) : (
                                          <VisibilityOffIcon />
                                        )}
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                              </Grid>
                            </Fragment>
                          )}
                          {activeStep === 1 && (
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
                                  Choose your preferred instruments
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
                                                        (item.slug ==
                                                          "indices" &&
                                                          "/images/markets/indices.svg") ||
                                                        (item.slug == "forex" &&
                                                          "/images/markets/forex.svg") ||
                                                        (item.slug ==
                                                          "crypto" &&
                                                          "/images/markets/crypto.svg")
                                                      }
                                                      alt={item.name}
                                                    />
                                                  </span>{" "}
                                                  <span
                                                    translate="no"
                                                    className="name"
                                                  >
                                                    {item.name}
                                                  </span>
                                                </span>
                                                <span className="arrow">
                                                  <ArrowRightIcon />
                                                </span>
                                              </AccordionSummary>
                                              <AccordionDetails className="accordionBody">
                                                {item.instruments?.length >
                                                0 ? (
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
                                  <p className="errorMsg">
                                    {errors.instruments}
                                  </p>
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
                                    setFieldValue(
                                      "subscription",
                                      e.target.value
                                    );
                                    setFieldValue("trading", "");
                                    cookie.set("items", {
                                      name: values.full_name,
                                      email: values.email,
                                      phone: values.phone,
                                      country: values.country,
                                      age: values.age,
                                      password: values.password,
                                      confirm_password: values.confirm_password,
                                      trading_experience:
                                        values.trading_experience,
                                      interested_in: values.interested_in,
                                      subscription: e.target.value,
                                      plan: values.plan,
                                      trading: values.trading,
                                      instruments: values.instruments,
                                      mode: values.mode,
                                      payment_method: values.payment_method,
                                      trems_ofus: values.trems_ofus,
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
                                {errors.subscription &&
                                  touched.subscription && (
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
                                      name: values.full_name,
                                      email: values.email,
                                      phone: values.phone,
                                      country: values.country,
                                      age: values.age,
                                      password: values.password,
                                      confirm_password: values.confirm_password,
                                      trading_experience:
                                        values.trading_experience,
                                      interested_in: values.interested_in,
                                      subscription: values.subscription,
                                      plan: values.plan,
                                      trading: e.target.value,
                                      instruments: values.instruments,
                                      mode: values.mode,
                                      payment_method: values.payment_method,
                                      trems_ofus: values.trems_ofus,
                                    });
                                  }}
                                >
                                  {getData?.trading_types_through?.map(
                                    (item) => (
                                      <Grid key={item.id}>
                                        <Grid className="time-feame">
                                          <FormControlLabel
                                            value={item.id}
                                            control={<Radio />}
                                            label={item.name}
                                            translate="no"
                                            onBlur={() =>
                                              handleSetCookiesValue(values)
                                            }
                                            onClick={() =>
                                              handleGetPlanId(
                                                getData?.prices?.filter(
                                                  (o) =>
                                                    o.trading_type_id ==
                                                      item.id &&
                                                    o.duration_type_id ==
                                                      values.subscription
                                                )[0]?.paypal_plan_id
                                              )
                                            }
                                          />
                                          <span translate="no" className="time">
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
                                    )
                                  )}
                                </RadioGroup>
                                {errors.trading && touched.trading && (
                                  <p className="errorMsg">{errors.trading}</p>
                                )}
                                {getData?.prices?.filter(
                                  (o) =>
                                    o.trading_type_id == values.trading &&
                                    o.duration_type_id == values.subscription
                                )[0]?.allow_trail == "Yes" && (
                                  <Fragment>
                                    <h4 className="trail-mode-title">
                                      <svg
                                        width="22"
                                        height="21"
                                        viewBox="0 0 22 21"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M1 7.05368H20.1458V18.1381C20.1458 18.4054 20.0396 18.6617 19.8507 18.8506C19.6617 19.0396 19.4054 19.1458 19.1381 19.1458H2.00767C1.74042 19.1458 1.48412 19.0396 1.29514 18.8506C1.10617 18.6617 1 18.4054 1 18.1381V7.05368ZM1 2.51915C1 2.2519 1.10617 1.99559 1.29514 1.80662C1.48412 1.61764 1.74042 1.51147 2.00767 1.51147H19.1381C19.4054 1.51147 19.6617 1.61764 19.8507 1.80662C20.0396 1.99559 20.1458 2.2519 20.1458 2.51915V7.05368H1V2.51915Z"
                                          stroke="#002D5C"
                                          strokeWidth="2"
                                          strokeLinejoin="round"
                                        />
                                        <path
                                          d="M6.54224 13.0997L9.56526 16.1227L15.6113 10.0767"
                                          stroke="#002D5C"
                                          strokeWidth="2"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                      Choose the plan type you need
                                    </h4>
                                    <ul className="trail-mode-btns">
                                      <li>
                                        <input
                                          type="radio"
                                          id="trail"
                                          name="mode"
                                          value="trail"
                                          onChange={(e) => {
                                            setFieldValue(
                                              "mode",
                                              e.target.value
                                            );
                                            setItems(cookie.get("items"));
                                          }}
                                          onBlur={() =>
                                            handleSetCookiesValue(values)
                                          }
                                          checked={
                                            values.mode == "trail"
                                              ? true
                                              : false
                                          }
                                        />
                                        <label htmlFor="trail">
                                          <span className="name">
                                            {
                                              getData?.prices?.filter(
                                                (o) =>
                                                  o.trading_type_id ==
                                                    values.trading &&
                                                  o.duration_type_id ==
                                                    values.subscription
                                              )[0]?.trail_duration
                                            }{" "}
                                            Days Trial
                                          </span>
                                          <span className="text">
                                            For Trial - $0.0 for first{" "}
                                            {
                                              getData?.prices?.filter(
                                                (o) =>
                                                  o.trading_type_id ==
                                                    values.trading &&
                                                  o.duration_type_id ==
                                                    values.subscription
                                              )[0]?.trail_duration
                                            }{" "}
                                            days
                                          </span>
                                        </label>
                                      </li>
                                      <li>
                                        <input
                                          type="radio"
                                          id="normal"
                                          name="mode"
                                          value="normal"
                                          onChange={(e) => {
                                            setFieldValue(
                                              "mode",
                                              e.target.value
                                            );
                                            setItems(cookie.get("items"));
                                          }}
                                          onBlur={() =>
                                            handleSetCookiesValue(values)
                                          }
                                          checked={
                                            values.mode == "normal"
                                              ? true
                                              : false
                                          }
                                        />
                                        <label htmlFor="normal">
                                          <span className="name">
                                            Regular plan
                                          </span>
                                          <span className="text">
                                            You have to pay full price
                                          </span>
                                        </label>
                                      </li>
                                    </ul>
                                  </Fragment>
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
                                      onBlur={() =>
                                        handleSetCookiesValue(values)
                                      }
                                      translate="no"
                                    />
                                    <FormLabel htmlFor="paypal">
                                      <img
                                        src="/images/paypal.svg"
                                        alt="paypal"
                                      />
                                      <span translate="no">PayPal</span>
                                    </FormLabel>
                                  </span>
                                  <span className="payment-method-btn">
                                    <Radio
                                      value="card"
                                      id="card"
                                      onBlur={() =>
                                        handleSetCookiesValue(values)
                                      }
                                      translate="no"
                                    />
                                    <FormLabel htmlFor="card">
                                      <img
                                        src="/images/card-2.svg"
                                        alt="card"
                                      />
                                      <span translate="no">
                                        Debit/Credit Card
                                      </span>
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
                              <Grid item xs={12}>
                                <div className="terms-checkbox">
                                  <Checkbox
                                    id="trems_ofus"
                                    name="trems_ofus"
                                    value={true}
                                    onBlur={() => handleSetCookiesValue(values)}
                                    onChange={(e) =>
                                      setFieldValue(
                                        "trems_ofus",
                                        e.target.checked
                                      )
                                    }
                                    checked={values.trems_ofus}
                                  />
                                  <FormLabel htmlFor="trems_ofus">
                                    <p className="trems-agery">
                                      By clicking Create an Account, you are
                                      indicating that you have rea and agree to
                                      our{" "}
                                      <Link href="/terms-of-service">
                                        <a>Terms & Conditions</a>
                                      </Link>
                                      , and{" "}
                                      <Link href="/privacy-policy">
                                        <a>Privacy Policy</a>
                                      </Link>{" "}
                                      and{" "}
                                      <Link href="/disclaimer">
                                        <a>Disclaimer</a>
                                      </Link>
                                    </p>
                                  </FormLabel>
                                </div>
                                {errors.trems_ofus && touched.trems_ofus && (
                                  <p className="errorMsg">
                                    {errors.trems_ofus}
                                  </p>
                                )}
                              </Grid>
                            </Fragment>
                          )}
                          {activeStep === 2 && (
                            <Grid xs={12} item>
                              <Grid className="payment-wrap">
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
                                          ?.filter(
                                            (ind) => ind.id == values.plan
                                          )
                                          .map((item) => (
                                            <Fragment key={item.id}>
                                              {item.name}
                                            </Fragment>
                                          ))}{" "}
                                        {values.mode == "trail" ? "Trial" : ""}
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
                                {values.mode == "trail" && (
                                  <p className="note">
                                    <span>Note:</span>
                                    For Trial - $0.0 for first{" "}
                                    {
                                      getData?.prices?.filter(
                                        (o) =>
                                          o.trading_type_id == values.trading &&
                                          o.duration_type_id ==
                                            values.subscription
                                      )[0]?.trail_duration
                                    }{" "}
                                    days and after $
                                    {
                                      getData?.prices?.filter(
                                        (o) =>
                                          o.trading_type_id == values.trading &&
                                          o.duration_type_id ==
                                            values.subscription
                                      )[0]?.prices
                                    }{" "}
                                    every month
                                  </p>
                                )}
                              </Grid>
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
                              <Grid className="payment-note">
                                <span className="note">Note:</span>
                                <p className="text">
                                  Your account and membership will be activated
                                  only when payment will be successful
                                </p>
                              </Grid>
                              {values.mode == "trail" && (
                                <Grid className="trail-note">
                                  <span className="text">
                                    <svg
                                      width="68"
                                      height="68"
                                      viewBox="0 0 68 68"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M7.51408 15.8263C7.51408 13.6218 8.38983 11.5075 9.94869 9.94869C11.5075 8.38983 13.6218 7.51408 15.8263 7.51408H19.6047C21.7995 7.51282 23.9047 6.64356 25.461 5.09596L28.1058 2.45115C28.8783 1.67433 29.7967 1.05787 30.8082 0.63721C31.8198 0.216553 32.9045 0 34 0C35.0955 0 36.1802 0.216553 37.1917 0.63721C38.2033 1.05787 39.1217 1.67433 39.8942 2.45115L42.539 5.09596C44.0953 6.64356 46.2005 7.51282 48.3953 7.51408H52.1736C54.3782 7.51408 56.4925 8.38983 58.0513 9.94869C59.6102 11.5075 60.4859 13.6218 60.4859 15.8263V19.6047C60.4872 21.7995 61.3564 23.9047 62.904 25.461L65.5489 28.1058C66.3257 28.8783 66.9421 29.7967 67.3628 30.8082C67.7834 31.8198 68 32.9045 68 34C68 35.0955 67.7834 36.1802 67.3628 37.1917C66.9421 38.2033 66.3257 39.1217 65.5489 39.8942L62.904 42.539C61.3564 44.0953 60.4872 46.2005 60.4859 48.3953V52.1736C60.4859 54.3782 59.6102 56.4925 58.0513 58.0513C56.4925 59.6102 54.3782 60.4859 52.1736 60.4859H48.3953C46.2005 60.4872 44.0953 61.3564 42.539 62.904L39.8942 65.5489C39.1217 66.3257 38.2033 66.9421 37.1917 67.3628C36.1802 67.7834 35.0955 68 34 68C32.9045 68 31.8198 67.7834 30.8082 67.3628C29.7967 66.9421 28.8783 66.3257 28.1058 65.5489L25.461 62.904C23.9047 61.3564 21.7995 60.4872 19.6047 60.4859H15.8263C13.6218 60.4859 11.5075 59.6102 9.94869 58.0513C8.38983 56.4925 7.51408 54.3782 7.51408 52.1736V48.3953C7.51282 46.2005 6.64356 44.0953 5.09596 42.539L2.45115 39.8942C1.67433 39.1217 1.05787 38.2033 0.63721 37.1917C0.216553 36.1802 0 35.0955 0 34C0 32.9045 0.216553 31.8198 0.63721 30.8082C1.05787 29.7967 1.67433 28.8783 2.45115 28.1058L5.09596 25.461C6.64356 23.9047 7.51282 21.7995 7.51408 19.6047V15.8263Z"
                                        fill="#0074BC"
                                      />
                                      <path
                                        d="M22.0503 34.3297L27.3742 45.1799L25.5186 46.0904L20.1948 35.2402L22.0503 34.3297ZM25.4559 32.6587L26.1872 34.1491L17.5503 38.387L16.819 36.8966L25.4559 32.6587ZM30.2218 35.683L33.4249 42.211L31.6289 43.0922L27.6726 35.0291L29.3866 34.1881L30.2218 35.683ZM31.9096 32.8854L32.7137 34.562C32.5947 34.5958 32.4681 34.6394 32.3341 34.6928C32.205 34.7438 32.0784 34.7998 31.9542 34.8607C31.6462 35.0119 31.3974 35.1894 31.2077 35.3934C31.0157 35.5924 30.8804 35.8129 30.8018 36.0549C30.7258 36.2894 30.7017 36.5417 30.7294 36.8116C30.757 37.0816 30.8329 37.3618 30.9569 37.6523L30.5617 37.8833C30.3131 37.3765 30.1324 36.8827 30.0197 36.4017C29.9069 35.9207 29.8695 35.4675 29.9073 35.0421C29.9501 34.6143 30.078 34.2341 30.2908 33.9016C30.5087 33.5667 30.8188 33.3005 31.2212 33.103C31.3305 33.0494 31.4521 33.002 31.5861 32.961C31.725 32.9175 31.8328 32.8923 31.9096 32.8854ZM35.1094 31.3801L39.0657 39.4432L37.2623 40.3281L33.306 32.265L35.1094 31.3801ZM32.1483 30.2071C32.0142 29.9339 31.9928 29.6639 32.0839 29.3973C32.1775 29.1233 32.3857 28.9071 32.7087 28.7486C33.0266 28.5926 33.3226 28.5614 33.5966 28.6551C33.8682 28.7437 34.071 28.9247 34.2051 29.1979C34.3367 29.4662 34.3545 29.7348 34.2584 30.0039C34.1624 30.2729 33.9554 30.4855 33.6374 30.6415C33.3145 30.7999 33.0172 30.8348 32.7457 30.7462C32.4791 30.6551 32.28 30.4754 32.1483 30.2071ZM44.9117 34.5684L43.0249 30.7231C42.8835 30.435 42.7095 30.2122 42.5028 30.0547C42.2961 29.8972 42.0579 29.8138 41.7882 29.8043C41.5234 29.7925 41.2321 29.8645 40.9141 30.0205C40.621 30.1643 40.392 30.3383 40.2272 30.5425C40.0623 30.7467 39.9617 30.9625 39.9253 31.1899C39.889 31.4173 39.9232 31.6379 40.028 31.8515L38.2395 32.729C38.0835 32.4111 38.0094 32.0653 38.0171 31.6916C38.0249 31.318 38.118 30.9425 38.2966 30.5652C38.4751 30.1879 38.7352 29.8322 39.0767 29.4982C39.4183 29.1641 39.8425 28.8728 40.3492 28.6242C40.9553 28.3268 41.5418 28.1654 42.1088 28.1399C42.6807 28.112 43.2019 28.2384 43.6725 28.5191C44.1456 28.7924 44.5333 29.2371 44.8356 29.8532L46.5944 33.4376C46.7748 33.8052 46.9617 34.1234 47.1552 34.3921C47.3513 34.6535 47.5514 34.8666 47.7555 35.0315L47.814 35.1507L45.9734 36.0538C45.7939 35.9015 45.6061 35.6885 45.4102 35.4148C45.2168 35.1337 45.0506 34.8516 44.9117 34.5684ZM43.56 31.154L44.1197 32.2571L42.8305 32.8897C42.4976 33.053 42.2204 33.2291 41.9987 33.418C41.7746 33.6019 41.6073 33.795 41.4969 33.9971C41.3865 34.1992 41.3305 34.4054 41.3289 34.6158C41.3273 34.8261 41.379 35.0381 41.4838 35.2518C41.5886 35.4654 41.7346 35.6372 41.9217 35.7673C42.1064 35.8925 42.3175 35.9584 42.555 35.9651C42.7975 35.9694 43.0554 35.9045 43.3286 35.7704C43.6963 35.5901 43.9801 35.3583 44.1802 35.0752C44.3829 34.7847 44.5101 34.4911 44.5618 34.1945C44.6111 33.893 44.5919 33.6404 44.5044 33.4368L45.4769 33.9489C45.5172 34.1819 45.5226 34.4505 45.4931 34.7546C45.4636 35.0588 45.3845 35.375 45.2558 35.7032C45.1297 36.024 44.9381 36.3307 44.6809 36.6233C44.4288 36.9134 44.0941 37.1609 43.6768 37.3656C43.1502 37.624 42.6295 37.7501 42.1148 37.7437C41.5976 37.7324 41.1345 37.6052 40.7255 37.3621C40.314 37.114 39.9962 36.7614 39.7719 36.3044C39.5623 35.8771 39.4565 35.4605 39.4546 35.0546C39.4552 34.6413 39.5572 34.2461 39.7605 33.869C39.9687 33.4894 40.2734 33.1304 40.6744 32.7918C41.0729 32.4483 41.5653 32.1328 42.1515 31.8451L43.56 31.154ZM45.819 21.9275L51.4354 33.3738L49.632 34.2587L44.0156 22.8123L45.819 21.9275Z"
                                        fill="white"
                                      />
                                    </svg>
                                  </span>
                                  <ul>
                                    <li>
                                      Trial Plan gives access to Basic swing
                                      trading plan
                                    </li>
                                    <li>
                                      After 7 days Trial, your subscription will
                                      be automatically renewed to Basic Swing
                                      Trading Plan at $15 per month
                                    </li>
                                    <li>
                                      3. You can cancel trial in{" "}
                                      {
                                        getData?.prices?.filter(
                                          (o) =>
                                            o.trading_type_id ==
                                              values.trading &&
                                            o.duration_type_id ==
                                              values.subscription
                                        )[0]?.trail_duration
                                      }{" "}
                                      days & upgrade to a new plan
                                    </li>
                                    <li>
                                      Trial can be cancelled by 12 hour notice
                                    </li>
                                    <li>
                                      5. No refunds will be accepted if
                                      subscription is renewed after{" "}
                                      {
                                        getData?.prices?.filter(
                                          (o) =>
                                            o.trading_type_id ==
                                              values.trading &&
                                            o.duration_type_id ==
                                              values.subscription
                                        )[0]?.trail_duration
                                      }{" "}
                                      days
                                    </li>
                                    <li>
                                      Market RightSide reserves the rights to
                                      cancel the trial without any prior notice
                                    </li>
                                  </ul>
                                </Grid>
                              )}
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
                              {activeStep == 2 && (
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
                              {isLastStep ? null : (
                                <li>
                                  <Button
                                    type="submit"
                                    fullWidth
                                    className="btnStyle btnLg btnStyleThemeBg"
                                    disabled={btnDisabled}
                                  >
                                    {isLastStep
                                      ? "Sign Up"
                                      : activeStep == 0
                                      ? "Previous"
                                      : "Next"}
                                  </Button>
                                </li>
                              )}
                            </ul>
                          </Grid>
                          {activeStep == 0 && (
                            <Grid item xs={12} className="text-center">
                              <p className="fs-16 alreadyMember">
                                Already a member
                                <Link href="/signin">
                                  <a className="theme-color">Sign In</a>
                                </Link>
                              </p>
                            </Grid>
                          )}
                        </Grid>
                      </Form>
                    )}
                  </Formik>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </main>
      <PublicFooter />
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  countries: state.common.countries,
  tradings: state.common.tradings,
  intarested: state.common.intarested,
});
Signup.getInitialProps = async (ctx) => {
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
  getCountryAction,
  getTradingExperienceAction,
  getIntarestedInAction,
  signupAction,
})(Signup);
