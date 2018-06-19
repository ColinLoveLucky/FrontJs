import React,{Component} from 'react';
import { connect } from 'dva';
import styles from './whitecreate.css';

class  whitecreate extends Component{
  render(){
    return (
      <div className={styles.normal}>
       <span style={{color:"red"}}>Create</span>
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(whitecreate);
