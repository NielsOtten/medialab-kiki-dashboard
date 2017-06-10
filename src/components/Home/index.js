
import React from 'react';
import fetch from 'fetch-everywhere';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import styles from './styles.scss';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      games: [],
      graphWidth: 0,
    };

    this.onResize = this.onResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
    this.onResize();
    this.clickHandler('total');
  }

  onResize() {
    if (this.wrapper && this.wrapper !== null) {
      const graphWidth = this.wrapper.clientWidth - 20;
      this.setState({ graphWidth  });
    }
  }

  clickHandler = (total) => {
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
    return(
      <div className={styles.wrapper}>
        <ul className={styles.filterList}>
          <li className={styles.filter} onClick={this.clickHandler.bind(this, 'total')}>Totaal</li>
          <li className={styles.filter} onClick={this.clickHandler.bind(this, 'month')}>Per maand</li>
          <li className={styles.filter} onClick={this.clickHandler.bind(this, 'week')}>Per week</li>
          <li className={styles.filter} onClick={this.clickHandler.bind(this, 'day')}>Per dag</li>
          <li className={styles.filter} onClick={this.clickHandler.bind(this, 'today')}>Vandaag</li>
        </ul>
        <div className={styles.graphs}>
          <div className={styles.graph}>
            <div className={styles.graphWrapper}>
              <LineChart className={styles.lineChart} width={400} height={300} data={this.state.games}
                         margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Legend />
                <Line type="monotone" dataKey="Munten" stroke="#8884d8" />
                <Line type="monotone" dataKey="Sprongen" stroke="#82ca9d" />
                <Line type="monotone" dataKey="Afstand" stroke="#82ca9d" />
                <Line type="monotone" dataKey="Speeltijd" stroke="#82ca9d" />
              </LineChart>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
