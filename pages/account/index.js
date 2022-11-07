import { Button, Grid, MenuItem } from "@mui/material";
import { Form, Formik } from "formik";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import * as Yup from "yup";
import InputField from "../../components/formFields/input";
import SelectField from "../../components/formFields/select";
import HeaderSidebar from "../../components/header-navbar";
import { updateProfileAction } from "../../redux/actions/auth";
import {
  getCountryAction,
  getIntarestedInAction,
  getTradingExperienceAction,
  getUserInfo,
} from "../../redux/actions/common";

const ages = [
  18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
  37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55,
  56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74,
  75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 89, 90, 91, 92, 93, 94,
  95, 96, 97, 98, 99, 100,
];
const validationSchema = Yup.object({
  full_name: Yup.string().required("Full name can not be empty"),
  phone: Yup.string().required("Phone can not be empty"),
  email: Yup.string()
    .email("Email must be a valid email")
    .required("Email can not be empty"),

  country: Yup.string().required("Country can not be empty"),
  age: Yup.string().required("Age can not be empty"),
  trading_experience: Yup.string().required(
    "Trading Experience can not be empty"
  ),
  interested_in: Yup.string().required("Interested In can not be empty"),
});
const Account = (props) => {
  const router = useRouter();
  const [btnDisabled, setBtnDisabled] = useState(false);

  const initialState = {
    full_name: props.user_info?.user?.name,
    phone: props.user_info?.user?.phone,
    email: props.user_info?.user?.email,
    country: props.user_info?.user?.country,
    age: props.user_info?.user?.age,
    trading_experience: props.user_info?.user?.trading_experience,
    interested_in: props.user_info?.user?.interested_in,
  };
  const submitHandler = (values, actions) => {
    const data = {
      name: values.full_name,
      email: values.email,
      phone: values.phone,
      age: values.age,
      country: values.country,
      trading_experience: values.trading_experience,
      interested_in: values.interested_in,
    };
    props.updateProfileAction(data);
  };
  useEffect(() => {
    props.getCountryAction();
    props.getIntarestedInAction();
    props.getTradingExperienceAction();
    props.getUserInfo();
  }, []);
  return (
    <Fragment>
      <Head>
        <title>Account</title>
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
            <Formik
              enableReinitialize
              initialValues={initialState}
              validationSchema={validationSchema}
              onSubmit={submitHandler}
            >
              {() => (
                <Form id="createGroup">
                  <Grid container spacing={3}>
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
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputField
                          className="profileInputStyle"
                          label="email"
                          name="email"
                          fullWidth
                          FormHelperTextProps={{
                            component: "div",
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputField
                          className="profileInputStyle"
                          label="phone"
                          name="phone"
                          fullWidth
                          FormHelperTextProps={{
                            component: "div",
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
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
                    </Fragment>
                    <Grid item xs={12} className="text-center">
                      <Button
                        type="submit"
                        fullWidth
                        className="btnStyle btnLg btnStyleThemeBg"
                        disabled={btnDisabled}
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </HeaderSidebar>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  countries: state.common.countries,
  tradings: state.common.tradings,
  intarested: state.common.intarested,
  user_info: state.common.user_info,
});
export default connect(mapStateToProps, {
  getCountryAction,
  getIntarestedInAction,
  getTradingExperienceAction,
  getUserInfo,
  updateProfileAction,
})(Account);
