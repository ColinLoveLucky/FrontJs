/**
 * Created by HaihuaHuang on 2017/12/29.
 */
import React, {Component} from 'react';
import {connect} from 'dva';
import Main from "../../components/White/whitelistapprove";

class whiteapprove extends Component {
  componentDidMount() {

  }

  render() { 
    return (
      <Main data={this.props.whiteListApprove.data} dispatch={this.props.dispatch} />
    );
  }
}

function mapStateToProps(store) {
  return {
    whiteListApprove: store.whiteListApprove,
  };
}

export default connect(mapStateToProps)(whiteapprove);
