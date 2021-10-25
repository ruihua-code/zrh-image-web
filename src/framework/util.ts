/**
 * 功能：工具包
 * 作者：安超
 * 日期：2017/7/2
 */

import axios from 'axios';
import { AppContainer, hot } from 'react-hot-loader';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import intl from 'react-intl-universal';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import dayjs from 'dayjs';
import { pathToRegexp, compile } from 'path-to-regexp';
import { combineReducers } from 'redux';
import { connect as originalConnect } from 'react-redux';
import classNames from 'classnames';
import _ from 'lodash';
import echarts from 'echarts';
import { NavLink, Link, HashRouter as Router, Route, Redirect, Prompt, Switch, withRouter } from 'react-router-dom';
import { createSelector } from 'reselect';
import { saveAs } from 'file-saver';
import Helper from '@/common';
import PureComponent from './base/react-component-base';
import ErrorBoundary from './components/errorboundary';
import withErrorBoundary from './components/with-errorboundary';

const noop = function () {};

const EmptyComponent = () => null;

/* eslint-disable */
const connect = (mapStateToProps, mapDispatchToProps, mergeProps?) => (component) =>
    originalConnect(mapStateToProps, mapDispatchToProps, mergeProps)(withErrorBoundary(component));
/* eslint-enable */

export {
    _,
    axios,
    AppContainer,
    classNames,
    combineReducers,
    connect,
    createSelector,
    compile,
    dayjs,
    echarts,
    ErrorBoundary,
    EmptyComponent,
    Helper,
    hot,
    Immutable,
    intl,
    Link,
    noop,
    NavLink,
    originalConnect,
    PropTypes,
    PureComponent,
    pathToRegexp,
    Prompt,
    Redirect,
    React,
    ReactDOM,
    Router,
    Route,
    withRouter,
    withErrorBoundary,
    Switch,
    saveAs
};
