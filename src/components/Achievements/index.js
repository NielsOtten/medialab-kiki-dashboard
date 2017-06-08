
import React, { Component } from 'react';
import fetch from 'fetch-everywhere';
import Achievement from './Achievement.jsx';
import styles from './styles.scss';

class Achievements extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      target: '',
      value: 0,
      achievements: [],
    };

    this.clickHandler = this.clickHandler.bind(this);
    this.radioClickHandler = this.radioClickHandler.bind(this);
    this.valueChangeHandler = this.valueChangeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  componentDidMount() {
    this.getAchievements();
  }

  radioClickHandler(e) {
    this.setState({ target: e.target.value });
  }

  valueChangeHandler(e) {
    this.setState({ value: e.target.value });
  }

  clickHandler() {
    this.setState({open: !this.state.open});
  }
  
  submitHandler(e) {
    e.preventDefault();
    fetch('/targets', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(this.state),
    })
      .then((data) => {
        this.getAchievements();
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  getAchievements() {
    fetch('/targets', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'GET',
    })
      .then((response) => response.json())
      .then((json) => {
        return json.targets.map(target => <Achievement
          key={target._id}
          title={target.title}
          target={target.target}
          value={target.value}
          progress={target.progress} />);
      })
      .then(achievements => {
        this.setState({ achievements });
      });
  }

  render() {
    return(
      <div className={styles.wrapper}>
        <ul className={styles.achievements}>
          <li className={styles.achievement} onClick={this.clickHandler}>
            <svg className={styles.svg} version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 491.86 491.86"><g><g><path d="M465.167,211.614H280.245V26.691c0-8.424-11.439-26.69-34.316-26.69s-34.316,18.267-34.316,26.69v184.924H26.69 C18.267,211.614,0,223.053,0,245.929s18.267,34.316,26.69,34.316h184.924v184.924c0,8.422,11.438,26.69,34.316,26.69 s34.316-18.268,34.316-26.69V280.245H465.17c8.422,0,26.69-11.438,26.69-34.316S473.59,211.614,465.167,211.614z"></path></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
            <h2>Achievement toevoegen</h2>
          </li>
          { this.state.achievements }
        </ul>
        <div className={styles.modal} style={{display: this.state.open ? 'block' : 'none'}} onClick={this.clickHandler}/>
        <div className={styles.addAchievement} style={{display: this.state.open ? 'block' : 'none'}}>
          <h2>Achievement Toevoegen</h2>
          <form onSubmit={this.submitHandler}>
            <p>Doel</p>
            <div className={styles.radios}>
              <div className={styles.radio}>
                <input type='radio' onClick={this.radioClickHandler} name='achievement' value='Speeltijd' id='speeltijd'/>
                <label htmlFor='speeltijd'>Speeltijd</label>
              </div>
              <div className={styles.radio}>
                <input type='radio' onClick={this.radioClickHandler} name='achievement' value='Munten' id='munten'/>
                <label htmlFor='munten'>Munten</label>
              </div>
              <div className={styles.radio}>
                <input type='radio' onClick={this.radioClickHandler} name='achievement' value='Behaalde Achievements' id='achievement'/>
                <label htmlFor='achievement'>Behaalde Achievements</label>
              </div>
              <div className={styles.radio}>
                <input type='radio' onClick={this.radioClickHandler} name='achievement' value='Jumps' id='jumps'/>
                <label htmlFor='jumps'>Jumps</label>
              </div>
              <div className={styles.radio}>
                <input type='radio' onClick={this.radioClickHandler} name='achievement' value='Afstand in KM' id='distance'/>
                <label htmlFor='distance'>Afstand in KM</label>
              </div>
              <div className={styles.radio}>
                <input type='radio' onClick={this.radioClickHandler} name='achievement' value='Spierspanning' id='spanning'/>
                <label htmlFor='spanning'>Spierspanning</label>
              </div>
            </div>
            <p>Waarde</p>
            <input className={styles.value} type='number' name='value' id='value' onChange={this.valueChangeHandler}/>
            <input className={styles.submit} type="submit" value='Toevoegen'/>
          </form>
        </div>
      </div>
    );
  }
}

export default Achievements;
