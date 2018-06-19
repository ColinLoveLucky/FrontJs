import React, {Component} from 'react';
import {connect} from 'dva';
import styles from './whiteedit.css';
class whiteedit extends Component {
  render() {
    return (
      <div className={styles.normal}>
        <span style={{color: "blue"}}>Edit</span>
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(whiteedit);
