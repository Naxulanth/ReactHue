import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import rootReducer from "./reducers";
import createHistory from "history/createBrowserHistory";
import createSagaMiddleware from "redux-saga";
import { ToastContainer } from "react-toastify";
import GlobalStyle from "globalStyles";
import "bootstrap/dist/css/bootstrap.min.css";
import "sanitize.css/sanitize.css";
import saga from "./sagas";

import Routes from "./routes";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, logger));

sagaMiddleware.run(saga);

const history = createHistory();
ReactDOM.render(
  <Fragment>
  <ToastContainer/>
    <Provider store={store}>
      <Routes history={history} />
      <GlobalStyle />
    </Provider>
  </Fragment>,
  document.getElementById("root")
);
