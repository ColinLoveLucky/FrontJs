import React, {Component} from 'react';
import {connect} from 'dva';
import Login from '../components/Login';

// function LoginComponennt() {
//   return (
//     <Login loginStatus={this.props.white.loginFail} />
//   );
// }

class loginComponennt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.login.loginFail
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      status: nextProps.login.loginFail
    });
  }

  render() {
    return (
      <div>
        <Login loginStatus={this.state.status} dispatch={this.props.dispatch} />
      </div>
    )
  }
}

function mapStateToProps(store) {
  return {login: store.login};
}

export default connect(mapStateToProps)(loginComponennt);
