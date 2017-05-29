
import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import styles from './styles.scss';

function App({ children }) {
  return (
    <div>
      <header>
        <div className={styles.header}>
          <div className={[styles.nav, styles.logo].join(' ')}>
            <span>Dashboard</span>
          </div>
          <div className={styles.logout}>
            <span>Sign Out</span>
          </div>
          <div className={styles.user}>
            <span className={styles.username}>
              <img src="" alt="profile image"/> John Doe
            </span>
          </div>
        </div>
      </header>
      <div className={styles.container}>
        <aside className={styles.nav}>
          <li className={styles.navItem}>
            <Link className={styles.link} to="/">Home</Link>
          </li>
          <li className={styles.navItem}>
            <Link className={styles.link} to="/tools">Tools</Link>
          </li>
        </aside>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
