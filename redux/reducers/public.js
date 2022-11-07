import {
  GET_ALL_TOOLS,
  GET_BRAKING_NEWS,
  GET_CLIENT_REVIEW,
  GET_EDUCATION_DATA,
  GET_PUBLIC_OVERVIEW,
  GET_SIDEBAR_WIDGET,
  GET_TRADING_DETAILS,
  GET_MARKET_NEWS_DATA,
  GET_NEWS_DATA
} from "../types";

const init = {
  braking_news: [],
  trading: [],
  clients: [],
  overviews: [],
  sidebar_widget: [],
  tools: [],
  educations: [],
  market_news:[],
  news:{}
};

const publicReducer = (state = init, action) => {
  switch (action.type) {
    case GET_BRAKING_NEWS: {
      return {
        ...state,
        braking_news: action.payload.data.news,
      };
    }
    case GET_TRADING_DETAILS: {
      return {
        ...state,
        trading: action.payload.data.details,
      };
    }
    case GET_CLIENT_REVIEW: {
      return {
        ...state,
        clients: action.payload.data.clients,
      };
    }
    case GET_PUBLIC_OVERVIEW: {
      return {
        ...state,
        overviews: action.payload.data.overviews,
      };
    }
    case GET_SIDEBAR_WIDGET: {
      return {
        ...state,
        sidebar_widget: action.payload.data.widget,
      };
    }
    case GET_ALL_TOOLS: {
      return {
        ...state,
        tools: action.payload.data.tools,
      };
    }
    case GET_EDUCATION_DATA: {
      return {
        ...state,
        educations: action.payload.data.educations,
      };
    }
    case GET_MARKET_NEWS_DATA: {
      return {
        ...state,
        market_news: action.payload.data.news,
      };
    }
    case GET_NEWS_DATA: {
      return {
        ...state,
        news: action.payload.data.news,
      };
    }

    default:
      return state;
  }
};

export default publicReducer;
