import React from 'react';
import ReactDOM from 'react-dom';
import { createApi } from './services/api';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from './app/app';
import { rootReducer } from './store/root-reducer';
import { requireAuthorization } from './store/action';
import { checkAuthAction } from './store/api-actions';
import { ThunkAppDispatch } from './types/action';
import { AuthorizationStatus } from './const';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const api = createApi(
  () => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)),
);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

(store.dispatch as ThunkAppDispatch)(checkAuthAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
