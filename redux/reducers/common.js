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

const init = {
  instruments: [],
  countries: {},
  plans: [],
  tradings: [],
  markets: [],
  payment_type: [],
  trading_type: [],
  intarested: {},
  overviews: [],
  user_info: {},
};

const commonReducer = (state = init, action) => {
  switch (action.type) {
    case GET_INSTRUMENT: {
      return {
        ...state,
        instruments: action.payload.data?.instruments,
      };
    }
    case GET_COUNTRY_DATA: {
      return {
        ...state,
        countries: action.payload.data?.countries,
      };
    }
    case GET_PLAN: {
      return {
        ...state,
        plans: action.payload.data?.plans,
      };
    }
    case GET_PAYMENT_TYPE: {
      return {
        ...state,
        payment_type: action.payload.data?.paymentType,
      };
    }
    case GET_TRADING_EXPERIENCE: {
      return {
        ...state,
        tradings: action.payload.data?.tradings,
      };
    }
    case GET_MATKETS: {
      return {
        ...state,
        markets: action.payload.data?.markets,
      };
    }
    case GET_TRADING_TYPE: {
      return {
        ...state,
        trading_type: action.payload.data?.tradingType,
      };
    }
    case GET_INTARESTED_IN: {
      return {
        ...state,
        intarested: action.payload.data?.intarested,
      };
    }

    case GET_MARKET_OVERVIEW: {
      return {
        ...state,
        overviews: action.payload.data?.overviews,
      };
    }

    case GET_USER_INFO: {
      return {
        ...state,
        user_info: action.payload.data,
      };
    }
    default:
      return state;
  }
};

export default commonReducer;
