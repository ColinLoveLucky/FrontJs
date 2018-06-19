import React from 'react';
import {connect} from 'dva';
// import styles from './Login.css';
import Login from '../components/Login';

function LoginComponennt() {
  return (
    <Login/>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(LoginComponennt);
