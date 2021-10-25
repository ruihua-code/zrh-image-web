/**
 * 功能：本地store
 * 作者：安超
 * 日期：2015/12/2
 */
import { applyMiddleware, combineReducers, createStore } from 'redux';
import Immutable from 'immutable';
import { routerReducer } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import dialog from '../dialog/reducers';
import loading from '../loading/reducers';

// state日志
const logger = createLogger({
    stateTransformer: state => Immutable.fromJS(state).toJS()
});

const storeCommon = createStore(
    combineReducers({
        dialog,
        loading,
        routing: routerReducer
    }),
    process.env.NODE_ENV === 'production' ? applyMiddleware(thunkMiddleware) : applyMiddleware(thunkMiddleware, logger)
);


export default storeCommon;