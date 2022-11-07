import Cookies from "universal-cookie";
import { getRequest } from "../../utils/request";
import {
  GET_ALL_TOOLS,
  GET_BRAKING_NEWS,
  GET_CLIENT_REVIEW,
  GET_EDUCATION_DATA,
  GET_MARKET_NEWS_DATA,
  GET_NEWS_DATA,
  GET_PUBLIC_OVERVIEW,
  GET_SIDEBAR_WIDGET,
  GET_TRADING_DETAILS,
} from "../types";
const cookie = new Cookies();
export const getBrakingNewsAction = (data) => (dispatch) => {
  getRequest("breaking-news", data, dispatch, GET_BRAKING_NEWS);
};

export const getTradingDetailsAction = (data) => (dispatch) => {
  getRequest("trading-details", data, dispatch, GET_TRADING_DETAILS);
};
export const getClientReviewAction = (data) => (dispatch) => {
  getRequest("client-feedback", data, dispatch, GET_CLIENT_REVIEW);
};
export const getPublicOverviewAction = (data) => (dispatch) => {
  getRequest("market-overview-public", data, dispatch, GET_PUBLIC_OVERVIEW);
};

export const getSidebarWidgetAction = (data) => (dispatch) => {
  getRequest("get-widget-data", data, dispatch, GET_SIDEBAR_WIDGET);
};

export const getAllToolsAction = (data) => (dispatch) => {
  getRequest("tools", data, dispatch, GET_ALL_TOOLS);
};

export const getEducationAction = (data) => (dispatch) => {
  getRequest("get-education", data, dispatch, GET_EDUCATION_DATA);
};
export const getMarketNewsAction = (data) => (dispatch) => {
  getRequest("market-news", data, dispatch, GET_MARKET_NEWS_DATA);
};
export const getNewsAction = (data) => (dispatch) => {
  getRequest("news-archive", data, dispatch, GET_NEWS_DATA);
};
