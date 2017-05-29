
import React from 'react';
import styles from './styles.scss';

function Home() {
  return (
    <div>
      <ul className={styles.filterList}>
        <li className={styles.filter}>Totaal</li>
        <li className={styles.filter}>Per maand</li>
        <li className={styles.filter}>Per week</li>
        <li className={styles.filter}>Per dag</li>
        <li className={styles.filter}>Vandaag</li>
      </ul>
    </div>
  );
}

export default Home;
