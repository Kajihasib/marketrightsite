import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Button, Grid, InputAdornment } from "@mui/material";
import { Form, Formik } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { connect } from "react-redux";
import * as Yup from "yup";
import InputField from "../components/formFields/input";
import PublicFooter from "../components/public-footer";
import PublicHeader from "../components/public-header";
import {
  forgotPasswordAction,
  resetPasswordAction,
} from "../redux/actions/auth";

const ResetPassword = (props) => {
  const validationSchema = Yup.object({
    reset_password_code: Yup.string()
      .required(`code can not be empty`)
      .matches(/^-?(\d+\.?\d*)$|(\d*\.?\d+)$/, `code must be number`)
      .min(6, `code minimum 6 digit`)
      .max(6, `code maximum 6 digit`),
    new_password: Yup.string()
      .required(`password can not be empty`)
      .min(8, `password must be at least 8 characters`),
    confirm_password: Yup.string()
      .required(`confirm password can not be empty`)
      .oneOf([Yup.ref("new_password"), null], `password dose not match`),
  });
  const router = useRouter();
  const [state, setState] = useState({
    showPassword: false,
  });
  const initialState = {
    reset_password_code: "",
    new_password: "",
    confirm_password: "",
  };

  const handleResendCode = () => {
    const form = {
      email: localStorage.getItem("reset_email"),
    };
    props.forgotPasswordAction(form);
  };
  //   useEffect(() => {
  //     if (cookie.get("user_token")) {
  //       router.back();
  //     }
  //   }, []);
  const submitHandler = (values, actions) => {
    props.resetPasswordAction(values, router);
  };
  return (
    <Fragment>
      <Head>
        <title>Reset Password</title>
        <meta name="description" content="Market Rite side" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PublicHeader />
      <main className="main-container">
        <Grid className="container">
          <Grid className="row justify-content-center">
            <Grid className="col-lg-6 col-md-8 col-12">
              <Grid className="auth-wrap">
                <Grid className="text-center auth-header">
                  <h1 className="title">Reset Password</h1>
                  <p>
                    We’ve sent an OTP to your email address.Please enter OTP to
                    reset password
                  </p>
                </Grid>
                <Formik
                  initialValues={initialState}
                  validationSchema={validationSchema}
                  onSubmit={submitHandler}
                >
                  {() => (
                    <Form>
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <InputField
                            className="profileInputStyle"
                            label="Code"
                            name="reset_password_code"
                            fullWidth
                            FormHelperTextProps={{
                              component: "div",
                            }}
                            variant="outlined"
                          />
                          <Grid className="resendOtp">
                            Didn’t receive your OTP
                            <span onClick={handleResendCode}>Resend OTP</span>
                          </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          <InputField
                            className="profileInputStyle"
                            label="New Password"
                            name="new_password"
                            type={state.new_pass ? "text" : "password"}
                            fullWidth
                            FormHelperTextProps={{
                              component: "div",
                            }}
                            variant="outlined"
                            InputProps={{
                              endAdornment: (
                                <InputAdornment
                                  style={{ cursor: "pointer" }}
                                  onClick={() =>
                                    setState({
                                      new_pass: !state.new_pass,
                                    })
                                  }
                                  position="end"
                                >
                                  {state.new_pass ? (
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
                            className="profileInputStyle"
                            label="Confirm Password"
                            name="confirm_password"
                            type={state.confirm_pass ? "text" : "password"}
                            fullWidth
                            variant="outlined"
                            InputProps={{
                              endAdornment: (
                                <InputAdornment
                                  style={{ cursor: "pointer" }}
                                  onClick={() =>
                                    setState({
                                      confirm_pass: !state.confirm_pass,
                                    })
                                  }
                                  position="end"
                                >
                                  {state.confirm_pass ? (
                                    <VisibilityIcon />
                                  ) : (
                                    <VisibilityOffIcon />
                                  )}
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>

                        <Grid item xs={12} className="textCenter">
                          <Button
                            type="submit"
                            fullWidth
                            className="btnStyle btnLg btnStyleThemeBg"
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
      </main>
      <PublicFooter />
    </Fragment>
  );
};
export default connect(null, { resetPasswordAction, forgotPasswordAction })(
  ResetPassword
);
