import { Button, Grid } from "@mui/material";
import { Form, Formik } from "formik";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import Cookies from "universal-cookie";
import * as Yup from "yup";
import InputField from "../components/formFields/input";
import PublicFooter from "../components/public-footer";
import PublicHeader from "../components/public-header";
import { forgotPasswordAction } from "../redux/actions/auth";

const cookie = new Cookies();

const ForgotPassword = (props) => {
  const router = useRouter();
  const validationSchema = Yup.object({
    email: Yup.string()
      .email(`email must be a valid email`)
      .required(`Email can not be empty`),
  });
  const initialState = {
    email: "",
  };

  const submitHandler = (values, actions) => {
    props.forgotPasswordAction(values, router);
    localStorage.setItem("reset_email", values.email);
  };
  useEffect(() => {
    if (cookie.get("user_token")) {
      router.back();
    }
  }, []);
  return (
    <Fragment>
      <Head>
        <title>Forgot Password</title>
        <meta name="description" content="Market Rite side" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PublicHeader />
      <main className="main-container">
        <Grid className="container public-container">
          <Grid className="row justify-content-center">
            <Grid className="col-lg-6 col-md-8 col-12">
              <Grid className="auth-wrap">
                <Grid className="text-center auth-header">
                  <h1 className="title">Forgot Password</h1>
                  <p>
                    To recover your password, please enter a registered email
                    address
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
                            label="Email"
                            name="email"
                            FormHelperTextProps={{
                              component: "div",
                            }}
                            fullWidth
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <div className="text-center">
                            <Button
                              type="submit"
                              fullWidth
                              className="btnStyle btnLg btnStyleThemeBg"
                            >
                              Send OTP
                            </Button>
                          </div>
                        </Grid>
                        <Grid item xs={12}>
                          <p className="text-center terms-condition">
                            <Link href="/signin">
                              <a>Back to Sign In</a>
                            </Link>
                          </p>
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
export default connect(null, { forgotPasswordAction })(ForgotPassword);
