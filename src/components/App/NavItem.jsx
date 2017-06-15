import React, { Component } from 'react';
import { Link, IndexLink, withRouter } from 'react-router'
import styles from './styles.scss';
import SVG from '../../images/SVG.jsx';

class NavItem extends Component {
  render () {
    const { router } = this.props;
    const { index, to, children, ...props } = this.props;

    let isActive;
    if( router.isActive('/',true) && index ) isActive = true;
    else  isActive = router.isActive(to);
    const LinkComponent = index ?  IndexLink : Link;

    delete props.router;

    return (
      <li className={styles.navItem + ' ' + (isActive ? styles.active : '')}>
        <SVG src={props.icon}/>
        <LinkComponent to={to} {...props}>{children}</LinkComponent>
      </li>
    )
  }
}

NavItem = withRouter(NavItem);

export default NavItem;