import superagent from "superagent";
import Cookies from "universal-cookie";
import { THROW_ERROR, THROW_SUCCESS } from "../types";
const cookie = new Cookies();

export const signupAction = (data, router) => (dispatch) => {
  return superagent
    .post(`${process.env.BASE_URL}register`)
    .send(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.status) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          let token = "Bearer " + res.body.data.access_token;
          let user_info = res.body.data.user_data;
          cookie.set("user_token", token, {
            path: "/",
            expires: new Date(Date.now() + 2592000),
          });
          cookie.set("user_info", user_info, {
            path: "/",
            expires: new Date(Date.now() + 2592000),
          });
          router.push("/dashboard");
          cookie.remove("items");
          cookie.remove("age_data");
          cookie.set("access", res.body.data.access, {
            path: "/",
            expires: new Date(Date.now() + 2592000),
          });
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
      }
    });
};
export const loginAction = (data, actions, router) => (dispatch) => {
  return superagent
    .post(`${process.env.BASE_URL}login`)
    .send(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.status) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          let token = "Bearer " + res.body.data.access_token;
          let user_info = res.body.data.user_data;
          cookie.set("user_token", token, {
            path: "/",
            expires: new Date(Date.now() + 2592000),
          });
          cookie.set("user_info", user_info, {
            path: "/",
            expires: new Date(Date.now() + 2592000),
          });
          cookie.set("access", res.body.data.access, {
            path: "/",
            expires: new Date(Date.now() + 2592000),
          });
          actions.resetForm({});
          if (res.body.data.access) {
            router.push("/dashboard");
          } else {
            router.push("/welcome-back");
          }
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
      }
    });
};

export const forgotPasswordAction = (data, router) => (dispatch) => {
  return superagent
    .post(`${process.env.BASE_URL}send-forget-password-email`)
    .send(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.status) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          if (router) {
            router.push("/reset-password");
          }
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
      }
    });
};

export const resetPasswordAction = (data, router) => (dispatch) => {
  return superagent
    .post(`${process.env.BASE_URL}reset-password`)
    .send(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.status) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          router.push("/signin");
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
      }
    });
};
export const updateProfileAction = (data, router) => (dispatch) => {
  return superagent
    .post(`${process.env.BASE_URL}profile-update`)
    .send(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.status) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
      }
    });
};

export const changePasswordAction = (data, router) => (dispatch) => {
  return superagent
    .post(`${process.env.BASE_URL}change-password`)
    .send(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.status) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
      }
    });
};

export const cancleSubscriptionAction =
  (data, actions, onClose, router) => (dispatch) => {
    return superagent
      .post(`${process.env.BASE_URL}cancel-subscription`)
      .send(data)
      .set("accept", "application/json")
      .set("Authorization", cookie.get("user_token"))
      .end((err, res) => {
        if (res) {
          if (res.body.status) {
            dispatch({ type: THROW_SUCCESS, payload: res.body.message });
            actions.resetForm({});
            onClose(false);
            cookie.remove("user_token", {
              path: "/",
              expires: new Date(Date.now() + 2592000111),
            });
            cookie.remove("user_info", {
              path: "/",
              expires: new Date(Date.now() + 2592000111),
            });
            cookie.set("access", "false", {
              path: "/",
              expires: new Date(Date.now() + 2592000),
            });
            router.push("/");
          } else {
            dispatch({ type: THROW_ERROR, payload: res.body.message });
          }
        } else {
          dispatch({ type: THROW_ERROR, payload: err.data.message });
        }
      });
  };

export const updatePlan = (data, router) => (dispatch) => {
  return superagent
    .post(`${process.env.BASE_URL}plan-instrument-update`)
    .send(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.status) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          cookie.set("access", res.body.data.access, {
            path: "/",
            expires: new Date(Date.now() + 2592000),
          });
          cookie.remove("items", {
            path: "/",
            expires: new Date(Date.now() + 2592000111),
          });
          router.push("/markets");
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
      }
    });
};
