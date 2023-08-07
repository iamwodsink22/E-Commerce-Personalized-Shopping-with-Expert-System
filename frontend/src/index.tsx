import React from 'react';
import ReactDOM from 'react-dom';
import TitleContextProvider from "contexts/TitleContext";
import { AuthProvider } from "contexts/JWTAuthContext";
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {store} from './redux/Store'
import {Provider} from 'react-redux'
ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
<TitleContextProvider>

    <BrowserRouter>
    <Provider store={store}>

    <App />
    </Provider>
    </BrowserRouter>
</TitleContextProvider>
    </AuthProvider>
  </React.StrictMode>, document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

