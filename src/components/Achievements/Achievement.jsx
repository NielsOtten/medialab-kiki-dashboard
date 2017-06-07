import React, { Component } from 'react';
import styles from './styles.scss';

class Achievement extends Component {
  render() {
    return <li className={styles.achievement}>
      <img src="" alt=""/>
      <h2 className={styles.title}>Jumpman</h2>
      <span className={styles.gofor}>50 Jumps</span>
      <span className={styles.progress}>Behaald</span>
      <div className={styles.toDo}>
        <div className={styles.reached}>
          <p className={styles.title}>Reached</p>
          <p className={styles.target}>50</p>
        </div>
        <div className={styles.left}>
          <p className={styles.title}>Left</p>
          <p className={styles.target}>0</p>
        </div>
      </div>
    </li>;
  }
}

export default Achievement;