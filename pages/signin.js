import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Button, Grid, InputAdornment } from "@mui/material";
import { Form, Formik } from "formik";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { connect } from "react-redux";
import Cookies from "universal-cookie";
import * as Yup from "yup";
import InputField from "../components/formFields/input";
import PublicFooter from "../components/public-footer";
import PublicHeader from "../components/public-header";
import { loginAction } from "../redux/actions/auth";

const cookie = new Cookies();

const validationSchema = Yup.object({
  email: Yup.string()
    .required("email can not be empty")
    .email("email must be a valid email"),
  password: Yup.string().required("password can not be empty").min(8),
});
const Login = (props) => {
  const router = useRouter();
  const [state, setState] = useState({
    showPassword: false,
  });
  const initialState = {
    email: "",
    password: "",
  };
  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword });
  };

  const submitHandler = (values, actions) => {
    props.loginAction(values, actions, router);
  };
  //   useEffect(() => {
  //     if (cookie.get("user_token")) {
  //       router.back();
  //     }
  //   }, [cookie.get("user_token")]);
  return (
    <Fragment>
      <Head>
        <title>Sign In</title>
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
                  <img src="/images/login.svg" alt="login" />
                  <h1 className="title">Sign In</h1>
                  <p>Enter your credentials to get access</p>
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
                          <InputField
                            className="profileInputStyle"
                            label="Password"
                            name="password"
                            FormHelperTextProps={{
                              component: "div",
                            }}
                            type={state.showPassword ? "text" : "password"}
                            fullWidth
                            variant="outlined"
                            InputProps={{
                              endAdornment: (
                                <InputAdornment
                                  style={{ cursor: "pointer" }}
                                  onClick={handleClickShowPassword}
                                  position="end"
                                >
                                  {state.showPassword ? (
                                    <VisibilityIcon />
                                  ) : (
                                    <VisibilityOffIcon />
                                  )}
                                </InputAdornment>
                              ),
                            }}
                          />
                          <p className="text-right forgot-pass">
                            <Link href="/forgot-password">
                              <a>Forgot Password ?</a>
                            </Link>
                          </p>
                        </Grid>
                        <Grid item xs={12}>
                          <div className="text-center">
                            <Button
                              type="submit"
                              fullWidth
                              className="btnStyle btnLg btnStyleThemeBg"
                            >
                              Sign In
                            </Button>
                          </div>
                        </Grid>
                        <Grid item xs={12}>
                          <p className="text-center terms-condition">
                            Don’t have an account?
                            <Link href="/signup">
                              <a>Sign Up</a>
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
export default connect(null, { loginAction })(Login);
