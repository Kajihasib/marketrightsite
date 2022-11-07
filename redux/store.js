import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createWrapper } from 'next-redux-wrapper';
import rootReducer from './reducers/index';
const middleware = [thunk];

const makeStore = () =>
	createStore(
		rootReducer,
		compose(
			applyMiddleware(...middleware),
			globalThis.__REDUX_DEVTOOLS_EXTENSION__
				? globalThis.__REDUX_DEVTOOLS_EXTENSION__ && globalThis.__REDUX_DEVTOOLS_EXTENSION__()
				: (f) => f
		)
	);
export const wrapper = createWrapper(makeStore);
