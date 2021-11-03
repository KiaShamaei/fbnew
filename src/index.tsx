import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'assets/scss/utils/utils.scss'
import 'assets/scss/common.scss'
import 'assets/fonts/iranYekan/css/fontiran.css'
import 'assets/fonts/icons/css/style.css'
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from 'redux/store';
import './jsxDeclears'
import './lordicons'
import VisitorIdContainer from 'container/VisitorIdContainer/VisitorIdContainer';

ReactDOM.render(
  <Provider store={store}>
      <VisitorIdContainer>
        <App />
      </VisitorIdContainer>
    </Provider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
