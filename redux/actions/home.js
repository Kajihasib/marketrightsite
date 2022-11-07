import superagent from "superagent";
import Cookies from "universal-cookie";
import { getRequest } from "../../utils/request";
import {
  GET_CURRENT_PLAN_INFO,
  GET_INSTRUMENT_WITH_MARKETS,
  GET_MEMBERSHIP_QUESTIONS,
  GET_TRADING_DATA,
  GET_TRADING_IMAGE,
  GET_UPDATE_SCHEDULE,
  GET_USER_PLAN,
} from "../types";

const cookie = new Cookies();
export const getInstumentWithMarketAction = (data) => (dispatch) => {
  getRequest(
    "user-instrument-with-market",
    data,
    dispatch,
    GET_INSTRUMENT_WITH_MARKETS
  );
};
export const getTradingDataAction = (id, data) => (dispatch) => {
  getRequest(
    `get-trading-data?instrument=${id}`,
    data,
    dispatch,
    GET_TRADING_DATA
  );
};

export const getTradingImageAction =
  (instrument_id, time_frame_id) => (dispatch) => {
    getRequest(
      `get-gallery-image?instrument=${instrument_id}&time_frame=${time_frame_id}`,
      null,
      dispatch,
      GET_TRADING_IMAGE
    );
  };

export const getUserPlanAction = () => (dispatch) => {
  return superagent
    .get(`${process.env.BASE_URL}get-current-package`)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        dispatch({ type: GET_USER_PLAN, payload: res.body });
        cookie.set("plan_info", res.body.data);
      } else {
        dispatch({ type: IS_LOADING, payload: false });
      }
    });
};

export const getUpdateSchuduleAction = () => (dispatch) => {
  getRequest(`update-schedule`, null, dispatch, GET_UPDATE_SCHEDULE);
};

export const getCurrentPlanInfoAction = () => (dispatch) => {
  getRequest(`current-plan-info`, null, dispatch, GET_CURRENT_PLAN_INFO);
};

export const membershipCancelQuestionAction = () => (dispatch) => {
  getRequest(`membership-question`, null, dispatch, GET_MEMBERSHIP_QUESTIONS);
};
