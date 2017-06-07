
import React from 'react';
import PropTypes from 'prop-types';
import IndexLink from 'react-router/lib/Link';
import styles from './styles.scss';

function App({ children }) {
  return (
    <div style={{height: '100%'}}>
      <header>
        <div className={styles.header}>
          <div className={styles.logo}>
            <span>Dashboard</span>
          </div>
          <div className={styles.logout}>
            <span>Sign Out</span>
          </div>
          <div className={styles.user}>
            <span className={styles.username}>
              <img src={require('../../images/john_doe.png')} alt="profile image"/> John Doe
            </span>
          </div>
        </div>
      </header>
      <div className={styles.container}>
        <aside className={styles.nav}>
          <li className={styles.navItem}>
            <IndexLink className={styles.link} to="/" activeClassName={styles.active}>Home</IndexLink>
          </li>
          <li className={styles.navItem}>
            <IndexLink className={styles.link} to="/tools" activeClassName={styles.active}>Achievements</IndexLink>
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
