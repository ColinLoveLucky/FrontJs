import React, {Component} from 'react';
import {connect} from 'dva';
import styles from './welcome.css';

class welcome extends Component {
  render() {
    return (
      <div className={styles.normal}>
        Hi,Welcome!
      </div>
    );
  }
}


function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(welcome);
