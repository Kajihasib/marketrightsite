import * as Yup from "yup";

export default [
  Yup.object().shape({
    full_name: Yup.string().required("Full name can not be empty"),
    phone: Yup.string().required("Phone can not be empty"),
    email: Yup.string().email().required("Email can not be empty"),
    password: Yup.string().required("password can not be empty").min(8),
    country: Yup.string().required("Country can not be empty"),
    age: Yup.string().required("Age can not be empty"),
    trading_experience: Yup.string().required(
      "Trading Experience can not be empty"
    ),
    interested_in: Yup.string().required("Interested In can not be empty"),
    confirm_password: Yup.string()
      .required("confirm password can not be empty")
      .oneOf([Yup.ref("password"), null], "password dose not match"),
  }),

  Yup.object().shape({
    plan: Yup.string().required("plan can not be empty"),
    instruments: Yup.array()
      .required("instrument can not be empty")
      .min(1, "please select minimum 1 instrument"),
    subscription: Yup.string().required("subscription can not be empty"),
    trading: Yup.string().required("trading can not be empty"),
    payment_method: Yup.string().required("payment method can not be empty"),
    trems_ofus: Yup.bool().oneOf(
      [true],
      "Accept Terms & Conditions is required"
    ),
  }),
];
