import React from 'react';
import { connect } from 'dva';
import styles from './Products.css';

function Products() {
  return (
    <div className={styles.normal}>
      Route Component: Products
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Products);
