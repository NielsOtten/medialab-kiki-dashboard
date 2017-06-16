import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fetch from 'fetch-everywhere';
import styles from './styles.scss';
import SVG from '../../images/SVG.jsx';

class Achievement extends Component {
  onDelete = (e) => {
    fetch(`/targets/${this.props.id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then((json) => {
        this.props.afterDeletion();
        console.log(json);
      })
  };

  render() {
    const done = this.props.progress >= this.props.value ? styles.done : styles.notDone;

    return (
      <li className={styles.achievement}>
        <span className={styles.delete}>
          <button onClick={this.onDelete}>
            <SVG src='plus'/>
          </button>
        </span>
        <img src="" alt=""/>
        <h2 className={styles.title}>{this.props.title}</h2>
        <span className={styles.gofor}>{`${this.props.value} ${this.props.target}`}</span>
        <span className={[styles.progress, done].join(' ')}>{this.props.progress >= this.props.value ? 'Behaald' : 'Nog niet behaald'}</span>
        <div className={[styles.toDo, done].join(' ')}>
          <div className={styles.reached}>
            <p className={styles.title}>Behaald</p>
            <p className={styles.target}>{this.props.progress}</p>
          </div>
          <div className={styles.left}>
            <p className={styles.title}>Te gaan</p>
            <p className={styles.target}>{this.props.value - this.props.progress}</p>
          </div>
        </div>
      </li>
    );
  }
}

Achievement.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  target: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  progress: PropTypes.number.isRequired,
  afterDeletion: PropTypes.func.isRequired,
};

export default Achievement;