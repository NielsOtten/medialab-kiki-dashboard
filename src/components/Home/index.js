
import React from 'react';
import fetch from 'fetch-everywhere';
import {LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import styles from './styles.scss';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      games: [],
      active: 'total',
    };
  }

  componentDidMount() {
    this.clickHandler('total');
  }

  clickHandler = (total) => {
    this.setState({ active: total });
    fetch(`/games?date=${total}`)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        const games = json.games.map(game => ({
          name: game.timestamp,
          Munten: game.coins,
          Sprongen: game.totalJumps,
          Speeltijd: game.playTime,
          Afstand: game.distance,
        }));
        this.setState({ games });
      })
      .catch((err) => console.log(err));
  };

  render() {
    const displayGraphs = this.state.games.length > 0;
    return(
      <div className={styles.wrapper}>
        <ul className={styles.filterList}>
          <li className={styles.filter + ' ' + (this.state.active === 'total' ? styles.active : '')} onClick={this.clickHandler.bind(this, 'total')}>Totaal</li>
          <li className={styles.filter + ' ' + (this.state.active === 'month' ? styles.active : '')} onClick={this.clickHandler.bind(this, 'month')}>Per maand</li>
          <li className={styles.filter + ' ' + (this.state.active === 'week' ? styles.active : '')} onClick={this.clickHandler.bind(this, 'week')}>Per week</li>
          <li className={styles.filter + ' ' + (this.state.active === 'day' ? styles.active : '')} onClick={this.clickHandler.bind(this, 'day')}>Per dag</li>
          <li className={styles.filter + ' ' + (this.state.active === 'today' ? styles.active : '')} onClick={this.clickHandler.bind(this, 'today')}>Vandaag</li>
        </ul>
        <div ref={(w) => this.wrapper = w} className={styles.graphs + ' ' + (displayGraphs ? styles.active : '')}>
          <div className={styles.graph}>
            <h2 className={styles.speeltijd}>Speeltijd</h2>
            <div className={styles.graphWrapper}>
              <ResponsiveContainer width={100+'%'} height={400}>
                <LineChart className={styles.lineChart} data={this.state.games}
                           margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                  <XAxis dataKey="name"/>
                  <YAxis/>
                  <Tooltip/>
                  <Line type="monotone" dataKey="Speeltijd" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className={styles.graph}>
            <h2 className={styles.munten}>Munten</h2>
            <div className={styles.graphWrapper}>
              <ResponsiveContainer width={100+'%'} height={400}>
                <LineChart className={styles.lineChart} data={this.state.games}
                           margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                  <XAxis dataKey="name"/>
                  <YAxis/>
                  <Tooltip/>
                  <Line type="monotone" dataKey="Munten" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className={styles.graph}>
            <h2 className={styles.sprongen}>Sprongen</h2>
            <div className={styles.graphWrapper}>
              <ResponsiveContainer width={100+'%'} height={400}>
                <LineChart className={styles.lineChart} data={this.state.games}
                           margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                  <XAxis dataKey="name"/>
                  <YAxis/>
                  <Tooltip/>
                  <Line type="monotone" dataKey="Sprongen" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className={styles.noResult}>Helaas, geen resultaten beschikbaar.</div>
      </div>
    );
  }
}

export default Home;
