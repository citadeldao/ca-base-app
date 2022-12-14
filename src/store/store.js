import { createStore, compose, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { state } from './reducers';

export const store = createStore(
    state,
    compose(
        applyMiddleware(reduxThunk),
    ),
);
