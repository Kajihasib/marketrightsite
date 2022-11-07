import {
  GET_CURRENT_PLAN_INFO,
  GET_INSTRUMENT_WITH_MARKETS,
  GET_MEMBERSHIP_QUESTIONS,
  GET_TRADING_DATA,
  GET_TRADING_IMAGE,
  GET_UPDATE_SCHEDULE,
  GET_USER_PLAN,
} from "../types";

const init = {
  markets: [],
  trading_data: {},
  trading_image: {},
  user_plan: {},
  schedules: [],
  current_plan_info: {},
  questions: [],
};

const homeReducer = (state = init, action) => {
  switch (action.type) {
    case GET_INSTRUMENT_WITH_MARKETS: {
      return {
        ...state,
        markets: action.payload.data?.markets,
      };
    }
    case GET_TRADING_DATA: {
      return {
        ...state,
        trading_data: action.payload.data,
      };
    }
    case GET_TRADING_IMAGE: {
      return {
        ...state,
        trading_image: action.payload.data?.gallery,
      };
    }
    case GET_USER_PLAN: {
      return {
        ...state,
        user_plan: action.payload.data?.price,
      };
    }
    case GET_UPDATE_SCHEDULE: {
      return {
        ...state,
        schedules: action.payload.data?.schedules,
      };
    }
    case GET_CURRENT_PLAN_INFO: {
      return {
        ...state,
        current_plan_info: action.payload,
      };
    }
    case GET_MEMBERSHIP_QUESTIONS: {
      return {
        ...state,
        questions: action.payload.data?.questions,
      };
    }
    default:
      return state;
  }
};

export default homeReducer;
