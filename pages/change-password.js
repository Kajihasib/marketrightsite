import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Button, Grid, InputAdornment } from "@mui/material";
import { Form, Formik } from "formik";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { connect } from "react-redux";
import * as Yup from "yup";
import InputField from "../components/formFields/input";
import HeaderSidebar from "../components/header-navbar";
import { changePasswordAction } from "../redux/actions/auth";

const validationSchema = Yup.object({
  old_password: Yup.string().required("Old password can not be empty").min(8),
  new_password: Yup.string().required("password can not be empty").min(8),
  confirm_password: Yup.string()
    .required("confirm password can not be empty")
    .oneOf([Yup.ref("new_password"), null], "password dose not match"),
});
const Account = (props) => {
  const router = useRouter();

  const [btnDisabled, setBtnDisabled] = useState(false);
  const [state, setState] = useState({
    show_pass: false,
    con_pass: false,
    old_pass: false,
  });

  const initialState = {
    old_password: "",
    new_password: "",
    confirm_password: "",
  };
  const submitHandler = (values, actions) => {
    const data = {
      password: values.new_password,
      password_confirmation: values.confirm_password,
      old_password: values.old_password,
    };
    props.changePasswordAction(data);
  };

  return (
    <Fragment>
      <Head>
        <title>Change Password</title>
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
              <Grid item lg={8}>
                <Formik
                  enableReinitialize
                  initialValues={initialState}
                  validationSchema={validationSchema}
                  onSubmit={submitHandler}
                >
                  {() => (
                    <Form id="createGroup">
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <InputField
                            className="inputStyle"
                            label="Old Password"
                            name="old_password"
                            FormHelperTextProps={{
                              component: "div",
                            }}
                            type={state.old_pass ? "text" : "password"}
                            fullWidth
                            InputProps={{
                              endAdornment: (
                                <InputAdornment
                                  style={{ cursor: "pointer" }}
                                  onClick={() =>
                                    setState({
                                      ...state,
                                      old_pass: !state.old_pass,
                                    })
                                  }
                                  position="end"
                                >
                                  {state.old_pass ? (
                                    <VisibilityIcon />
                                  ) : (
                                    <VisibilityOffIcon />
                                  )}
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <InputField
                            className="inputStyle"
                            label="Password"
                            name="new_password"
                            FormHelperTextProps={{
                              component: "div",
                            }}
                            type={state.show_pass ? "text" : "password"}
                            fullWidth
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
                        <Grid item xs={12}>
                          <InputField
                            className="inputStyle"
                            label="Confirm Password"
                            name="confirm_password"
                            FormHelperTextProps={{
                              component: "div",
                            }}
                            type={state.con_pass ? "text" : "password"}
                            fullWidth
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
          </Grid>
        </Grid>
      </HeaderSidebar>
    </Fragment>
  );
};
export default connect(null, { changePasswordAction })(Account);
