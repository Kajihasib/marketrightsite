import superagent from "superagent";
import { getRequest } from "../../utils/request";
import {
  GET_COUNTRY_DATA,
  GET_INSTRUMENT,
  GET_INTARESTED_IN,
  GET_MARKET_OVERVIEW,
  GET_MATKETS,
  GET_PAYMENT_TYPE,
  GET_PLAN,
  GET_TRADING_EXPERIENCE,
  GET_TRADING_TYPE,
  GET_USER_INFO,
} from "../types";
export const getCountryAction = () => (dispatch) => {
  getRequest("get-country-list", null, dispatch, GET_COUNTRY_DATA);
};

export const getTradingExperienceAction = () => (dispatch) => {
  getRequest("get-trading-experience", null, dispatch, GET_TRADING_EXPERIENCE);
};
export const getPlanAction = () => (dispatch) => {
  getRequest("get-plan-list", null, dispatch, GET_PLAN);
};
export const getInstrumentAction = () => (dispatch) => {
  getRequest("get-instrument-list", null, dispatch, GET_INSTRUMENT);
};

export const getMarketAction = () => (dispatch) => {
  getRequest("get-market-list", null, dispatch, GET_MATKETS);
};

export const getPaymentTypeAction = (id) => (dispatch) => {
  getRequest(
    `get-payment-type-by-plan-id/${id}`,
    null,
    dispatch,
    GET_PAYMENT_TYPE
  );
};

export const getTradingTypeAction = (payment_id, plan_id) => (dispatch) => {
  return superagent
    .get(
      `${process.env.BASE_URL}get-trading-type-by-payment-id/${payment_id}/${plan_id}`
    )
    .set("accept", "application/json")
    .end((err, res) => {
      if (res) {
        dispatch({ type: GET_TRADING_TYPE, payload: res.body });
      } else {
        dispatch({ type: IS_LOADING, payload: false });
      }
    });
};

export const getIntarestedInAction = () => (dispatch) => {
  getRequest(`get-interested-in`, null, dispatch, GET_INTARESTED_IN);
};

export const getMarketOverviewAction = () => (dispatch) => {
  getRequest(`market-overview`, null, dispatch, GET_MARKET_OVERVIEW);
};
export const getUserInfo = () => (dispatch) => {
  getRequest(`get-loggedin-user`, null, dispatch, GET_USER_INFO);
};
