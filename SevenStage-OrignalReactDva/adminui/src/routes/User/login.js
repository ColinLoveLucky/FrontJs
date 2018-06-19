import React from 'react';
import {connect} from 'dva';
import Login from '../../components/user/Login';

function LoginComponennt() {
  return (
    <Login/>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(LoginComponennt);
